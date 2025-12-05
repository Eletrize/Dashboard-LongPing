// ALL_LIGHT_IDS agora está definido em script.js (carregado primeiro)
// Configurações agora lidas do config.js

// === CONFIGURAÇÃO DO CENÁRIO DORMIR (usando config.js quando disponível) ===

// Função para obter IDs de luzes da Varanda (Ambiente 1)
function getVarandaLuzes() {
  if (typeof getEnvironmentLightIds === 'function') {
    return getEnvironmentLightIds('ambiente1');
  }
  return ["44", "95", "96", "41", "45", "40", "31"]; // Fallback
}

// Função para obter IDs de cortinas da Varanda
function getVarandaCortinas() {
  if (typeof getEnvironmentCurtainIds === 'function') {
    return getEnvironmentCurtainIds('ambiente1');
  }
  return ["109", "115", "116"]; // Fallback
}

// Função para obter IDs de luzes do Living (Ambiente 2)
function getLivingLuzes() {
  if (typeof getEnvironmentLightIds === 'function') {
    return getEnvironmentLightIds('ambiente2');
  }
  return ["57", "61", "75", "76", "49", "58", "20"]; // Fallback
}

// Função para obter IDs de cortinas do Living
function getLivingCortinas() {
  if (typeof getEnvironmentCurtainIds === 'function') {
    return getEnvironmentCurtainIds('ambiente2');
  }
  return ["119"]; // Fallback
}

// Função para obter ID do AC da Varanda
function getVarandaAcId() {
  if (typeof CLIENT_CONFIG !== 'undefined' && CLIENT_CONFIG.environments?.ambiente1?.airConditioner?.zones?.[0]) {
    return CLIENT_CONFIG.environments.ambiente1.airConditioner.zones[0].deviceId;
  }
  return "110"; // Fallback
}

// Função para obter ID do AC do Living
function getLivingAcId() {
  if (typeof CLIENT_CONFIG !== 'undefined' && CLIENT_CONFIG.environments?.ambiente2?.airConditioner?.zones?.[0]) {
    return CLIENT_CONFIG.environments.ambiente2.airConditioner.zones[0].deviceId;
  }
  return "167"; // Fallback
}

// Função para obter ID da TV da Varanda
function getVarandaTvId() {
  if (typeof CLIENT_CONFIG !== 'undefined' && CLIENT_CONFIG.environments?.ambiente1?.tv?.deviceId) {
    return CLIENT_CONFIG.environments.ambiente1.tv.deviceId;
  }
  return "111"; // Fallback
}

// Função para obter ID do Receiver
function getReceiverId() {
  if (typeof CLIENT_CONFIG !== 'undefined' && CLIENT_CONFIG.devices?.receivers?.zona1?.id) {
    return CLIENT_CONFIG.devices.receivers.zona1.id;
  }
  return "15"; // Fallback
}

// Variáveis legadas (para compatibilidade, usam as funções acima)
const VARANDA_LUZES = getVarandaLuzes();
const VARANDA_CORTINAS = getVarandaCortinas();
const VARANDA_AC = getVarandaAcId();
const VARANDA_TV = getVarandaTvId();

const LIVING_LUZES = getLivingLuzes();
const LIVING_CORTINAS = getLivingCortinas();
const LIVING_AC = getLivingAcId();

const RECEIVER = getReceiverId();

const DEFAULT_ENV_SCENE_ICON = "icon-scenes.svg";

let masterConfirmCallback = null;

function getEnvironmentName(envKey) {
  try {
    if (typeof CLIENT_CONFIG !== 'undefined' && CLIENT_CONFIG.environments && CLIENT_CONFIG.environments[envKey]) {
      return CLIENT_CONFIG.environments[envKey].name || envKey;
    }
  } catch (e) {
    // ignore
  }
  return envKey;
}

// Nome do ambiente na língua selecionada
function getEnvironmentDisplayName(envKey) {
  var name = getEnvironmentName(envKey);
  return typeof translateText === 'function' ? translateText(name) : name;
}

// Helper to translate strings with optional placeholders
function tr(key, params) {
  var template = typeof translateText === 'function' ? translateText(key) : key;
  if (!params) return template;
  return Object.keys(params).reduce(function(acc, param) {
    return acc.split('{' + param + '}').join(params[param]);
  }, template);
}

function showPopup(message, onConfirm) {
  const popup = document.getElementById("confirmation-popup");
  const messageEl = document.getElementById("popup-message");
  const confirmBtn = document.getElementById("popup-confirm");
  const cancelBtn = document.getElementById("popup-cancel");
  const overlay = popup;

  messageEl.textContent = message;
  masterConfirmCallback = onConfirm;

  popup.style.display = "flex";

  confirmBtn.onclick = () => {
    if (typeof masterConfirmCallback === "function") {
      masterConfirmCallback();
    }
  };
  cancelBtn.onclick = hidePopup;
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      hidePopup();
    }
  };
}

function hidePopup() {
  const popup = document.getElementById("confirmation-popup");
  popup.style.display = "none";
  const confirmBtn = document.getElementById("popup-confirm");
  confirmBtn.onclick = null;
  masterConfirmCallback = null;
}

function getVisibleEnvironmentSceneList() {
  if (typeof getVisibleEnvironments === 'function') {
    return getVisibleEnvironments();
  }

  if (typeof CLIENT_CONFIG === 'undefined' || !CLIENT_CONFIG.environments) {
    return [];
  }

  return Object.entries(CLIENT_CONFIG.environments)
    .filter(([, env]) => env?.visible !== false)
    .sort((a, b) => (a[1].order || 0) - (b[1].order || 0))
    .map(([key, env]) => ({ key, ...env }));
}

function renderEnvironmentScenes() {
  const container = document.getElementById('environment-scenes-grid');
  if (!container) {
    return;
  }

  const environments = getVisibleEnvironmentSceneList();
  if (!environments || environments.length === 0) {
    container.innerHTML = '<div class="scene-card-empty">' + tr('Nenhum ambiente configurado.') + '</div>';
    return;
  }

  const sanitize = (value) => {
    const text = value || '';
    return typeof escapeHtml === 'function' ? escapeHtml(text) : text;
  };

  const cardsHtml = environments
    .map((env) => {
      const elementId = `env-scene-${env.key}`;
      const sceneConfig = env.scene || {};
      const icon = sceneConfig.icon || DEFAULT_ENV_SCENE_ICON;
      const safeKey = sanitize(env.key);
      const originalName = env.name || env.key;
      const translatedName = typeof translateText === 'function' ? translateText(originalName) : originalName;
      const safeName = sanitize(translatedName);
      const safeIcon = sanitize(icon);
      return `
        <div class="control-card large scene-control-card" id="${elementId}" data-env="${safeKey}" onclick="handleEnvironmentScene('${env.key}', '${elementId}')">
          <img class="control-icon" src="images/icons/${safeIcon}" alt="${safeName}">
          <div class="control-label">${safeName}</div>
        </div>
      `;
    })
    .join('');

  container.innerHTML = cardsHtml;

  if (typeof updateTranslations === 'function') {
    setTimeout(updateTranslations, 0);
  }
}

function handleEnvironmentScene(envKey, elementId) {
  const envName = getEnvironmentDisplayName(envKey);
  const message = tr('Executar cenário "{envName}"? Isso irá ligar todos os dispositivos principais do ambiente.', { envName });
  showPopup(message, () => executeEnvironmentScene(envKey, elementId));
}

function executeEnvironmentScene(envKey, elementId) {
  const commands = collectEnvironmentSceneCommands(envKey);
  const card = elementId ? document.getElementById(elementId) : null;

  if (card) {
    card.classList.add('loading');
  }

  if (!commands.length) {
    console.warn(`[cenarios] Nenhum dispositivo configurado para ${envKey}`);
    if (typeof showErrorMessage === 'function') {
      showErrorMessage(tr('Nenhum dispositivo configurado para este ambiente.'));
    }
    if (card) {
      card.classList.remove('loading');
    }
    hidePopup();
    return;
  }

  executeCommandsSequentially(commands, 150)
    .then(() => {
      console.log(`✅ Cenário do ambiente ${envKey} executado com ${commands.length} comandos`);
      if (typeof syncAllVisibleControls === 'function') {
        syncAllVisibleControls(true);
      }
      hidePopup();
    })
    .catch((error) => {
      console.error(`❌ Erro ao executar cenário do ambiente ${envKey}`, error);
      if (typeof showErrorMessage === 'function') {
        showErrorMessage(tr('Erro ao executar cenário de {envName}: {error}', { envName: getEnvironmentDisplayName(envKey), error: error.message }));
      }
    })
    .finally(() => {
      if (card) {
        card.classList.remove('loading');
      }
    });
}

function collectEnvironmentSceneCommands(envKey) {
  if (typeof CLIENT_CONFIG === 'undefined' || !CLIENT_CONFIG.environments?.[envKey]) {
    return [];
  }

  const env = CLIENT_CONFIG.environments[envKey];
  const commands = [];

  const add = (deviceId, command, label) => addCommandIfValid(commands, deviceId, command, label);

  (env.lights || []).forEach((light) => add(light.id, 'on', `Luz ${light.name || ''}`));
  (env.curtains || []).forEach((curtain) => add(curtain.id, 'open', `Cortina ${curtain.name || ''}`));

  if (env.airConditioner?.zones) {
    env.airConditioner.zones.forEach((zone) => add(zone.deviceId, 'on', `AC ${zone.name || ''}`));
  }

  if (env.tv?.deviceId) {
    if (env.tv.hasMacro && env.tv.macroName) {
      commands.push({ macro: `${env.tv.macroName}TvOn` });
    } else {
      add(env.tv.deviceId, 'on', 'TV');
    }
  }

  if (env.htv?.deviceId) {
    if (env.htv.hasMacro && env.htv.macroName) {
      commands.push({ macro: `${env.htv.macroName}HtvOn` });
    } else {
      add(env.htv.deviceId, 'on', 'HTV');
    }
  }

  if (env.telao?.deviceId) {
    add(env.telao.deviceId, 'on', 'Telão');
  }

  if (env.audio?.receiverId) {
    add(env.audio.receiverId, 'on', 'Áudio');
  }

  if (env.pool) {
    Object.values(env.pool).forEach((item) => {
      if (item && item.id) {
        add(item.id, 'on', `Piscina ${item.name || ''}`);
      }
    });
  }

  const mediaGroups = ['projectors', 'televisions', 'computers'];
  mediaGroups.forEach((group) => {
    const devices = env.mediaControl?.[group];
    if (Array.isArray(devices)) {
      devices.forEach((device) => add(device.id, 'on', `${group} ${device?.name || ''}`));
    }
  });

  const playbackPower = env.mediaControl?.playback?.powerDevices;
  if (Array.isArray(playbackPower)) {
    playbackPower.forEach((deviceId) => add(deviceId, 'on', 'Playback'));
  }

  const deduped = [];
  const seen = new Set();

  commands.forEach((entry) => {
    if (entry.macro) {
      deduped.push(entry);
      return;
    }
    const key = `${entry.deviceId}:${entry.command}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(entry);
    }
  });

  return deduped;
}

function addCommandIfValid(commands, deviceId, command, label) {
  const normalizedId = normalizeDeviceId(deviceId);
  if (!normalizedId || !command) {
    return;
  }
  commands.push({ deviceId: normalizedId, command, label });
}

function normalizeDeviceId(deviceId) {
  if (deviceId === undefined || deviceId === null) {
    return '';
  }
  const normalized = String(deviceId).trim();
  return normalized;
}

function executeCommandsSequentially(commands, delayMs = 150) {
  if (!Array.isArray(commands) || commands.length === 0) {
    return Promise.resolve();
  }

  const runCommand = (index) => {
    if (index >= commands.length) {
      return Promise.resolve();
    }

    const entry = commands[index] || {};
    const delay = typeof entry.delay === 'number' ? entry.delay : delayMs;

    let action;

    if (entry.macro) {
      if (typeof executeMacro === 'function') {
        action = executeMacro(entry.macro);
      } else {
        console.warn(`Macro ${entry.macro} não pôde ser executada (executeMacro indisponível).`);
        action = Promise.resolve();
      }
    } else if (entry.deviceId && entry.command) {
      if (entry.value !== undefined) {
        action = sendHubitatCommand(entry.deviceId, entry.command, entry.value);
      } else {
        action = sendHubitatCommand(entry.deviceId, entry.command);
      }
    } else {
      action = Promise.resolve();
    }

    return action
      .catch((error) => {
        console.error(`Erro ao executar comando:`, entry, error);
        throw error;
      })
      .then(() => wait(delay))
      .then(() => runCommand(index + 1));
  };

  return runCommand(0);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// DEPRECATED: função removida com novos cenários de expediente
// function updateMasterLightToggleState() {
//     const btn = document.getElementById('master-light-toggle-btn');
//     if (!btn) return;
//     // ... código comentado
// }

function handleMasterLightToggle() {
  const btn = document.getElementById("master-light-toggle-btn");
  const action = btn.dataset.action;

  const message =
    action === "on"
      ? tr('Você tem certeza que gostaria de ligar tudo?')
      : tr('Você tem certeza que gostaria de desligar tudo?');

  showPopup(message, () => executeMasterLightToggle(action));
}

function executeMasterLightToggle(action) {
  // Usar machine rules dos relay boards para otimização:
  // Dispositivos 264 e 265: MasterONOFF-RelayBoard-01 e 02
  // Button 1 (push 1) = Master ON para ambos os relay boards
  // Button 2 (push 2) = Master OFF para ambos os relay boards

  const relayDevices = ["264", "265"]; // Ambos os relay boards
  const buttonValue = action === "on" ? "1" : "2"; // Button 1 = ON, Button 2 = OFF

  console.log(
    `🎯 Executando master ${action} via relay boards otimizados (devices ${relayDevices.join(
      ", "
    )}, button ${buttonValue})`
  );

  // Enviar comandos para ambos os relay boards em paralelo
  const promises = relayDevices.map((deviceId) => {
    console.log(`📡 Enviando push ${buttonValue} para device ${deviceId}`);
    return sendHubitatCommand(deviceId, "push", buttonValue);
  });

  Promise.all(promises)
    .then(() => {
      console.log(
        `✅ Master light toggle ${action} enviado com sucesso para ambos os relay boards`
      );

      // Atualizar estados locais de todos os dispositivos após comando bem-sucedido
      ALL_LIGHT_IDS.forEach((id) => {
        setStoredState(id, action);
      });

      // Forçar atualização da UI após 1 segundo para dar tempo dos relay boards processarem
      setTimeout(() => {
        updateMasterLightToggleState();
        // Forçar polling para sincronizar estados reais
        if (typeof updateDeviceStatesFromServer === "function") {
          updateDeviceStatesFromServer();
        }
      }, 1000);

      hidePopup();
    })
    .catch((err) => {
      console.error(
        `❌ Master light toggle ${action} falhou em um ou mais relay boards:`,
        err
      );
      hidePopup();
    });
}

function handleMasterCurtainToggle(action) {
  const message =
    action === "open"
      ? tr('Você tem certeza que gostaria de subir todas as cortinas?')
      : tr('Você tem certeza que gostaria de descer todas as cortinas?');

  showPopup(message, () => executeMasterCurtainToggle(action));
}

function executeMasterCurtainToggle(action) {
  const promises = ALL_CURTAIN_IDS.map((id) => sendCurtainCommand(id, action));

  Promise.all(promises)
    .then(() => {
      console.log(`Master curtain toggle ${action} complete.`);
      hidePopup();
    })
    .catch((err) => {
      console.error(`Master curtain toggle ${action} failed:`, err);
      hidePopup();
    });
}

// Funções para controlar todas as cortinas via botão virtual do Hubitat (ID 44)
function handleMasterCurtainsOpen() {
  showPopup(tr('Você tem certeza que gostaria de abrir todas as cortinas?'), () => {
    executeMasterCurtainsAction("open");
  });
}

function handleMasterCurtainsClose() {
  showPopup(tr('Você tem certeza que gostaria de fechar todas as cortinas?'), () => {
    executeMasterCurtainsAction("close");
  });
}

function executeMasterCurtainsAction(action) {
  const deviceId = "44"; // Virtual Button "Todas-Cortinas"
  const pushButton = action === "open" ? "1" : "3"; // 1 = abrir, 3 = fechar

  console.log(
    `🎬 Executando ação master curtinas: ${action} (ID: ${deviceId}, push: ${pushButton})`
  );

  // Adicionar feedback visual (loading)
  const btnId =
    action === "open"
      ? "master-curtains-open-btn"
      : "master-curtains-close-btn";
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.classList.add("loading");
  }

  // Enviar comando para o Virtual Button
  sendHubitatCommand(deviceId, "push", pushButton)
    .then(() => {
      console.log(`✅ Comando master curtinas ${action} executado com sucesso`);
      hidePopup();
    })
    .catch((error) => {
      console.error(
        `❌ Erro ao executar comando master curtinas ${action}:`,
        error
      );
      const errKey = action === "open" ? 'Erro ao abrir cortinas: {error}' : 'Erro ao fechar cortinas: {error}';
      showErrorMessage(tr(errKey, { error: error.message }));
    })
    .finally(() => {
      // Remover feedback visual
      if (btn) {
        btn.classList.remove("loading");
      }
    });
}

// === CENÁRIO INICIALIZAR ===
// Liga as luzes principais e abre cortinas para iniciar o dia

function handleCenarioInicializar() {
  const varandaName = getEnvironmentDisplayName('ambiente1');
  const livingName = getEnvironmentDisplayName('ambiente2');
  const message = tr('Executar cenário "Inicializar"? Isso irá ligar as luzes principais e abrir as cortinas de {varandaName} e {livingName}.', { varandaName, livingName });
  showPopup(message, executeCenarioInicializar);
}

function executeCenarioInicializar() {
  console.log("☀️ Iniciando cenário: Inicializar (Ligar luzes e abrir cortinas)");

  const btn = document.getElementById("cenario-inicializar-btn");
  if (btn) btn.classList.add("loading");

  // IDs dos dispositivos
  const varandaLuzes = getVarandaLuzes();
  const livingLuzes = getLivingLuzes();
  const varandaCortinas = getVarandaCortinas();
  const livingCortinas = getLivingCortinas();

  // Coletar todos os comandos a serem executados
  const commands = [];

  // 1. Ligar luzes da Varanda
  varandaLuzes.forEach((id) => {
    commands.push({ deviceId: id, command: "on", label: `Luz Varanda ${id}` });
  });

  // 2. Ligar luzes do Living
  livingLuzes.forEach((id) => {
    commands.push({ deviceId: id, command: "on", label: `Luz Living ${id}` });
  });

  // 3. Abrir cortinas da Varanda
  varandaCortinas.forEach((id) => {
    commands.push({ deviceId: id, command: "open", label: `Cortina Varanda ${id}` });
  });

  // 4. Abrir cortinas do Living
  livingCortinas.forEach((id) => {
    commands.push({ deviceId: id, command: "open", label: `Cortina Living ${id}` });
  });

  console.log(`☀️ Total de comandos para Inicializar: ${commands.length}`);

  // Executar comandos sequencialmente com delay
  executeCommandsSequentially(commands, 150)
    .then(() => {
      console.log("✅ Cenário Inicializar executado com sucesso");
      if (btn) btn.classList.remove("loading");
    })
    .catch((error) => {
      console.error("❌ Erro ao executar Cenário Inicializar:", error);
      if (typeof showErrorMessage === "function") {
        showErrorMessage(tr('Erro ao executar cenário Inicializar: {error}', { error: error.message }));
      }
      if (btn) btn.classList.remove("loading");
    });
}

// === CENÁRIO FINALIZAÇÃO (antigo DORMIR) ===
// Desliga tudo da Varanda e Living (luzes, AC, receiver) e fecha cortinas

function handleCenarioDormir() {
  const varandaName = getEnvironmentDisplayName('ambiente1');
  const livingName = getEnvironmentDisplayName('ambiente2');
  const message = tr('Executar cenário "Finalização"? Isso irá desligar luzes, TV, ar condicionado, receiver e fechar as cortinas de {varandaName} e {livingName}.', { varandaName, livingName });
  showPopup(message, executeCenarioDormir);
}

function executeCenarioDormir() {
  console.log("🌙 Iniciando cenário: Dormir (Desligamento Geral Varanda + Living)");

  // Adicionar feedback visual
  const btn = document.getElementById("cenario-dormir-btn");
  if (btn) btn.classList.add("loading");

  const promises = [];

  // === DESLIGAR LUZES ===
  // Varanda
  VARANDA_LUZES.forEach((deviceId) => {
    console.log(`💡 Desligando luz Varanda ${deviceId}`);
    promises.push(sendHubitatCommand(deviceId, "off"));
    setStoredState(deviceId, "off");
  });

  // Living
  LIVING_LUZES.forEach((deviceId) => {
    console.log(`💡 Desligando luz Living ${deviceId}`);
    promises.push(sendHubitatCommand(deviceId, "off"));
    setStoredState(deviceId, "off");
  });

  // === FECHAR CORTINAS ===
  // Varanda
  VARANDA_CORTINAS.forEach((deviceId) => {
    console.log(`🪟 Fechando cortina Varanda ${deviceId}`);
    promises.push(sendHubitatCommand(deviceId, "close"));
  });

  // Living
  LIVING_CORTINAS.forEach((deviceId) => {
    console.log(`🪟 Fechando cortina Living ${deviceId}`);
    promises.push(sendHubitatCommand(deviceId, "close"));
  });

  // === DESLIGAR AR CONDICIONADO ===
  console.log(`❄️ Desligando AC Varanda ${VARANDA_AC}`);
  promises.push(sendHubitatCommand(VARANDA_AC, "off"));

  console.log(`❄️ Desligando AC Living ${LIVING_AC}`);
  promises.push(sendHubitatCommand(LIVING_AC, "off"));

  // === DESLIGAR TV ===
  console.log(`📺 Desligando TV Varanda ${VARANDA_TV}`);
  promises.push(sendHubitatCommand(VARANDA_TV, "off"));

  // === DESLIGAR RECEIVER ===
  console.log(`🎵 Desligando Receiver ${RECEIVER}`);
  promises.push(sendHubitatCommand(RECEIVER, "off"));

  Promise.all(promises)
    .then(() => {
      console.log("✅ Cenário Dormir executado com sucesso");
      setTimeout(() => {
        if (typeof syncAllVisibleControls === "function") {
          syncAllVisibleControls(true);
        }
      }, 500);
      hidePopup();
    })
    .catch((error) => {
      console.error("❌ Erro ao executar Cenário Dormir:", error);
      if (typeof showErrorMessage === "function") {
        showErrorMessage(tr('Erro ao executar cenário Dormir: {error}', { error: error.message }));
      }
    })
    .finally(() => {
      if (btn) btn.classList.remove("loading");
    });
}

function initScenesPage() {
  if (typeof updateMasterLightToggleState === 'function') {
    updateMasterLightToggleState();
  }
  renderEnvironmentScenes();
}
