import Switchboard from '../src/Switchboard.js';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({port: 8080});
const switchboard = new Switchboard();

wss.on("connection", (socket) => {

	// Onboard
	const sessionId = switchboard.addSocket(socket);
	console.log("client connected.");
	switchboard.sendMessage(sessionId, {type: "chatMessage", username: "Server", chatContent: "Welcome!" });
	
	// Listeners
	socket.on("close", () => console.log("client closed."));
	socket.on("message", switchboard.recieveMessage);
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