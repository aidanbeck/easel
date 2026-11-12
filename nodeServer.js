import Switchboard from './src/Switchboard.js';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({port: 8080});
const switchboard = new Switchboard();

wss.on("connection", (socket) => {

	// Onboard
	const sessionId = switchboard.addSocket(socket);
	socket.send(JSON.stringify({type: "chatMessage", username: "Server", chatContent: "Welcome!" }));
	console.log("client connected.");

	// Listeners
	socket.on("close", () => { console.log("client closed.")});
	socket.on("message", (data) => {
		switchboard.recieveMessage(data.toString()); // should recieveMessage handle this? probably.
	});

});

// Handlers
switchboard.addHandler("chatMessage", (data) => {

	console.log(`<${data.username}>: ${data.chatContent}`);
	
	switchboard.sendMessageToAll({
		type: "chatMessage",
		username: data.username,
		chatContent: data.chatContent
	});
});