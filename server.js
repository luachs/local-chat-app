const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (ws) => {
  console.log("📶 Một client vừa kết nối!");

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log(`💬 ${data.name}: ${data.message}`);

      // Gửi lại cho tất cả client (gồm cả người gửi để hiển thị luôn)
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data)); // Gửi lại dưới dạng JSON
        }
      });
    } catch (err) {
      console.error("❌ Lỗi parse JSON:", err);
    }
  });
});
