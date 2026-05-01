# Aplikasi Chat Real-Time Sederhana Menggunakan Node.js dan Socket.io

### Langkah 1: Persiapan Project
Pertama, pastikan node.js sudah terinstall pada perangkat, lalu membuat folder project lalu menjalankan perintah berikut di terminal:
```
npm init -y
npm install express socket.io
```
Perintah tersebut digunakan untuk membuat project Node.js dan menginstall library yang dibutuhkan.

### Langkah 2: Membuat Server WebSocket
Membuat file server.js dengan kode berikut:
```js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('User terhubung!');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User memutus koneksi');
    });
});

server.listen(3000, () => {
    console.log('Server jalan di http://localhost:3000');
});
```

Kode di atas berfungsi untuk:
•	menjalankan server di port 3000 
•	menerima koneksi user 
•	menerima pesan dari client 
•	mengirim pesan ke seluruh client yang sedang terhubung

### Langkah 3: Membuat Tampilan Client
Selanjutnya membuat file index.html sebagai tampilan chat sederhana.
```html
<!DOCTYPE html>
<html>
<head>
    <title>Eksperimen WebSocket UTS</title>
</head>
<body>

<ul id="messages"></ul>
<input id="input" autocomplete="off">
<button onclick="sendMessage()">Kirim</button>

<script src="/socket.io/socket.io.js"></script>

<script>
var socket = io();

function sendMessage() {
    var input = document.getElementById('input');
    socket.emit('chat message', input.value);
    input.value = '';
}

socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    document.getElementById('messages').appendChild(item);
});
</script>

</body>
</html>
```
Saat tombol kirim ditekan, pesan akan dikirim ke server dan langsung diteruskan ke semua client yang sedang aktif.

### Langkah 4: Menjalankan Eksperimen
Server dijalankan menggunakan perintah:
```
node server.js
```

Kemudian browser dibuka ke alamat:
```
http://localhost:3000
```

Setelah itu buka dua tab browser secara berdampingan untuk melakukan pengujian.

##

### Hasil Pengujian

Coba ketik pesan pada tab pertama, lalu pesan tersebut langsung muncul pada tab kedua tanpa perlu refresh halaman.
Begitu juga ketika pesan dikirim dari tab kedua, tab pertama langsung menerima pesan tersebut.
Hal ini menunjukkan bahwa koneksi WebSocket bekerja secara real-time dan bersifat full-duplex, yaitu client dan server dapat saling bertukar data dua arah secara langsung.

<img width="4000" height="2094" alt="Image" src="https://github.com/user-attachments/assets/4f6a754c-4177-40f5-b800-c902bac77aa9" />
