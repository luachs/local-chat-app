const http = require("http");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;

// Tạo HTTP server để trả về index.html
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const filePath = path.join(__dirname, "index.html");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Lỗi server!");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    res.writeHead(404);
    res.end("Không tìm thấy");
  }
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
        client.send(msg.toString()); // Gửi dạng chuỗi JSON
      }
    });
  });
});

// Khởi động server
server.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
