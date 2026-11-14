import { WebSocketServer } from 'ws';
import Switchboard from '../../src/Switchboard.js';
import addChatHandlers from '../chat-server.js';

const wss = new WebSocketServer({port: 8080});
const switchboard = new Switchboard();

wss.on("connection", (socket) => {

	// Onboard
	console.log("client connected.");
	const sessionId = switchboard.addSocket(socket);
	switchboard.sendMessage(sessionId, {type: "chatMessage", username: "Node Server", chatContent: "Welcome!" });
});

addChatHandlers(switchboard);