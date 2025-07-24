const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Trả về index.html khi người dùng truy cập domain gốc
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// WebSocket logic
wss.on('connection', (ws) => {
  console.log('🔌 Client đã kết nối WebSocket');

  ws.on('message', (data) => {
    let message;
    try {
      message = JSON.parse(data.toString());
    } catch (err) {
      console.error("❌ Không thể parse JSON:", err);
      return;
    }

    console.log('📩 Nhận tin nhắn:', message);

    // Gửi đến tất cả client
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});
