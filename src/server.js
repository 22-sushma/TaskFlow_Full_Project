import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { setupWebSocket } from './config/websocket.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
setupWebSocket(io);

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
