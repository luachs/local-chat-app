const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;

// Tạo HTTP server đơn giản
const server = http.createServer((req, res) => {
  res.writeHead(404);
  res.end("Not Found");
});

// Tạo WebSocket server gắn vào HTTP server
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("🔌 Client kết nối");

  socket.on("message", (msg) => {
    console.log("📨 Nhận:", msg.toString());
    // Gửi lại cho tất cả client khác
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });
});

// Khởi động server
server.listen(PORT, () => {
  console.log(`🚀 Server WebSocket đang chạy tại cổng ${PORT}`);
});
