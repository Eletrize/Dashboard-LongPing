/**
 * ╔═══════════════════════════════════════════════════════════════════════════════╗
 * ║            DASHBOARD ELETRIZE - EXEMPLO DE CONFIGURAÇÃO DE CLIENTE            ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  Este arquivo é um EXEMPLO/TEMPLATE para configuração de novos clientes.      ║
 * ║                                                                               ║
 * ║  INSTRUÇÕES:                                                                  ║
 * ║  1. Copie este arquivo para config.js                                         ║
 * ║  2. Substitua todos os valores de exemplo pelos dados do cliente              ║
 * ║  3. Obtenha os IDs dos dispositivos do Hubitat do cliente                     ║
 * ║  4. Adicione/remova ambientes conforme necessário                             ║
 * ╚═══════════════════════════════════════════════════════════════════════════════╝
 */

const CLIENT_CONFIG = {
    
    // ═══════════════════════════════════════════════════════════════════════════
    // INFORMAÇÕES DO CLIENTE
    // ═══════════════════════════════════════════════════════════════════════════
    clientInfo: {
        name: "NOME DO CLIENTE",           // ← Substituir pelo nome do cliente
        projectName: "Residência XXXX",    // ← Nome do projeto
        location: "Cidade, Estado",        // ← Localização
        version: "1.0.0"                   // ← Versão do deploy
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CONFIGURAÇÃO DOS AMBIENTES
    // ═══════════════════════════════════════════════════════════════════════════
    // Copie e cole blocos de ambiente conforme necessário
    // Cada cliente terá uma quantidade diferente de ambientes
    // ═══════════════════════════════════════════════════════════════════════════
    
    environments: {
        // EXEMPLO DE AMBIENTE COMPLETO ──────────────────────────────────────────
        ambiente1: {
            name: "Nome do Ambiente",     // ← Nome que aparece na interface
            visible: true,                 // ← true = aparece na home
            order: 1,                      // ← Ordem de exibição (1 = primeiro)
            hasPhoto: true,                // ← true = tem imagem de fundo
            
            // Recursos disponíveis (true = disponível, false = não tem)
            features: {
                luzes: true,               // Controle de iluminação
                cortinas: true,            // Cortinas/persianas motorizadas
                conforto: true,            // Ar-condicionado
                tv: true,                  // Televisão principal
                htv: true,                 // HTV/Segunda TV
                musica: true               // Áudio/Receiver
            },
            
            // LUZES - Liste todas as luzes deste ambiente
            // Obtenha os IDs no Hubitat: Devices → clique no device → ID na URL
            lights: [
                { id: "ID1", name: "Luz Principal" },
                { id: "ID2", name: "Luz Secundária" },
                // Adicione mais luzes conforme necessário
            ],
            
            // CORTINAS - Liste cortinas/persianas motorizadas
            // type: "cortina" ou "veneziana"
            curtains: [
                { id: "ID3", name: "Cortina 1", type: "cortina" },
                { id: "ID4", name: "Veneziana", type: "veneziana" },
            ],
            
            // AR-CONDICIONADO - Pode ter múltiplas zonas
            airConditioner: {
                zones: [
                    { id: "zona1", name: "AC Principal", deviceId: "ID5" }
                ]
            },
            
            // TV - Configuração da televisão
            tv: {
                deviceId: "ID6",           // ID da TV no Hubitat
                volumeDeviceId: "ID7",     // ID do controle de volume (pode ser receiver)
                receiverId: "ID7",         // ID do receiver (se tiver)
                hasMacro: true,            // Se usa macro para ligar
                macroName: "ambiente1"     // Nome da macro no config.macros
            },
            
            // HTV - Segunda TV (mesmo formato da TV)
            htv: {
                deviceId: "ID8",
                volumeDeviceId: "ID9",
                receiverId: "ID9",
                hasMacro: true,
                macroName: "ambiente1htv"
            },
            
            // ÁUDIO - Configuração de som
            audio: {
                receiverId: "ID10",
                zone: "zona1"              // Zona do receiver multiroom
            }
        },

        // EXEMPLO DE AMBIENTE SIMPLES (só luzes) ────────────────────────────────
        ambiente2: {
            name: "Corredor",
            visible: true,
            order: 2,
            hasPhoto: true,
            features: {
                luzes: true,
                cortinas: false,
                conforto: false,
                tv: false,
                htv: false,
                musica: false
            },
            lights: [
                { id: "ID11", name: "Luz Corredor" }
            ],
            curtains: [],
            airConditioner: null,
            tv: null,
            htv: null,
            audio: null
        },

        // EXEMPLO DE AMBIENTE COM PISCINA ───────────────────────────────────────
        ambiente3: {
            name: "Área Externa",
            visible: true,
            order: 3,
            hasPhoto: true,
            features: {
                luzes: true,
                cortinas: false,
                conforto: false,
                tv: false,
                htv: false,
                musica: true,
                piscina: true              // Habilita controles de piscina
            },
            lights: [
                { id: "ID12", name: "Luz Piscina" }
            ],
            curtains: [],
            airConditioner: null,
            tv: null,
            htv: null,
            audio: {
                receiverId: "ID13",
                zone: "zona2"
            },
            // Controles específicos de piscina
            pool: {
                cascata: { id: "ID14", name: "Cascata" },
                hidro: { id: "ID15", name: "Hidro" },
                deck: { id: "ID16", name: "Deck" },
                luzPiscina: { id: "ID17", name: "Luz Piscina" }
            }
        },

        // Adicione mais ambientes conforme necessário...
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // DISPOSITIVOS GLOBAIS
    // ═══════════════════════════════════════════════════════════════════════════
    
    devices: {
        // Mapeamento de ar-condicionado (ambiente → deviceId)
        airConditioners: {
            "ambiente1": "ID5",
            // Adicione outros ACs...
        },

        // Dispositivos para polling inicial
        initializeDevices: [
            "ID1", "ID2", "ID3"  // IDs dos dispositivos principais
        ],

        // Receivers de áudio
        receivers: {
            zona1: { id: "ID10", name: "Receiver Principal" },
            zona2: { id: "ID13", name: "Receiver Externo" }
        },

        // FireTV (se tiver)
        fireTV: {
            deviceId: "ID18"
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CENÁRIOS
    // ═══════════════════════════════════════════════════════════════════════════
    
    scenes: {
        allLightsOn: {
            name: "Todas Ligadas",
            icon: "icon-all-lights-on.svg",
            description: "Liga todas as luzes",
            useAllLights: true,
            command: "on"
        },
        allLightsOff: {
            name: "Todas Desligadas",
            icon: "icon-all-lights-off.svg",
            description: "Desliga todas as luzes",
            useAllLights: true,
            command: "off"
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // IMAGENS
    // ═══════════════════════════════════════════════════════════════════════════
    
    images: {
        basePath: "images/optimized",
        rooms: {
            ambiente1: { filename: "ambiente1", alt: "Nome do Ambiente", sizes: [320, 640, 960, 1280] },
            ambiente2: { filename: "corredor", alt: "Corredor", sizes: [320, 640, 960, 1280] },
            ambiente3: { filename: "externa", alt: "Área Externa", sizes: [320, 640, 960, 1280] }
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MACROS
    // ═══════════════════════════════════════════════════════════════════════════
    
    macros: {
        // Exemplo de macro TV
        ambiente1TvOn: {
            steps: [
                { deviceId: "ID6", command: "on", delay: 0 },
                { deviceId: "ID7", command: "on", delay: 500 },
                { deviceId: "ID7", command: "sourceTv", delay: 1000 }
            ]
        },
        ambiente1TvOff: {
            steps: [
                { deviceId: "ID6", command: "off", delay: 0 },
                { deviceId: "ID7", command: "off", delay: 500 }
            ]
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CONFIGURAÇÕES GERAIS
    // ═══════════════════════════════════════════════════════════════════════════
    
    polling: {
        enabled: true,
        intervalMs: 5000,
        batchSize: 10,
        retryAttempts: 3,
        retryDelayMs: 1000
    },

    ui: {
        defaultAcTemp: 22,
        minAcTemp: 16,
        maxAcTemp: 30,
        enableAnimations: true,
        debugMode: false
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// FUNÇÕES AUXILIARES (NÃO EDITAR ESTA SEÇÃO)
// ═══════════════════════════════════════════════════════════════════════════════

function getAllLightIds() {
    const ids = [];
    Object.values(CLIENT_CONFIG.environments).forEach(env => {
        if (env.lights && env.lights.length > 0) {
            env.lights.forEach(light => ids.push(light.id));
        }
    });
    return ids;
}

function getAllCurtainIds() {
    const ids = [];
    Object.values(CLIENT_CONFIG.environments).forEach(env => {
        if (env.curtains && env.curtains.length > 0) {
            env.curtains.forEach(curtain => ids.push(curtain.id));
        }
    });
    return ids;
}

function getEnvironmentLightIds(envKey) {
    const env = CLIENT_CONFIG.environments[envKey];
    if (!env || !env.lights) return [];
    return env.lights.map(light => light.id);
}

function getEnvironmentCurtainIds(envKey) {
    const env = CLIENT_CONFIG.environments[envKey];
    if (!env || !env.curtains) return [];
    return env.curtains.map(curtain => curtain.id);
}

function getVisibleEnvironments() {
    return Object.entries(CLIENT_CONFIG.environments)
        .filter(([_, env]) => env.visible)
        .sort((a, b) => a[1].order - b[1].order)
        .map(([key, env]) => ({ key, ...env }));
}

function getEnvironment(envKey) {
    return CLIENT_CONFIG.environments[envKey] || null;
}

function environmentHasFeature(envKey, feature) {
    const env = CLIENT_CONFIG.environments[envKey];
    return env && env.features && env.features[feature] === true;
}

function getEnvironmentLabels() {
    const labels = {};
    Object.entries(CLIENT_CONFIG.environments).forEach(([key, env]) => {
        labels[key] = env.name;
    });
    return labels;
}

function getAcDeviceIds() {
    return CLIENT_CONFIG.devices.airConditioners;
}

async function executeMacro(macroName) {
    const macro = CLIENT_CONFIG.macros[macroName];
    if (!macro || !macro.steps) {
        console.error(`Macro não encontrada: ${macroName}`);
        return;
    }
    for (const step of macro.steps) {
        if (step.delay > 0) {
            await new Promise(resolve => setTimeout(resolve, step.delay));
        }
        if (typeof sendHubitatCommand === 'function') {
            await sendHubitatCommand(step.deviceId, step.command);
        }
    }
}

function getHomeRoomsData() {
    const visibleEnvs = getVisibleEnvironments();
    return visibleEnvs.map(env => ({
        name: env.name,
        route: env.key,
        deviceIds: env.lights ? env.lights.map(l => l.id) : []
    }));
}

// Exportar funções para uso global
window.CLIENT_CONFIG = CLIENT_CONFIG;
window.getAllLightIds = getAllLightIds;
window.getAllCurtainIds = getAllCurtainIds;
window.getEnvironmentLightIds = getEnvironmentLightIds;
window.getEnvironmentCurtainIds = getEnvironmentCurtainIds;
window.getVisibleEnvironments = getVisibleEnvironments;
window.getEnvironment = getEnvironment;
window.environmentHasFeature = environmentHasFeature;
window.getEnvironmentLabels = getEnvironmentLabels;
window.getAcDeviceIds = getAcDeviceIds;
window.executeMacro = executeMacro;
window.getHomeRoomsData = getHomeRoomsData;

console.log('✅ CLIENT_CONFIG carregado:', CLIENT_CONFIG.clientInfo.name);
