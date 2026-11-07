import { json } from 'node:stream/consumers';
import Switchboard from './src/Switchboard.js';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({port: 8080});
const switchboard = new Switchboard();
switchboard.addHandler("chatMessage", (data) => console.log(`<${data.username}>: ${data.chatContent}`) );

wss.on("connection", (socket) => {
	console.log("client connected.");

	socket.send(JSON.stringify({
		type: "chatMessage",
		username: "aidanbeck",
		chatContent: "Hello World!"
	}));
	

	socket.on("message", (data) => {
		console.log(data.toString());
		switchboard.recieveMessage(data.toString());
	});

	socket.on("close", () => { console.log("client closed.")});
});