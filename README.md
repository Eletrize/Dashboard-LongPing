# Dashboard LongPing

Dashboard de automação para controle de ambientes via Hubitat.

## 🚀 Executando Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) versão 16 ou superior
- Acesso ao hub Hubitat (local ou cloud)

### Instalação

1. **Clone o repositório** (se ainda não fez):
   ```bash
   git clone https://github.com/Eletrize/LongPing.git
   cd LongPing
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   ```bash
   # Copie o arquivo de exemplo
   copy .env.example .env
   
   # Edite o arquivo .env com suas credenciais do Hubitat
   ```

4. **Inicie o servidor**:
   ```bash
   npm start
   ```

5. **Acesse o dashboard**:
   - Abra o navegador em: `http://localhost:3000`
   - Para acessar de outros dispositivos na rede: `http://SEU_IP:3000`

### Configuração do Hubitat

No arquivo `.env`, configure:

```env
# Porta do servidor (padrão: 3000)
PORT=3000

# URL base da API do Hubitat
# Opção 1 - Cloud (funciona de qualquer lugar):
HUBITAT_BASE_URL=https://cloud.hubitat.com/api/SEU_ID/apps/SEU_APP_ID

# Opção 2 - Local (só funciona na mesma rede):
# HUBITAT_BASE_URL=http://IP_DO_HUB/apps/api/SEU_APP_ID

# Token de acesso do Maker API
HUBITAT_ACCESS_TOKEN=seu_token_aqui
```

Para obter essas informações:
1. Acesse seu hub Hubitat
2. Vá em **Apps** → **Maker API**
3. Copie a URL base e o Access Token

## 🖥️ Executando como Serviço (Windows)

Para manter o dashboard rodando permanentemente:

### Opção 1: PM2 (Recomendado)

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Iniciar o servidor
pm2 start server.js --name "dashboard-longping"

# Configurar para iniciar com o Windows
pm2 startup
pm2 save
```

### Opção 2: Tarefa Agendada do Windows

1. Abra o **Agendador de Tarefas**
2. Crie uma nova tarefa básica
3. Configure para executar na inicialização
4. Ação: Iniciar programa
5. Programa: `node`
6. Argumentos: `C:\Eletrize\LongPing\Dashboard-LongPing\server.js`

## 📁 Estrutura do Projeto

```
Dashboard-LongPing/
├── server.js          # Servidor Express (substitui Cloudflare)
├── .env               # Configurações locais (não commitado)
├── .env.example       # Exemplo de configuração
├── config.js          # Configuração de ambientes e dispositivos
├── index.html         # Página principal do dashboard
├── script.js          # Lógica do frontend
├── styles.css         # Estilos
├── images/            # Imagens e ícones
└── functions/         # Funções Cloudflare (para deploy cloud)
```

## 🔧 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o servidor local |
| `npm run dev` | Mesmo que start (desenvolvimento) |
| `npm run dev:watch` | Inicia com auto-reload (Node 18+) |
| `npm run cloudflare:dev` | Inicia servidor Cloudflare local |
| `npm run cloudflare:deploy` | Deploy para Cloudflare Pages |

## 📱 Acesso pela Rede Local

Para acessar de tablets/celulares na mesma rede:

1. Descubra o IP do computador:
   ```bash
   ipconfig
   ```

2. Acesse pelo navegador do dispositivo:
   ```
   http://192.168.X.X:3000
   ```

## 🐛 Solução de Problemas

### "Erro ao conectar com Hubitat"
- Verifique se as credenciais no `.env` estão corretas
- Teste a URL do Hubitat no navegador
- Confirme que o Maker API está ativo

### "Porta 3000 já em uso"
- Mude a porta no `.env`: `PORT=3001`
- Ou encerre o processo usando a porta: `npx kill-port 3000`

### Dashboard não carrega
- Verifique o console do navegador (F12)
- Confirme que o servidor está rodando
- Limpe o cache do navegador

---

**Eletrize** - Automação Inteligente
