const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// ⚠️ Phục vụ file tĩnh từ thư mục hiện tại (nơi chứa index.html)
app.use(express.static(path.join(__dirname)));

// WebSocket: Nhận và gửi lại message cho tất cả client đang kết nối
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        const text = message.toString('utf8');
        console.log('📩 Nội dung tin nhắn:', text);
        client.send(text);

      }
    });
  });
});
wss.on('connection', (ws) => {
  console.log('🔌 Client đã kết nối WebSocket');

  ws.on('message', (message) => {
    console.log('📩 Nhận tin nhắn:', message);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

// 🚀 Chạy server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});


