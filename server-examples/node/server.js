import { WebSocketServer } from 'ws';
import Switchboard from '../../src/Switchboard.js';
import addChatHandlers from '../chat-server.js';

const wss = new WebSocketServer({port: 8080});
const switchboard = new Switchboard();

// Custom Logic
addChatHandlers(switchboard);

wss.on("connection", (socket) => switchboard.addSocket(socket) );