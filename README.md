## 🔁 LAN Chat WebSocket – Hướng dẫn sử dụng (macOS)

### 1. Cài thư viện WebSocket

```bash
npm install ws
```

### 2. Chạy server WebSocket

```bash
npm start
```

### 3. Lấy IP LAN của MacBook

```bash
ipconfig getifaddr en0
```

### 4. Sửa IP trong `index.html`

```js
new WebSocket("ws://<IP-LAN>:3000");
```
vi du:
<IP-LAN>: + ws://localhost:3000 : Chỉ chạy cho máy đang chạy server
          + ws://192.168.1.5:3000 : Các máy kết nối cùng router wifi đều chạy được         

### 5. Mở `index.html` bằng Live Server (VS Code)

Trên máy tính truy cập:

```
http://127.0.0.1:5500/index.html
```

### 6. Truy cập từ điện thoại (cùng Wi-Fi):

```
http://<IP-LAN>:5500/index.html
```

✅ Tất cả thiết bị cùng Wi-Fi đều có thể chat với nhau qua WebSocket.
