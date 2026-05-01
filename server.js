const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Logika WebSocket: Menangani koneksi
io.on('connection', (socket) => {
    console.log('User terhubung!');

    // Mendengarkan pesan dari satu client, lalu kirim ke semua orang
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