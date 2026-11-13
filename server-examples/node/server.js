import Switchboard from '../../src/Switchboard.js';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({port: 8080});
const switchboard = new Switchboard();

wss.on("connection", (socket) => {

	// Onboard
	console.log("client connected.");
	const sessionId = switchboard.addSocket(socket);
	switchboard.sendMessage(sessionId, {type: "chatMessage", username: "Node Server", chatContent: "Welcome!" });
});

// Custom Handlers
switchboard.addHandler("chatMessage", (data) => {

	console.log(`<${data.username}>: ${data.chatContent}`);
	
	switchboard.sendMessageToAll({
		type: "chatMessage",
		username: data.username,
		chatContent: data.chatContent
	});
});

switchboard.addHandler("joinMessage", (data) => {

	console.log(`${data.username} joined the chat.`);
	
	switchboard.sendMessageToAll({
		type: "joinMessage",
		username: data.username
	});
});