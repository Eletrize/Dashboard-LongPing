# Dashboard Eletrize - Template

Este é um template reutilizável do Dashboard Eletrize para automação residencial com Hubitat.

## 🚀 Como Usar Este Template

### Passo 1: Configurar o Cliente

Toda a configuração do cliente está centralizada no arquivo `config.js`. **Este é o único arquivo que você precisa editar para configurar um novo cliente.**

Abra o arquivo `config.js` e preencha:

#### 1.1 Informações do Cliente
```javascript
clientInfo: {
    name: "Nome do Cliente",           // Nome exibido no menu
    projectName: "Residência Cliente", // Nome do projeto
    location: "Cidade, Estado",        // Localização
    version: "1.0.0"                   // Versão do deploy
}
```

#### 1.2 Configurar Ambientes

Cada ambiente (cômodo) é configurado no objeto `environments`. Exemplo:

```javascript
ambiente1: {
    name: "Sala de Estar",    // Nome exibido
    visible: true,             // Se aparece na home
    order: 1,                  // Ordem de exibição
    hasPhoto: true,            // Se tem foto
    features: {
        luzes: true,           // Tem controle de luzes
        cortinas: true,        // Tem controle de cortinas
        conforto: true,        // Tem ar-condicionado
        tv: true,              // Tem TV
        htv: false,            // Tem HTV
        musica: true           // Tem som/música
    },
    lights: [
        { id: "123", name: "Luz Principal" },
        { id: "124", name: "Luz Secundária" }
    ],
    // ... demais configurações
}
```

#### 1.3 Configurar Dispositivos

Os IDs dos dispositivos são obtidos diretamente do Hubitat. Para encontrar um ID:

1. Acesse seu Hubitat
2. Vá em "Devices"
3. Clique no dispositivo
4. O ID está na URL: `http://hubitat/device/edit/XXX` (XXX é o ID)

### Passo 2: Adicionar Imagens dos Ambientes

1. Coloque as fotos dos ambientes na pasta `images/optimized/`
2. O nome do arquivo deve seguir o padrão: `{nome}-{largura}.webp`
   - Exemplo: `sala-320.webp`, `sala-640.webp`, `sala-960.webp`, `sala-1280.webp`
3. Atualize a configuração em `config.js`:

```javascript
images: {
    basePath: "images/optimized",
    rooms: {
        ambiente1: { 
            filename: "sala",      // Nome base do arquivo
            alt: "Sala de Estar",  // Texto alternativo
            sizes: [320, 640, 960, 1280]  // Tamanhos disponíveis
        }
    }
}
```

### Passo 3: Configurar Hubitat

1. Configure o `wrangler.toml` com as credenciais do Hubitat:

```toml
[vars]
HUBITAT_HOST = "192.168.1.xxx"
HUBITAT_ACCESS_TOKEN = "seu-access-token"
HUBITAT_APP_ID = "xxx"
```

2. Deploy para Cloudflare Workers:
```bash
npx wrangler publish
```

## 📁 Estrutura de Arquivos

```
├── config.js           # ⭐ CONFIGURAÇÃO DO CLIENTE (editar este)
├── index.html          # Estrutura HTML principal
├── script.js           # Lógica JavaScript
├── scenes.js           # Cenários e automações
├── styles.css          # Estilos CSS
├── manifest.json       # Configuração PWA
├── images/
│   ├── optimized/      # Fotos dos ambientes
│   ├── icons/          # Ícones do sistema
│   └── pwa/            # Ícones do PWA
└── functions/          # Cloudflare Workers
    ├── hubitat-proxy.js
    └── webhook.js
```

## ⚙️ Recursos Configuráveis

### Tipos de Features por Ambiente

| Feature   | Descrição              | Ícone              |
|-----------|------------------------|-------------------|
| `luzes`   | Controle de iluminação | 💡                |
| `cortinas`| Cortinas/persianas     | 🪟                |
| `conforto`| Ar-condicionado        | ❄️                |
| `tv`      | Televisão              | 📺                |
| `htv`     | HTV (segunda TV)       | 📺                |
| `musica`  | Áudio/Receiver         | 🎵                |
| `piscina` | Controles de piscina   | 🏊                |
| `telao`   | Projetor/Telão         | 🎬                |

### Tipos de Dispositivos

- **Luzes**: Switch simples (on/off) com ID Hubitat
- **Cortinas**: Motor de cortina com comandos push1/push2/push3
- **AC**: Ar-condicionado com controle de temperatura
- **TV**: Samsung/LG com comandos IR
- **Receiver**: Denon/Marantz com zonas de áudio

## 🔧 Solução de Problemas

### Config.js não está carregando
- Verifique se o arquivo `config.js` existe
- Verifique erros de sintaxe JavaScript no console
- Confirme que `config.js` está incluído antes de `script.js`

### Dispositivos não respondem
- Verifique se o ID do dispositivo está correto
- Confirme que o Hubitat está acessível
- Verifique o token de acesso

### Imagens não aparecem
- Verifique se os arquivos estão em `images/optimized/`
- Confirme o nome do arquivo no `config.js`
- Verifique se todos os tamanhos necessários existem

## 📱 Deploy

### Cloudflare Pages
```bash
npm install
npx wrangler pages deploy .
```

### Configuração DNS
Aponte seu domínio para o Cloudflare Workers/Pages conforme `CLOUDFLARE-CONFIG.md`.

---

© Eletrize Automação Residencial
