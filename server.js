const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Phục vụ file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket xử lý kết nối
wss.on('connection', (ws) => {
  console.log('🔌 Client đã kết nối WebSocket');

  ws.on('message', (message) => {
    const text = message.toString('utf8');
    console.log('📩 Nhận tin nhắn:', text);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(text);
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
