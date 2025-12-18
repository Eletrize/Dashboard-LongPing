/**
 * AAT Multiroom Digital - TCP - 4 Zonas (Parent + Childs)
 *
 * CORREÇÃO: Hubitat não tem "Generic Component Audio Volume" em muitos hubs.
 * Então os Childs são "Generic Component Dimmer" (0..100) + Switch = mute.
 *
 * MAPEAMENTO:
 * Hubitat Level: 0..100  <->  AAT Volume: 0..87
 *
 * Versão: 3.3
 * Data: 2025-12-18
 */

import groovy.transform.Field

@Field static final Integer ZONES = 4
@Field static final Integer DEFAULT_TCP_PORT = 1024

@Field static final Integer AAT_MAX_VOL = 87
@Field static final Integer AAT_MIN_VOL = 0
@Field static final Integer HUB_MAX_LVL = 100
@Field static final Integer HUB_MIN_LVL = 0

metadata {
    definition(
        name: "AAT Multiroom Digital (TCP) - 4 Zonas (Parent/Child)",
        namespace: "Eletrize",
        author: "PH",
        singleThreaded: true
    ) {
        capability "Initialize"
        capability "Refresh"
        capability "Switch"      // Parent switch = muteAll/unmuteAll
        capability "SwitchLevel" // Parent slider 0..100 = volume geral

        command "connect"
        command "disconnect"
        command "reconnect"
        command "createChildDevices"
        command "AtualizaIPPorta"

        command "muteAll"
        command "unmuteAll"
        command "toggleMuteAll"
        command "setAllZonesVolume", [[name: "level*", type: "NUMBER", description: "0-100 (Hubitat)"]]

        attribute "connectionStatus", "string"  // connected/disconnected/connecting/error
        attribute "boardstatus", "string"       // online/offline
        attribute "lastMessage", "string"
        attribute "lastMessageReceivedAt", "number"

        attribute "allMuted", "string"          // muted/unmuted/partial/unknown
        attribute "avgVolume", "number"         // média das zonas (0-100)
    }

    preferences {
        input name: "deviceIP", type: "text", title: "IP do Multiroom AAT", required: true
        input name: "tcpPort", type: "number", title: "Porta TCP", required: true, defaultValue: DEFAULT_TCP_PORT

        input name: "autoReconnect", type: "bool", title: "Auto-reconectar (TCP)", defaultValue: true
        input name: "checkInterval", type: "number", title: "Connection Check Interval (seconds)", defaultValue: 60, required: true

        input name: "logInfo", type: "bool", title: "Info Logs?", defaultValue: true
        input name: "logDebug", type: "bool", title: "Debug Logs?", defaultValue: false
        input name: "logTrace", type: "bool", title: "Trace Logs? (detalhado)", defaultValue: false
    }
}

/* ===================== Lifecycle ===================== */

def installed() {
    logInfo("installed()")
    state.childscreated = 0
    state.retryCount = 0
    setBoardStatus("offline")
    sendEvent(name: "connectionStatus", value: "disconnected")
    sendEvent(name: "allMuted", value: "unknown")
    runIn(1, "initialize")
}

def updated() {
    logInfo("updated()")
    unschedule()
    runIn(1, "initialize")
}

def uninstalled() {
    logInfo("uninstalled()")
    unschedule()
    safeCloseSocket()
}

def initialize() {
    logInfo("initialize()")

    if (!settings.deviceIP) {
        logError("IP não configurado")
        return
    }
    if (!settings.tcpPort) {
        logError("Porta TCP não configurada")
        return
    }

    createChildDevices()
    connect()

    runIn((settings.checkInterval ?: 60) as Integer, "connectionCheck")
}

/* ===================== Connection ===================== */

def AtualizaIPPorta() {
    logInfo("AtualizaIPPorta()")
    unschedule()
    safeCloseSocket()
    runIn(1, "initialize")
}

def connect() {
    logInfo("connect() -> ${settings.deviceIP}:${settings.tcpPort}")
    safeCloseSocket()
    sendEvent(name: "connectionStatus", value: "connecting")

    try {
        interfaces.rawSocket.connect(settings.deviceIP, (settings.tcpPort as Integer), byteInterface: false)
        state.lastMessageReceivedAt = now()
        state.retryCount = 0
        sendEvent(name: "connectionStatus", value: "connected")
        setBoardStatus("online")
        runIn(1, "refresh")
    } catch (Exception e) {
        logError("Erro ao conectar: ${e.message}")
        sendEvent(name: "connectionStatus", value: "error")
        setBoardStatus("offline")
        if (settings.autoReconnect) scheduleReconnect()
    }
}

def disconnect() {
    logInfo("disconnect()")
    unschedule("connectionCheck")
    safeCloseSocket()
    sendEvent(name: "connectionStatus", value: "disconnected")
    setBoardStatus("offline")
}

def reconnect() {
    logInfo("reconnect()")
    connect()
}

def socketStatus(String message) {
    logDebug("socketStatus: ${message}")
    String m = (message ?: "").toLowerCase()
    if (m.contains("error") || m.contains("disconnect")) {
        sendEvent(name: "connectionStatus", value: "disconnected")
        setBoardStatus("offline")
        if (settings.autoReconnect) scheduleReconnect()
    }
}

/* ===================== Child Devices ===================== */

def createChildDevices() {
    String thisId = device.id?.toString()
    if (!thisId) return

    state.netids = "${thisId}-Zone-"

    if (state.childscreated == 1) {
        logDebug("Childs já criados.")
        return
    }

    for (int z = 1; z <= ZONES; z++) {
        String zoneId = z < 10 ? "0${z}" : "${z}"
        String dni = "${state.netids}${zoneId}"

        def cd = getChildDevice(dni)
        if (!cd) {
            // Usar Dimmer como "volume" 0..100 (universal)
            cd = addChildDevice(
                "hubitat",
                "Generic Component Dimmer",
                dni,
                [name: "${device.displayName} Zona ${z}", isComponent: true]
            )

            // Estado inicial
            cd.parse([[name: "level", value: 0]])
            cd.parse([[name: "switch", value: "on"]]) // on = unmuted
            cd.parse([[name: "mute", value: "unmuted"]]) // atributo custom (não é capability do dimmer)

            logInfo("Child criado: ${cd.displayName}")
        }
    }

    state.childscreated = 1
}

private def getZoneChild(Integer zone) {
    String thisId = device.id?.toString()
    String zoneId = zone < 10 ? "0${zone}" : "${zone}"
    return getChildDevice("${thisId}-Zone-${zoneId}")
}

private List getAllZoneChildren() {
    List childs = []
    for (int z = 1; z <= ZONES; z++) {
        def cd = getZoneChild(z)
        if (cd) childs << cd
    }
    return childs
}

private Integer zoneFromDni(String dni) {
    try {
        return (dni?.tokenize("-")?.last() as Integer)
    } catch (e) {
        return 1
    }
}

/* ===================== Parent global controls ===================== */

def on() { unmuteAll() }
def off() { muteAll() }

def muteAll() {
    logInfo("muteAll()")
    for (int z = 1; z <= ZONES; z++) {
        sendAAT("MUTEON ${z}")
        updateZoneMute(z, true)
        pauseExecution(60)
    }
    sendEvent(name: "switch", value: "off")
    updateAggregateStates()
}

def unmuteAll() {
    logInfo("unmuteAll()")
    for (int z = 1; z <= ZONES; z++) {
        sendAAT("MUTEOFF ${z}")
        updateZoneMute(z, false)
        pauseExecution(60)
    }
    sendEvent(name: "switch", value: "on")
    updateAggregateStates()
}

def toggleMuteAll() {
    String sw = device.currentValue("switch") ?: "on"
    if (sw == "on") muteAll() else unmuteAll()
}

def setAllZonesVolume(level) {
    Integer hubLevel = clamp(level as Integer, HUB_MIN_LVL, HUB_MAX_LVL)
    Integer aatVol = hubLevelToAat(hubLevel)

    logInfo("setAllZonesVolume(level=${hubLevel}) -> AAT=${aatVol}")

    for (int z = 1; z <= ZONES; z++) {
        sendAAT("VOLSET ${z} ${aatVol}")
        updateZoneVolumeFromHubLevel(z, hubLevel)
        pauseExecution(60)
    }

    sendEvent(name: "level", value: hubLevel)
    updateAggregateStates()
}

// capability SwitchLevel
def setLevel(level) { setAllZonesVolume(level) }

/* ===================== Refresh ===================== */

def refresh() {
    logInfo("refresh()")
    for (int z = 1; z <= ZONES; z++) {
        sendAAT("VOLGET ${z}")
        pauseExecution(60)
        sendAAT("MUTEGET ${z}")
        pauseExecution(60)
    }
}

/* ===================== Child callbacks ===================== */
// Dimmer: setLevel controla volume
void componentSetLevel(cd, level) {
    Integer z = zoneFromDni(cd.deviceNetworkId)
    Integer hubLevel = clamp(level as Integer, HUB_MIN_LVL, HUB_MAX_LVL)
    Integer aatVol = hubLevelToAat(hubLevel)

    sendAAT("VOLSET ${z} ${aatVol}")
    updateZoneVolumeFromHubLevel(z, hubLevel)
    updateAggregateStates()
}

// Switch: ON = unmuted / OFF = muted
void componentOn(cd) {
    Integer z = zoneFromDni(cd.deviceNetworkId)
    unmuteZone(z)
    updateAggregateStates()
}

void componentOff(cd) {
    Integer z = zoneFromDni(cd.deviceNetworkId)
    muteZone(z)
    updateAggregateStates()
}

void componentRefresh(cd) {
    refresh()
}

/* ===================== Zone helpers ===================== */

private void muteZone(Integer zone) {
    Integer z = clamp(zone, 1, ZONES)
    sendAAT("MUTEON ${z}")
    updateZoneMute(z, true)
}

private void unmuteZone(Integer zone) {
    Integer z = clamp(zone, 1, ZONES)
    sendAAT("MUTEOFF ${z}")
    updateZoneMute(z, false)
}

private void updateZoneVolumeFromAat(Integer zone, Integer aatVol) {
    Integer z = clamp(zone ?: 1, 1, ZONES)
    Integer aat = clamp(aatVol as Integer, AAT_MIN_VOL, AAT_MAX_VOL)
    Integer hubLevel = aatToHubLevel(aat)
    updateZoneVolumeFromHubLevel(z, hubLevel)
}

private void updateZoneVolumeFromHubLevel(Integer zone, Integer hubLevel) {
    def cd = getZoneChild(clamp(zone, 1, ZONES))
    if (cd) {
        cd.parse([[name: "level", value: hubLevel]])
    }
}

private void updateZoneMute(Integer zone, Boolean muted) {
    def cd = getZoneChild(clamp(zone, 1, ZONES))
    if (cd) {
        cd.parse([[name: "switch", value: muted ? "off" : "on"]])
        cd.parse([[name: "mute", value: muted ? "muted" : "unmuted"]])
    }
}

/* ===================== Aggregated parent states ===================== */

private void updateAggregateStates() {
    def childs = getAllZoneChildren()
    if (!childs) return

    def mutes = childs.collect { it.currentValue("mute") ?: "unknown" }
    String allMuted
    if (mutes.every { it == "muted" }) allMuted = "muted"
    else if (mutes.every { it == "unmuted" }) allMuted = "unmuted"
    else if (mutes.any { it == "unknown" }) allMuted = "unknown"
    else allMuted = "partial"
    sendEvent(name: "allMuted", value: allMuted)

    if (allMuted == "muted") sendEvent(name: "switch", value: "off")
    else if (allMuted == "unmuted") sendEvent(name: "switch", value: "on")

    def levels = childs.collect { (it.currentValue("level") ?: 0) as Integer }
    Integer avg = (levels.sum() / Math.max(1, levels.size())) as Integer
    sendEvent(name: "avgVolume", value: avg)

    // opcional: refletir o avg no parent
    sendEvent(name: "level", value: avg)
}

/* ===================== Mapping Hubitat <-> AAT ===================== */

private Integer hubLevelToAat(Integer hubLevel) {
    Integer h = clamp(hubLevel, HUB_MIN_LVL, HUB_MAX_LVL)
    return Math.round((h * AAT_MAX_VOL) / (float)HUB_MAX_LVL) as Integer
}

private Integer aatToHubLevel(Integer aatVol) {
    Integer a = clamp(aatVol, AAT_MIN_VOL, AAT_MAX_VOL)
    return Math.round((a * HUB_MAX_LVL) / (float)AAT_MAX_VOL) as Integer
}

/* ===================== Send / Parse ===================== */

private void sendAAT(String command) {
    String msg = "[t001 ${command}]"
    logDebug("sendAAT: ${msg}")

    try {
        interfaces.rawSocket.sendMessage(msg)
    } catch (Exception e) {
        logError("Falha ao enviar: ${e.message}")
        sendEvent(name: "connectionStatus", value: "error")
        setBoardStatus("offline")
        if (settings.autoReconnect) scheduleReconnect()
    }
}

def parse(String message) {
    state.lastMessageReceivedAt = now()
    sendEvent(name: "lastMessageReceivedAt", value: state.lastMessageReceivedAt)
    if (message) sendEvent(name: "lastMessage", value: message.take(250))

    String decoded = tryDecodeHex(message)
    logTrace("parse: ${decoded}")

    def matcher = decoded =~ /\[r(\d+)\s+([A-Za-z0-9\-+]+)(.*?)\]/
    while (matcher.find()) {
        String cmd = (matcher.group(2) ?: "").trim().toUpperCase()
        String paramsStr = (matcher.group(3) ?: "").trim()
        List<String> params = paramsStr ? paramsStr.split("\\s+").toList() : []
        processResponse(cmd, params)
    }

    setBoardStatus("online")
    if (device.currentValue("connectionStatus") != "connected") {
        sendEvent(name: "connectionStatus", value: "connected")
    }

    updateAggregateStates()
}

private void processResponse(String cmd, List<String> params) {
    switch (cmd) {
        case "VOLGET":
        case "VOLSET":
            if (params.size() >= 2) {
                updateZoneVolumeFromAat(params[0] as Integer, params[1] as Integer)
            }
            break

        case "MUTEGET":
        case "MUTEON":
        case "MUTEOFF":
        case "MUTETOG":
            if (params.size() >= 2) {
                Integer zone = params[0] as Integer
                String st = params[1].toUpperCase()
                Boolean muted = (st == "ON" || st == "1")
                updateZoneMute(zone, muted)
            }
            break

        case "ERROR":
            logError("AAT ERROR: ${params.join(' ')}")
            break

        default:
            logDebug("Resposta não tratada: ${cmd} ${params}")
    }
}

/* ===================== Connection Check ===================== */

def connectionCheck() {
    Long last = (state.lastMessageReceivedAt ?: 0L) as Long
    Long diffMs = now() - last
    Integer interval = (settings.checkInterval ?: 60) as Integer

    if (last == 0L || diffMs > (interval * 1000L * 2L)) {
        logWarn("connectionCheck: sem mensagens há ${(diffMs / 1000L)}s")
        setBoardStatus("offline")
        sendEvent(name: "connectionStatus", value: "disconnected")
        if (settings.autoReconnect) scheduleReconnect()
    } else {
        logDebug("connectionCheck: OK (${(diffMs / 1000L)}s)")
        setBoardStatus("online")
    }

    runIn(interval, "connectionCheck")
}

private void scheduleReconnect() {
    Integer retry = (state.retryCount ?: 0) as Integer
    Integer delay = Math.min(300, Math.max(5, (retry + 1) * 10))
    state.retryCount = retry + 1
    logInfo("Reconnect em ${delay}s (tentativa ${state.retryCount})")
    runIn(delay, "reconnect")
}

private void setBoardStatus(String status) {
    if (device.currentValue("boardstatus") != status) {
        sendEvent(name: "boardstatus", value: status, isStateChange: true)
    }
}

private void safeCloseSocket() {
    try { interfaces.rawSocket.close() } catch (ignored) {}
    try { interfaces.rawSocket.disconnect() } catch (ignored2) {}
}

private Integer clamp(Integer v, Integer min, Integer max) {
    Integer val = (v == null) ? min : v
    return Math.max(min, Math.min(max, val))
}

private String tryDecodeHex(String message) {
    if (!message) return ""
    try {
        if (message ==~ /^[0-9A-Fa-f]+$/) return new String(message.decodeHex())
    } catch (e) { }
    return message
}

/* ===================== Logs ===================== */

private void logInfo(String msg)  { if (settings.logInfo)  log.info  "${device.displayName}: ${msg}" }
private void logDebug(String msg) { if (settings.logDebug) log.debug "${device.displayName}: ${msg}" }
private void logTrace(String msg) { if (settings.logTrace) log.trace "${device.displayName}: ${msg}" }
private void logWarn(String msg)  { log.warn "${device.displayName}: ${msg}" }
private void logError(String msg) { log.error "${device.displayName}: ${msg}" }