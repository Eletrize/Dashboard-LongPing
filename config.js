/**
 * ╔═══════════════════════════════════════════════════════════════════════════════╗
 * ║                    DASHBOARD ELETRIZE - CONFIGURAÇÃO DO CLIENTE               ║
 * ╠═══════════════════════════════════════════════════════════════════════════════╣
 * ║  Este arquivo contém TODAS as configurações específicas do cliente.           ║
 * ║  Para configurar um novo cliente, edite APENAS este arquivo.                  ║
 * ║                                                                               ║
 * ║  COMO USAR:                                                                   ║
 * ║  1. Preencha os dados do cliente em clientInfo                                ║
 * ║  2. Configure os ambientes em environments                                    ║
 * ║  3. Adicione os IDs dos dispositivos Hubitat em devices                       ║
 * ║  4. Configure os cenários em scenes                                           ║
 * ║  5. Salve e recarregue a página                                               ║
 * ║                                                                               ║
 * ║  DISPOSITIVOS DE MÍDIA (Projetores/TVs):                                      ║
 * ║  • Configure em cada ambiente usando "mediaControl"                           ║
 * ║  • Adicione quantos dispositivos quiser (sem limite)                          ║
 * ║  • Personalize nomes e descrições livremente                                  ║
 * ║  • Deixe arrays vazios [] se não houver dispositivos daquele tipo             ║
 * ║                                                                               ║
 * ║  Exemplo:                                                                     ║
 * ║    mediaControl: {                                                            ║
 * ║      projectors: [                                                            ║
 * ║        { id: "101", name: "Projetor Principal", description: "4K" }           ║
 * ║      ],                                                                       ║
 * ║      televisions: [                                                           ║
 * ║        { id: "201", name: "TV Sala", description: "65 polegadas" },           ║
 * ║        { id: "202", name: "TV Quarto" }                                       ║
 * ║      ],                                                                       ║
 * ║      playback: { ... }                                                        ║
 * ║    }                                                                          ║
 * ╚═══════════════════════════════════════════════════════════════════════════════╝
 */

const CLIENT_CONFIG = {

    // ═══════════════════════════════════════════════════════════════════════════
    // CORES DO TEMA
    // ═══════════════════════════════════════════════════════════════════════════
    // Configure as cores do app aqui. Todas as cores são aplicadas dinamicamente.
    // ═══════════════════════════════════════════════════════════════════════════
    
    theme: {
        // Cor de fundo principal do app
        background: "#E3E3E3",
        
        // ─────────────────────────────────────────────────────────────────────────
        // NAVBAR (Barra de Navegação Inferior)
        // ─────────────────────────────────────────────────────────────────────────
        
        // Cor de fundo da navbar
        navbar: "#008739",
        
        // Cor escura da navbar (bordas, sombras)
        navbarDark: "#008739",
        
        // Cor da borda superior da navbar
        navbarBorder: "#008739",
        
        // Cor do corpo do indicador/seletor de página
        navbarIndicator: "#006629",
        
        // Cor da bolinha do indicador (círculo)
        navbarIndicatorCircle: "#008739",
        
        // ─────────────────────────────────────────────────────────────────────────
        // ÍCONES DA NAVBAR
        // ─────────────────────────────────────────────────────────────────────────
        
        // Cor dos ícones quando selecionados (ativo)
        iconActive: "#ffffffff",
        
        // Cor dos ícones quando não selecionados (inativo)
        iconInactive: "#00491dff",
        
        // Cor do círculo ao redor do ícone ativo (se houver)
        iconActiveCircle: "#ffffffff",
        
        // ─────────────────────────────────────────────────────────────────────────
        // OUTRAS CORES
        // ─────────────────────────────────────────────────────────────────────────
        
        // Cor do texto principal
        textPrimary: "#333333",
        
        // Cor do texto secundário
        textSecondary: "#666666",
        
        // Cor de cards e elementos de fundo
        cardBackground: "#FFFFFF",
        
        // Cor de bordas
        border: "#CCCCCC",
        
        // Cor da linha do header (abaixo do logo)
        headerLine: "#FFFFFF"
    },
    
    // ═══════════════════════════════════════════════════════════════════════════
    // INFORMAÇÕES DO CLIENTE
    // ═══════════════════════════════════════════════════════════════════════════
    clientInfo: {
        name: "LongPing",           // Nome exibido no menu
        projectName: "Dashboard LongPing", // Nome do projeto
        location: "Cravinhos, SP",        // Localização
        version: "1.0.0"                   // Versão do deploy
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CONFIGURAÇÃO DOS AMBIENTES (CÔMODOS)
    // ═══════════════════════════════════════════════════════════════════════════
    // Cada ambiente pode ter: luzes, cortinas, ar-condicionado, TV, HTV, música
    // Os recursos disponíveis determinam quais botões aparecem no painel
    // ═══════════════════════════════════════════════════════════════════════════
    
    environments: {
        // AMBIENTE 1 ─────────────────────────────────────────────────────────────
        ambiente1: {
            name: "Prólogo",
            visible: true,
            order: 1,
            // ┌─────────────────────────────────────────────────────────────────┐
            // │ FOTO DO AMBIENTE - DUAS OPÇÕES:                                 │
            // │                                                                 │
            // │ OPÇÃO 1 - Imagem única (mais simples):                          │
            // │   photoFilename: "Prologo.png"                                  │
            // │   → Coloque o arquivo em: images/Images/Prologo.png             │
            // │   → Funciona com .png, .jpg, .jpeg, .webp                       │
            // │                                                                 │
            // │ OPÇÃO 2 - Versões otimizadas (melhor performance):              │
            // │   photoFilename: "photo-ambiente"                               │
            // │   → Arquivos em: images/optimized/photo-ambiente-480.webp, etc. │
            // └─────────────────────────────────────────────────────────────────┘
            hasPhoto: true,
            photoFilename: "Prologo.webp",    // Nome do arquivo (com extensão = imagem única)
            photoAlt: "Prólogo",             // Texto alternativo da imagem
            // ┌─────────────────────────────────────────────────────────────────┐
            // │ FEATURES DO AMBIENTE - Botões que aparecem na página           │
            // │                                                                 │
            // │ Cada feature precisa de:                                        │
            // │   - label: Nome que aparece no botão                            │
            // │   - icon: Nome do arquivo de ícone (pasta images/icons/)        │
            // │   - route: Rota da página (luzes, cortinas, conforto, etc.)     │
            // │                                                                 │
            // │ Exemplo:                                                        │
            // │   feature1: { label: "Luzes", icon: "icon-small-light-off.svg", route: "luzes" },│
            // │   feature2: { label: "Áudio", icon: "icon-musica.svg", route: "musica" },       │
            // │                                                                 │
            // │ Rotas disponíveis: luzes, cortinas, conforto, musica, tv, htv,  │
            // │                    midia                                         │
            // │ Ícones disponíveis em: images/icons/                            │
            // └─────────────────────────────────────────────────────────────────┘
            // │ PÁGINA "MÍDIA" PERSONALIZADA:                                   │
            // │ Se este ambiente tiver vários dispositivos de mídia             │
            // │ (música, projetores, televisores, etc.), use a chave            │
            // │ "media.buttons" para definir quais cartões aparecem             │
            // │ dentro da página Mídia e a chave "media.icon" para escolher     │
            // │ qual ícone será exibido no botão principal "Mídia".             │
            // │   media: {                                                      │
            // │     icon: "icon-midia.svg",                                     │
            // │     buttons: [                                                 │
            // │       { label: "Música", icon: "icon-musica.svg", route: "musica" },          │
            // │       { label: "Projetores", icon: "icon-projetor.svg", route: "tv" }         │
            // │     ]                                                           │
            // │   }                                                             │
            // │ Se não configurar nada, o sistema tenta detectar                │
            // │ automaticamente baseado nas features existentes.               │
            // └─────────────────────────────────────────────────────────────────┘
            features: {
                feature1: { label: "Iluminação", icon: "icon-small-light-off.svg", route: "luzes" },
                feature2: { label: "Conforto", icon: "ar-condicionado.svg", route: "conforto" },
                feature3: { label: "Mídia", icon: "icon-media.svg", route: "midia" },
                featureScene: { label: "Executar Cenário", icon: "icon-scenes.svg", action: "executeScene" }
            },
            media: {
                icon: "icon-media.svg",
                buttons: [
                    { label: "Áudio", icon: "icon-musica.svg", route: "musica" },
                    { label: "Projetores", icon: "icon-projetor.svg", route: "tv" }
                ]
            },
            // ┌─────────────────────────────────────────────────────────────────┐
            // │ CONTROLE DE MÍDIA - Configure dispositivos de áudio/vídeo aqui │
            // │                                                                 │
            // │ PROJETORES: Lista de projetores do ambiente                     │
            // │   - Adicione quantos projetores quiser                          │
            // │   - Cada projetor precisa de: id (device Hubitat) e name        │
            // │   - Exemplo:                                                    │
            // │     projectors: [                                               │
            // │       { id: "101", name: "Projetor Principal" },                │
            // │       { id: "102", name: "Projetor Secundário" }                │
            // │     ]                                                           │
            // │                                                                 │
            // │ TELEVISORES: Lista de televisores do ambiente                   │
            // │   - Adicione quantos televisores quiser                         │
            // │   - Cada TV precisa de: id (device Hubitat) e name             │
            // │   - Opcionalmente adicione: description                         │
            // │   - Exemplo:                                                    │
            // │     televisions: [                                              │
            // │       { id: "114", name: "TV Sala", description: "55 polegadas" },│
            // │       { id: "115", name: "TV Quarto" }                          │
            // │     ]                                                           │
            // │                                                                 │
            // │ PLAYBACK: Controles de reprodução de áudio                      │
            // │   - powerDevices: IDs dos dispositivos que serão ligados/desligados│
            // │   - transportDeviceId: ID do receiver para play/pause           │
            // │   - volumeDeviceId: ID do receiver para controle de volume      │
            // │   - volumeLabel: Texto que aparece no controle de volume        │
            // │                                                                 │
            // │ DEIXE VAZIO [] SE NÃO TIVER DISPOSITIVOS DAQUELE TIPO          │
            // └─────────────────────────────────────────────────────────────────┘
            mediaControl: {
                projectors: [],
                televisions: [
                    { id: "69", name: "Telão Entrada" }
                ],
                playback: {
                    powerDevices: ["12"],
                    transportDeviceId: "12",
                    volumeDeviceId: "132",
                    volumeLabel: "Volume geral"
                }
            },
            // IDs das luzes deste ambiente (para controle individual e master)
            lights: [
                { id: "52", name: "Spots Focal" },
                { id: "58", name: "Spots" },
                { id: "67", name: "Sanca Central" }
            ],
            // Ar-condicionado
            airConditioner: {
                zones: [
                    { id: "prologo", name: "Prólogo", deviceId: "103" }
                ]
            },
            audio: {
                receiverId: "15",
                zone: "zona1"
            },
            // ┌─────────────────────────────────────────────────────────────────┐
            // │ REGRAS CUSTOMIZADAS PARA CENÁRIOS                               │
            // │                                                                 │
            // │ Se você tem uma Rule Machine ou RM Legacy configurada no        │
            // │ Hubitat para controlar o cenário deste ambiente, você pode      │
            // │ usar essa configuração em vez dos comandos automáticos.         │
            // │                                                                 │
            // │ Para ativar, adicione:                                          │
            // │   sceneRules: {                                                 │
            // │     on: { ruleId: "123", label: "Ligar Prólogo" },             │
            // │     off: { ruleId: "124", label: "Desligar Prólogo" }          │
            // │   }                                                             │
            // │                                                                 │
            // │ O ruleId é o ID da regra no Hubitat (número do dispositivo).   │
            // │ Quando configurado, o sistema usará APENAS essas regras e      │
            // │ ignorará os dispositivos individuais (luzes, cortinas, etc).   │
            // └─────────────────────────────────────────────────────────────────┘
            // sceneRules: {
            //     on: { ruleId: "266", label: "Cenário Prólogo ON" },
            //     off: { ruleId: "267", label: "Cenário Prólogo OFF" }
            // }
        },

        // AMBIENTE 2 ─────────────────────────────────────────────────────────────
        ambiente2: {
            name: "Circulação",
            visible: true,
            order: 2,
            hasPhoto: true,
            photoFilename: "circulacao.webp",
            photoAlt: "Circulação",
            features: {
                feature1: { label: "Iluminação", icon: "icon-small-light-off.svg", route: "luzes" },
                feature2: { label: "Conforto", icon: "ar-condicionado.svg", route: "conforto" },
                featureScene: { label: "Executar Cenário", icon: "icon-scenes.svg", action: "executeScene" }
            },
            lights: [
                { id: "62", name: "Spots" },
                { id: "55", name: "LED Quente" },
                { id: "54", name: "LED Frio" }
            ],
            airConditioner: {
                zones: [
                    { id: "circulacao", name: "Circulação", deviceId: "104" },
                    { id: "circulacao2", name: "Circulação 2", deviceId: "105" }
                ]
            },
            audio: {
                receiverId: "29",
                zone: "zona3"
            }
        },

        // AMBIENTE 3 ─────────────────────────────────────────────────────────────
        ambiente3: {
            name: "Imersão",
            visible: true,
            order: 3,
            hasPhoto: true,
            photoFilename: "projecao.webp",
            photoAlt: "Projeção",
            features: {
                feature1: { label: "Mídia", icon: "icon-media.svg", route: "midia" },
                featureScene: { label: "Executar Cenário", icon: "icon-scenes.svg", action: "executeScene" }
            },
            // ┌─────────────────────────────────────────────────────────────────┐
            // │ EXEMPLO COMPLETO: Vários projetores e televisores              │
            // │                                                                 │
            // │ Este ambiente mostra como configurar múltiplos dispositivos    │
            // │ Você pode adicionar ou remover itens conforme necessário       │
            // └─────────────────────────────────────────────────────────────────┘
            mediaControl: {
                projectors: [
                    { id: "114", name: "Projetor Direita A" },
                    { id: "112", name: "Projetor Direita B" },
                    { id: "113", name: "Projetor Esquerda A" },
                    { id: "115", name: "Projetor Esquerda B" },
                    { id: "110", name: "Projetor Frente A" },
                    { id: "111", name: "Projetor Frente B" }
                ],
                televisions: [],
                computers: [
                    { id: "", name: "Computador" }
                ],
                playback: {
                    powerDevices: ["16"],
                    transportDeviceId: "16",
                    volumeDeviceId: "130",
                    volumeLabel: "Volume geral"
                }
            },
        },

        // AMBIENTE 4 ─────────────────────────────────────────────────────────────
        ambiente4: {
            name: "Pesquisa",
            visible: true,
            order: 4,
            hasPhoto: true,
            photoFilename: "pesquisa.webp",
            photoAlt: "Pesquisa",
            features: {
                feature1: { label: "Iluminação", icon: "icon-small-light-off.svg", route: "luzes" },
                feature2: { label: "Mídia", icon: "icon-media.svg", route: "midia" },
                featureScene: { label: "Executar Cenário", icon: "icon-scenes.svg", action: "executeScene" }
            },
            // ┌─────────────────────────────────────────────────────────────────┐
            // │ DICA: Você pode ter apenas 1 dispositivo                       │
            // │                                                                 │
            // │ Este exemplo mostra como configurar um único televisor         │
            // │ O sistema funciona com qualquer quantidade: 1, 2, 10, etc.     │
            // └─────────────────────────────────────────────────────────────────┘
            mediaControl: {
                projectors: [],
                televisions: [
                    { id: "121", name: "Televisão 1", description: "Smart TV principal" }
                ],
                computers: [
                    { id: "", name: "Computador" }
                ],
                playback: {
                    powerDevices: ["125"],
                    transportDeviceId: "125",
                    volumeDeviceId: "125",
                    volumeLabel: "Volume geral"
                }
            },
            lights: [
                { id: "60", name: "Spots" },
                { id: "53", name: "Sanca Parede" }
            ],
            curtains: [],
            airConditioner: {
                zones: [
                    { id: "pesquisa", name: "Pesquisa", deviceId: "106" }
                ]
            },
            tv: null,
            htv: null,
            audio: null,
            // Telão
            telao: {
                deviceId: "157",
                receiverId: "16",
                zone: "zona2"
            }
        },

        // AMBIENTE 5 ─────────────────────────────────────────────────────────────
        ambiente5: {
            name: "Brasil",
            visible: true,
            order: 5,
            hasPhoto: true,
            photoFilename: "brasil.webp",
            photoAlt: "Brasil",
            // Opcional: Nomes específicos dos arquivos de foto (deixe vazio para usar o padrão)
            // photoFiles: {
            //     "320": "photo-servico-320w.webp",
            //     "640": "photo-servico-640w.webp",
            //     "960": "photo-servico-960w.webp",
            //     "1280": "photo-servico-1280w.webp",
            //     "1920": "photo-servico-1920w.webp"
            // },
            features: {
                feature1: { label: "Iluminação", icon: "icon-small-light-off.svg", route: "luzes" },
                featureScene: { label: "Executar Cenário", icon: "icon-scenes.svg", action: "executeScene" }
            },
            lights: [
                { id: "64", name: "Led Parede" },
                { id: "61", name: "Spots" }
            ],
            curtains: [],
            airConditioner: null,
            tv: null,
            htv: null,
            audio: null
        },

        // AMBIENTE 6 ─────────────────────────────────────────────────────────────
        ambiente6: {
            name: "Maquete",
            visible: true,
            order: 6,
            hasPhoto: true,
            photoFilename: "maquete.webp",
            photoAlt: "Maquete",
            // Opcional: Nomes específicos dos arquivos de foto (deixe vazio para usar o padrão)
            // photoFiles: {
            //     "320": "photo-circulacao-320w.webp",
            //     "640": "photo-circulacao-640w.webp",
            //     "960": "photo-circulacao-960w.webp",
            //     "1280": "photo-circulacao-1280w.webp",
            //     "1920": "photo-circulacao-1920w.webp"
            // },
            features: {
                feature1: { label: "Iluminação", icon: "icon-small-light-off.svg", route: "luzes" },
                feature2: { label: "Conforto", icon: "ar-condicionado.svg", route: "conforto" },
                feature3: { label: "Mídia", icon: "icon-media.svg", route: "midia" },
                featureScene: { label: "Executar Cenário", icon: "icon-scenes.svg", action: "executeScene" }
            },
            // ┌─────────────────────────────────────────────────────────────────┐
            // │ EXEMPLO: Projetores E Televisores juntos                       │
            // │                                                                 │
            // │ Você pode ter ambos os tipos de dispositivo no mesmo ambiente  │
            // │ Personalize os nomes e IDs conforme seus dispositivos reais    │
            // └─────────────────────────────────────────────────────────────────┘
            mediaControl: {
                projectors: [
                    { id: "117", name: "Projetor Direita"},
                    { id: "116", name: "Projetor Esquerda"},
                    { id: "119", name: "Projetor Traseiro" },
                    { id: "118", name: "Projetor Meio" },
                    { id: "120", name: "Projetor Parede" }
                ],
                televisions: [
                    { id: "", name: "Televisão 1"},
                    { id: "", name: "Televisão 2"}
                ],
                computers: [
                    { id: "", name: "Computador" }
                ],
                playback: {
                    powerDevices: [""],
                    transportDeviceId: "",
                    volumeDeviceId: "131",
                    volumeLabel: "Volume geral"
                }
            },
            lights: [
                { id: "40", name: "Spots" },
                { id: "44", name: "Spots TV" }
            ],
            curtains: [],
            airConditioner: {
                zones: [
                    { id: "maquete", name: "Maquete", deviceId: "107" }
                ]
            },
            tv: null,
            htv: null,
            audio: null
        },

        // AMBIENTE 7 ─────────────────────────────────────────────────────────────
        ambiente7: {
            name: "Holograma",
            visible: true,
            order: 7,
            hasPhoto: true,
            photoFilename: "holograma.webp",
            photoAlt: "Holograma",
            features: {
                feature1: { label: "Iluminação", icon: "icon-small-light-off.svg", route: "luzes" },
                featureScene: { label: "Executar Cenário", icon: "icon-scenes.svg", action: "executeScene" }
            },
            mediaControl: {
                projectors: [],
                televisions: [],
                playback: {
                    powerDevices: ["127"],
                    transportDeviceId: "127",
                    volumeDeviceId: "",
                    volumeLabel: "Volume geral"
                }
            },
            lights: [],
            curtains: [],
            airConditioner: null,
            tv: null,
            htv: null,
            audio: null
        },

        // AMBIENTE 8 ─────────────────────────────────────────────────────────────
        ambiente8: {
            name: "Processos",
            visible: true,
            order: 8,
            hasPhoto: true,
            photoFilename: "processos.webp",
            photoAlt: "Processos",
            // Opcional: Nomes específicos dos arquivos de foto (deixe vazio para usar o padrão)
            // photoFiles: {
            //     "320": "photo-circulacao-320w.webp",
            //     "640": "photo-circulacao-640w.webp",
            //     "960": "photo-circulacao-960w.webp",
            //     "1280": "photo-circulacao-1280w.webp",
            //     "1920": "photo-circulacao-1920w.webp"
            // },
            features: {
                feature1: { label: "Iluminação", icon: "icon-small-light-off.svg", route: "luzes" },
                feature2: { label: "Conforto", icon: "ar-condicionado.svg", route: "conforto" },
                feature3: { label: "Mídia", icon: "icon-media.svg", route: "midia" },
                featureScene: { label: "Executar Cenário", icon: "icon-scenes.svg", action: "executeScene" }
            },
            // ┌─────────────────────────────────────────────────────────────────┐
            // │ EXEMPLO: Projetores E Televisores juntos                       │
            // │                                                                 │
            // │ Você pode ter ambos os tipos de dispositivo no mesmo ambiente  │
            // │ Personalize os nomes e IDs conforme seus dispositivos reais    │
            // └─────────────────────────────────────────────────────────────────┘
            mediaControl: {
                projectors: [],
                televisions: [
                    { id: "129", name: "Processo Direita"},
                    { id: "128", name: "Processo Esquerda"}
                ],
                computers: [
                    { id: "", name: "Computador" }
                ],
                playbackDevices: [
                    {
                        key: "player1",
                        label: "Processo Direita",
                        powerDevices: ["129"],
                        transportDeviceId: "129",
                        volumeDeviceId: "129",
                        volumeLabel: "Volume Processo Direita"
                    },
                    {
                        key: "player2",
                        label: "Processo Esquerda",
                        powerDevices: ["128"],
                        transportDeviceId: "128",
                        volumeDeviceId: "128",
                        volumeLabel: "Volume Processo Esquerda"
                    }
                ]
            },
            lights: [
                { id: "40", name: "Spots" },
                { id: "44", name: "Spots TV" }
            ],
            curtains: [],
            airConditioner: {
                zones: [
                    { id: "maquete", name: "Maquete", deviceId: "107" }
                ]
            },
            tv: null,
            htv: null,
            audio: null
        },

        // AMBIENTE 9 ─────────────────────────────────────────────────────────────
        ambiente9: {
            name: "Cultura",
            visible: true,
            order: 9,
            hasPhoto: true,
            photoFilename: "cultura.webp",
            photoAlt: "Cultura",
            // Opcional: Nomes específicos dos arquivos de foto (deixe vazio para usar o padrão)
            // photoFiles: {
            //     "320": "photo-suite1-320w.webp",
            //     "640": "photo-suite1-640w.webp",
            //     "960": "photo-suite1-960w.webp",
            //     "1280": "photo-suite1-1280w.webp",
            //     "1920": "photo-suite1-1920w.webp"
            // },
            features: {
                feature1: { label: "Iluminação", icon: "icon-small-light-off.svg", route: "luzes" },
                feature2: { label: "Conforto", icon: "ar-condicionado.svg", route: "conforto" },
                featureScene: { label: "Executar Cenário", icon: "icon-scenes.svg", action: "executeScene" }
            },
            lights: [
                { id: "45", name: "Led Prateleira" },
                { id: "43", name: "Spots" },
                { id: "57", name: "Led" },
                { id: "63", name: "Led" },
                { id: "59", name: "Spots Prateleira" },
            ],
            curtains: [
                { id: "192", name: "Veneziana 1", type: "veneziana" },
                { id: "193", name: "Veneziana 2", type: "veneziana" }
            ],
            airConditioner: {
                zones: [
                    { id: "cultura", name: "Cultura", deviceId: "108" }
                ]
            },
            tv: null,
            htv: null,
            audio: null
        },

        // AMBIENTE 10 ────────────────────────────────────────────────────────────
        ambiente10: {
            name: "Descanso",
            visible: true,
            order: 10,
            hasPhoto: true,
            photoFilename: "descanso.webp",
            photoAlt: "Descanso",
            // Opcional: Nomes específicos dos arquivos de foto (deixe vazio para usar o padrão)
            // photoFiles: {
            //     "320": "photo-suite2-320w.webp",
            //     "640": "photo-suite2-640w.webp",
            //     "960": "photo-suite2-960w.webp",
            //     "1280": "photo-suite2-1280w.webp",
            //     "1920": "photo-suite2-1920w.webp"
            // },
            features: {
                feature1: { label: "Iluminação", icon: "icon-small-light-off.svg", route: "luzes" },
                feature2: { label: "Conforto", icon: "ar-condicionado.svg", route: "conforto" },
                feature3: { label: "Mídia", icon: "icon-media.svg", route: "midia" }
            },
            // ┌─────────────────────────────────────────────────────────────────┐
            // │ EXEMPLO: Apenas televisores                                    │
            // │                                                                 │
            // │ Configure apenas TVs, deixando projectors vazio []             │
            // └─────────────────────────────────────────────────────────────────┘
            mediaControl: {
                projectors: [],
                televisions: [
                    { id: "124", name: "TV", description: "Televisão principal" }
                ],
                playback: {
                    powerDevices: [],
                    transportDeviceId: "126",
                    volumeDeviceId: "132",
                    volumeLabel: "Volume geral"
                }
            },
            lights: [
                { id: "42", name: "Led Nicho" },
                { id: "41", name: "Spots" },
                { id: "65", name: "Sanca" },
                { id: "66", name: "Trilho" }
            ],
            curtains: [
                { id: "194", name: "Veneziana", type: "veneziana" }
            ],
            airConditioner: {
                zones: [
                    { id: "descanso", name: "Descanso", deviceId: "109" }
                ]
            },
            tv: {
                deviceId: "124",
                volumeDeviceId: "124",
                receiverId: null,
                hasMacro: true,
                macroName: "suite2"
            },
            htv: null,
            audio: null
        },

        // AMBIENTE 11 ────────────────────────────────────────────────────────────
        ambiente11: {
            name: "Banheiros",
            visible: true,
            order: 11,
            hasPhoto: true,
            photoFilename: "Banheiros.webp",
            photoAlt: "Banheiros",
            features: {
                feature1: { label: "Iluminação", icon: "icon-small-light-off.svg", route: "luzes" }
            },
            lights: [
                { id: "49", name: "Barra Led e Exaustor Feminino" },
                { id: "47", name: "Barra Led e Exaustor Masculino" },
                { id: "48", name: "Espelho e Spots Feminino" },
                { id: "46", name: "Espelho e Spots Masculino" },
                { id: "50", name: "Plafon e Led PCD" }
            ],
            curtains: [],
            airConditioner: null,
            tv: null,
            htv: null,
            audio: null
        }

    },

    

    // ═══════════════════════════════════════════════════════════════════════════
    // DISPOSITIVOS GLOBAIS
    // ═══════════════════════════════════════════════════════════════════════════
    // Dispositivos que não pertencem a um ambiente específico ou são compartilhados
    // ═══════════════════════════════════════════════════════════════════════════
    
    devices: {
        // Mapeamento de dispositivos de ar-condicionado para controle de temperatura
        airConditioners: {
            "prologo": "103",
            "circulacao": "104",
            "circulacao2": "105",
            "pesquisa": "106",
            "maquete": "107",
            "cultura": "108",
            "descanso": "109"
        },

        // Dispositivos para inicialização (polling inicial)
        initializeDevices: [
            "52", "58", "67",  // Luzes Prólogo
            "103"              // AC Prólogo
        ],

        // Receptores de áudio
        receivers: {
            zona1: { id: "15", name: "Receiver Zona 1" },
            zona2: { id: "16", name: "Receiver Zona 2" },
            zona3: { id: "29", name: "Receiver Zona 3" },
            zona4: { id: "195", name: "Receiver Zona 4" }
        },

        // FireTV
        fireTV: {
            deviceId: "197"
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CONFIGURAÇÃO DE CENÁRIOS
    // ═══════════════════════════════════════════════════════════════════════════
    // Cenários são ações pré-configuradas que acionam múltiplos dispositivos
    // ═══════════════════════════════════════════════════════════════════════════
    
    scenes: {
        // Cenário: Todas as Luzes Ligadas
        allLightsOn: {
            name: "Todas Ligadas",
            icon: "icon-all-lights-on.svg",
            description: "Liga todas as luzes da casa",
            useAllLights: true,
            command: "on"
        },

        // Cenário: Todas as Luzes Desligadas
        allLightsOff: {
            name: "Todas Desligadas",
            icon: "icon-all-lights-off.svg",
            description: "Desliga todas as luzes da casa",
            useAllLights: true,
            command: "off"
        },

        // Cenário: Varanda Ligada
        varandaOn: {
            name: "Varanda",
            icon: "icon-light-on.svg",
            description: "Liga todas as luzes da varanda",
            environment: "ambiente1",
            command: "on"
        },

        // Cenário: Varanda Desligada
        varandaOff: {
            name: "Varanda Off",
            icon: "icon-light-off.svg",
            description: "Desliga todas as luzes da varanda",
            environment: "ambiente1",
            command: "off"
        },

        // Cenário: Living Ligado
        livingOn: {
            name: "Living",
            icon: "icon-light-on.svg",
            description: "Liga todas as luzes do living",
            environment: "ambiente2",
            command: "on"
        },

        // Cenário: Living Desligado
        livingOff: {
            name: "Living Off",
            icon: "icon-light-off.svg",
            description: "Desliga todas as luzes do living",
            environment: "ambiente2",
            command: "off"
        },

        // Cenário: Abrir Todas Cortinas
        allCurtainsOpen: {
            name: "Abrir Cortinas",
            icon: "icon-curtain-open.svg",
            description: "Abre todas as cortinas",
            useAllCurtains: true,
            command: "push1"
        },

        // Cenário: Fechar Todas Cortinas
        allCurtainsClose: {
            name: "Fechar Cortinas",
            icon: "icon-curtain-close.svg",
            description: "Fecha todas as cortinas",
            useAllCurtains: true,
            command: "push3"
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // IMAGENS DOS AMBIENTES
    // ═══════════════════════════════════════════════════════════════════════════
    // NOTA: As fotos são configuradas em cada ambiente com photoFilename e photoAlt
    // Esta seção define apenas configurações globais de imagens
    // ═══════════════════════════════════════════════════════════════════════════
    
    images: {
        basePath: "images/optimized",        // Pasta onde ficam as imagens otimizadas
        defaultSizes: [320, 640, 960, 1280], // Tamanhos padrão das imagens responsivas
        format: "webp"                        // Formato das imagens (webp recomendado)
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MACROS DE TV/HTV
    // ═══════════════════════════════════════════════════════════════════════════
    
    macros: {
        // Varanda TV
        varandaTvOn: {
            steps: [
                { deviceId: "111", command: "on", delay: 0 },
                { deviceId: "15", command: "on", delay: 500 },
                { deviceId: "15", command: "sourceTv", delay: 1000 }
            ]
        },
        varandaTvOff: {
            steps: [
                { deviceId: "111", command: "off", delay: 0 },
                { deviceId: "15", command: "off", delay: 500 }
            ]
        },
        // Suíte 1 TV
        suite1TvOn: { steps: [{ deviceId: "184", command: "on", delay: 0 }] },
        suite1TvOff: { steps: [{ deviceId: "184", command: "off", delay: 0 }] },
        // Suíte 2 TV
        suite2TvOn: { steps: [{ deviceId: "185", command: "on", delay: 0 }] },
        suite2TvOff: { steps: [{ deviceId: "185", command: "off", delay: 0 }] },
        // Suíte Master TV
        suiteMasterTvOn: { steps: [{ deviceId: "183", command: "on", delay: 0 }] },
        suiteMasterTvOff: { steps: [{ deviceId: "183", command: "off", delay: 0 }] },
        // Telão
        telaoOn: {
            steps: [
                { deviceId: "157", command: "on", delay: 0 },
                { deviceId: "16", command: "on", delay: 500 },
                { deviceId: "16", command: "sourceGame", delay: 1000 }
            ]
        },
        telaoOff: {
            steps: [
                { deviceId: "157", command: "off", delay: 0 },
                { deviceId: "16", command: "off", delay: 500 }
            ]
        },
        // FireTV
        fireTV: { steps: [{ deviceId: "197", command: "on", delay: 0 }] }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CONFIGURAÇÕES DE POLLING
    // ═══════════════════════════════════════════════════════════════════════════
    
    polling: {
        enabled: true,
        intervalMs: 5000,
        batchSize: 10,
        retryAttempts: 3,
        retryDelayMs: 1000
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CONFIGURAÇÕES DE UI
    // ═══════════════════════════════════════════════════════════════════════════
    
    ui: {
        defaultAcTemp: 22,
        minAcTemp: 16,
        maxAcTemp: 30,
        enableAnimations: true,
        debugMode: false
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// FUNÇÕES AUXILIARES PARA ACESSO À CONFIGURAÇÃO
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Obtém a lista de todos os IDs de luzes de todos os ambientes
 */
function getAllLightIds() {
    const ids = [];
    Object.values(CLIENT_CONFIG.environments).forEach(env => {
        if (env.lights && env.lights.length > 0) {
            env.lights.forEach(light => ids.push(light.id));
        }
    });
    return ids;
}

/**
 * Obtém a lista de todos os IDs de cortinas de todos os ambientes
 */
function getAllCurtainIds() {
    const ids = [];
    Object.values(CLIENT_CONFIG.environments).forEach(env => {
        if (env.curtains && env.curtains.length > 0) {
            env.curtains.forEach(curtain => ids.push(curtain.id));
        }
    });
    return ids;
}

/**
 * Obtém os IDs de luzes de um ambiente específico
 */
function getEnvironmentLightIds(envKey) {
    const env = CLIENT_CONFIG.environments[envKey];
    if (!env || !env.lights) return [];
    return env.lights.map(light => light.id);
}

/**
 * Obtém os IDs de cortinas de um ambiente específico
 */
function getEnvironmentCurtainIds(envKey) {
    const env = CLIENT_CONFIG.environments[envKey];
    if (!env || !env.curtains) return [];
    return env.curtains.map(curtain => curtain.id);
}

/**
 * Obtém ambientes visíveis ordenados
 */
function getVisibleEnvironments() {
    return Object.entries(CLIENT_CONFIG.environments)
        .filter(([_, env]) => env.visible)
        .sort((a, b) => a[1].order - b[1].order)
        .map(([key, env]) => ({ key, ...env }));
}

/**
 * Obtém configuração de um ambiente
 */
function getEnvironment(envKey) {
    return CLIENT_CONFIG.environments[envKey] || null;
}

/**
 * Verifica se um ambiente tem determinado recurso
 */
function environmentHasFeature(envKey, feature) {
    const env = CLIENT_CONFIG.environments[envKey];
    return env && env.features && env.features[feature] === true;
}

/**
 * Obtém labels dos ambientes (para navegação)
 */
function getEnvironmentLabels() {
    const labels = {};
    Object.entries(CLIENT_CONFIG.environments).forEach(([key, env]) => {
        labels[key] = env.name;
    });
    return labels;
}

/**
 * Obtém o mapeamento AC_DEVICE_IDS para compatibilidade
 */
function getAcDeviceIds() {
    return CLIENT_CONFIG.devices.airConditioners;
}

/**
 * Executa uma macro de TV/HTV
 */
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

/**
 * Gera HTML dos cards de controle para um ambiente
 */
function generateEnvironmentControls(envKey) {
    const env = CLIENT_CONFIG.environments[envKey];
    if (!env) return '';
    
    let html = '';
    const features = env.features || {};
    
    // Mapeamento de features para ícones e labels
    const featureConfig = {
        luzes: { icon: 'icon-small-light-off.svg', label: 'Iluminação', route: '-luzes', active: true },
        cortinas: { icon: 'icon-curtain.svg', label: 'Cortinas', route: '-cortinas', active: false },
        conforto: { icon: 'ar-condicionado.svg', label: 'Conforto', route: '-conforto', active: false },
        tv: { icon: 'icon-tv.svg', label: 'Televisão', route: '-tv', active: false },
        musica: { icon: 'icon-music.svg', label: 'Áudio', route: '-musica', active: false },
        piscina: { icon: 'icon-pool.svg', label: 'Piscina', route: '-piscina', active: false },
        telao: { icon: 'icon-projector.svg', label: 'Telão', route: '-telao', active: false }
    };
    
    Object.entries(features).forEach(([feature, enabled]) => {
        if (enabled && featureConfig[feature]) {
            const cfg = featureConfig[feature];
            if (cfg.active) {
                // Feature ativa - navega para a página
                html += `
                    <div class="control-card" onclick="spaNavigate('${envKey}${cfg.route}')">
                        <img class="control-icon" src="images/icons/${cfg.icon}" alt="${cfg.label}">
                        <div class="control-label">${cfg.label}</div>
                    </div>
                `;
            } else {
                // Feature em standby - volta para home
                html += `
                    <div class="control-card" onclick="spaNavigate('home'); console.log('${cfg.label}: Em breve!');">
                        <img class="control-icon" src="images/icons/${cfg.icon}" alt="${cfg.label}">
                        <div class="control-label">${cfg.label}</div>
                    </div>
                `;
            }
        }
    });
    
    return html;
}

/**
 * Gera HTML dos controles de luzes para um ambiente
 */
function generateLightsControls(envKey) {
    const env = CLIENT_CONFIG.environments[envKey];
    if (!env || !env.lights || env.lights.length === 0) return '';
    
    let html = '';
    env.lights.forEach(light => {
        html += `
            <div class="control-card" data-state="off" data-device-id="${light.id}" onclick="toggleRoomControl(this)">
                <img class="control-icon" src="images/icons/icon-small-light-off.svg" alt="${light.name}">
                <div class="control-label">${light.name}</div>
            </div>
        `;
    });
    
    return html;
}

/**
 * Gera HTML dos controles de cortinas para um ambiente
 */
function generateCurtainsControls(envKey) {
    const env = CLIENT_CONFIG.environments[envKey];
    if (!env || !env.curtains || env.curtains.length === 0) return '';
    
    let html = '';
    env.curtains.forEach(curtain => {
        const label = curtain.type === 'veneziana' ? 'Veneziana' : 'Cortina';
        html += `
            <article class="curtain-tile curtain-tile--full-width curtain-tile--transparent" data-device-id="${curtain.id}" data-environment="${env.name}">
                <header class="curtain-tile__header curtain-tile__header--minimal">
                    <h3 class="curtain-tile__title">${curtain.name}</h3>
                    <div class="curtain-tile__line"></div>
                </header>
                <div class="curtain-tile__actions">
                    <button class="curtain-tile__btn" data-device-id="${curtain.id}" onclick="curtainAction(this, 'push1')" aria-label="Abrir ${label}">
                        <img src="images/icons/arrow-up.svg" alt="Abrir">
                    </button>
                    <button class="curtain-tile__btn" data-device-id="${curtain.id}" onclick="curtainAction(this, 'push2')" aria-label="Parar ${label}">
                        <img src="images/icons/icon-stop.svg" alt="Parar">
                    </button>
                    <button class="curtain-tile__btn" data-device-id="${curtain.id}" onclick="curtainAction(this, 'push3')" aria-label="Fechar ${label}">
                        <img src="images/icons/arrow-down.svg" alt="Fechar">
                    </button>
                </div>
            </article>
        `;
    });
    
    return html;
}

/**
 * Gera os botões de seleção de AC para um ambiente
 */
function generateAcSelectionButtons(envKey) {
    const env = CLIENT_CONFIG.environments[envKey];
    if (!env || !env.airConditioner || !env.airConditioner.zones) return '';
    
    const zones = env.airConditioner.zones;
    const gridClass = zones.length === 1 ? 'ac-modes-grid--single' : '';
    
    let html = '';
    zones.forEach((zone, index) => {
        const pressed = index === 0 ? 'true' : 'false';
        html += `
            <button type="button" class="ac-mode-btn ac-mode-btn--selection" data-mode-button data-mode="${zone.id}" aria-pressed="${pressed}" aria-label="${zone.name}">
                <span class="ac-mode-btn__label">${zone.name}</span>
            </button>
        `;
    });
    
    return `<div class="ac-modes-grid ${gridClass}">${html}</div>`;
}

/**
 * Obtém os dados para a home com rooms e dispositivos
 */
function getHomeRoomsData() {
    const visibleEnvs = getVisibleEnvironments();
    return visibleEnvs.map(env => ({
        name: env.name,
        route: env.key,
        deviceIds: env.lights ? env.lights.map(l => l.id) : []
    }));
}

/**
 * Obtém informações da foto de um ambiente
 * @param {string} envKey - Chave do ambiente (ex: "ambiente1")
 * @returns {object} - { filename, alt, basePath, sizes, files, useCustomFiles }
 */
function getEnvironmentPhoto(envKey) {
    const env = CLIENT_CONFIG.environments[envKey];
    if (!env || !env.hasPhoto) return null;
    
    // Verifica se tem arquivos específicos definidos
    const hasCustomFiles = env.photoFiles && Object.keys(env.photoFiles).length > 0;
    
    return {
        filename: env.photoFilename || envKey,
        alt: env.photoAlt || env.name,
        basePath: CLIENT_CONFIG.images.basePath,
        sizes: CLIENT_CONFIG.images.defaultSizes,
        format: CLIENT_CONFIG.images.format || 'webp',
        files: env.photoFiles || null,      // Arquivos específicos (se definidos)
        useCustomFiles: hasCustomFiles       // Flag para usar arquivos específicos
    };
}

/**
 * Gera o srcset para imagens responsivas de um ambiente
 * @param {string} envKey - Chave do ambiente
 * @returns {string} - srcset para usar no <img> ou <source>
 */
function getEnvironmentPhotoSrcset(envKey) {
    const photo = getEnvironmentPhoto(envKey);
    if (!photo) return '';
    
    // Se tem arquivos específicos, usa eles
    if (photo.useCustomFiles && photo.files) {
        return Object.entries(photo.files).map(([size, filename]) => 
            `${photo.basePath}/${filename} ${size}w`
        ).join(', ');
    }
    
    // Senão, gera automaticamente baseado no nome base
    return photo.sizes.map(size => 
        `${photo.basePath}/${photo.filename}-${size}.${photo.format} ${size}w`
    ).join(', ');
}

/**
 * Obtém o caminho de uma foto específica de um ambiente por tamanho
 * @param {string} envKey - Chave do ambiente
 * @param {number} size - Tamanho desejado (320, 640, 960, 1280)
 * @returns {string} - Caminho completo do arquivo
 */
function getEnvironmentPhotoBySize(envKey, size) {
    const photo = getEnvironmentPhoto(envKey);
    if (!photo) return '';
    
    // Se tem arquivo específico para este tamanho
    if (photo.useCustomFiles && photo.files && photo.files[size]) {
        return `${photo.basePath}/${photo.files[size]}`;
    }
    
    // Senão, gera o nome automaticamente
    return `${photo.basePath}/${photo.filename}-${size}.${photo.format}`;
}

// Exportar para uso global
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
window.generateEnvironmentControls = generateEnvironmentControls;
window.generateLightsControls = generateLightsControls;
window.generateCurtainsControls = generateCurtainsControls;
window.generateAcSelectionButtons = generateAcSelectionButtons;
window.getHomeRoomsData = getHomeRoomsData;
window.getEnvironmentPhoto = getEnvironmentPhoto;
window.getEnvironmentPhotoSrcset = getEnvironmentPhotoSrcset;
window.getEnvironmentPhotoBySize = getEnvironmentPhotoBySize;

console.log('✅ CLIENT_CONFIG carregado:', CLIENT_CONFIG.clientInfo.name);
