const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const HUBITAT_BASE_URL = process.env.HUBITAT_BASE_URL;
const HUBITAT_ACCESS_TOKEN = process.env.HUBITAT_ACCESS_TOKEN;
const HUBITAT_FULL_URL = process.env.HUBITAT_FULL_URL;

// MIME types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

// ========== HUBITAT PROXY FUNCTIONS ==========

function handleHubitatProxy(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const device = url.searchParams.get('device');
  const command = url.searchParams.get('command');
  const value = url.searchParams.get('value');
  const value2 = url.searchParams.get('value2');

  if (!device || !command) {
    res.writeHead(400, { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return res.end(JSON.stringify({ error: 'Parâmetros obrigatórios: device e command' }));
  }

  if (!HUBITAT_BASE_URL || !HUBITAT_ACCESS_TOKEN) {
    res.writeHead(500, { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return res.end(JSON.stringify({ error: 'HUBITAT_BASE_URL ou HUBITAT_ACCESS_TOKEN não configurados' }));
  }

  const base = HUBITAT_BASE_URL.replace(/\/$/, '');
  let cmdUrl = `${base}/${device}/${encodeURIComponent(command)}`;
  
  if (value !== null && value !== undefined) {
    cmdUrl += `/${encodeURIComponent(value)}`;
    if (value2 !== null && value2 !== undefined) {
      cmdUrl += `/${encodeURIComponent(value2)}`;
    }
  }
  
  cmdUrl += `?access_token=${HUBITAT_ACCESS_TOKEN}`;

  const protocol = cmdUrl.startsWith('https') ? https : http;

  protocol.get(cmdUrl, (hubitatRes) => {
    let data = '';
    hubitatRes.on('data', chunk => data += chunk);
    hubitatRes.on('end', () => {
      res.writeHead(hubitatRes.statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
    });
  }).on('error', (err) => {
    console.error('Erro ao comunicar com Hubitat:', err);
    res.writeHead(500, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({ error: 'Falha ao comunicar com Hubitat', details: err.message }));
  });
}

function handlePolling(req, res) {
  if (!HUBITAT_FULL_URL && (!HUBITAT_BASE_URL || !HUBITAT_ACCESS_TOKEN)) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return res.end(JSON.stringify({ error: 'Variáveis Hubitat não configuradas' }));
  }

  const pollUrl = HUBITAT_FULL_URL || `${HUBITAT_BASE_URL}/all?access_token=${HUBITAT_ACCESS_TOKEN}`;
  
  const protocol = pollUrl.startsWith('https') ? https : http;

  protocol.get(pollUrl, (hubitatRes) => {
    let data = '';
    hubitatRes.on('data', chunk => data += chunk);
    hubitatRes.on('end', () => {
      res.writeHead(hubitatRes.statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
    });
  }).on('error', (err) => {
    console.error('Erro no polling Hubitat:', err);
    res.writeHead(500, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify({ error: 'Falha no polling', details: err.message }));
  });
}

// ========== STATIC FILE SERVING ==========


const server = http.createServer((req, res) => {
// ========== HUBITAT API ENDPOINTS ==========

  // Comandos Hubitat (Maker API proxy)
  if (req.url.startsWith('/api/hubitat-proxy')) {
    return handleHubitatProxy(req, res);
  }

  // Polling (estados) via proxy
  if (req.url.startsWith('/api/polling')) {
    return handlePolling(req, res);
  }

  // ========== STATIC FILE SERVING ==========
  
  // Parse URL and remove query string
  let pathname = req.url.split('?')[0];
  pathname = decodeURIComponent(pathname);
  
  if (pathname === '/') {
    pathname = '/index.html';
  }

  // Prevent directory traversal
  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  const fullPath = path.join(__dirname, safePath);

  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} -> ${fullPath}`);

  // Check if file is within project directory
  if (!fullPath.startsWith(__dirname)) {
    console.error(`[FORBIDDEN] Path outside project: ${fullPath}`);
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      console.error(`[ERROR] Reading ${fullPath}:`, err.code);
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 - Arquivo não encontrado</h1>');
      } else if (err.code === 'EISDIR') {
        // Try to serve index.html from directory
        const indexPath = path.join(fullPath, 'index.html');
        fs.readFile(indexPath, (err, data) => {
          if (err) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            res.end('Forbidden');
          } else {
            res.writeHead(200, { 'Content-Type': MIME_TYPES['.html'] });
            res.end(data);
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erro interno do servidor');
      }
      return;
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║         Dashboard Eletrize - Servidor Local Iniciado           ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  🌐 Acesse em: http://localhost:${PORT}                        ║
║                                                                ║
║  📁 Diretório: ${__dirname}                                    ║
║                                                                ║
║  ⚡ Servidor rodando em: ${HOST}:${PORT}                       ║
║                                                                ║
║  Para parar: Pressione Ctrl+C                                  ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
  `);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Porta ${PORT} já está em uso!`);
    console.error('Tente: netstat -ano | findstr :8080 (Windows)');
  } else {
    console.error('Erro do servidor:', err);
  }
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('\n\n⛔ Servidor parado.\n');
  process.exit(0);
});
