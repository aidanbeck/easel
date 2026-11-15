import { WebSocketServer } from 'ws';
import ChatServer from '../chat-server.js';

const wss = new WebSocketServer({port: 8080});
const chatServer = new ChatServer("Node Server");
wss.on("connection", (socket) => chatServer.switchboard.addSocket(socket) ); // add socket to chatServer