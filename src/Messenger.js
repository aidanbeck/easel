export default class Messenger {
	constructor(serverURL, socketURL) {
		
		this.serverURL = serverURL;
		this.socket = new WebSocket(socketURL);
		this.sessionId = "";
		this.connectionHandler = () => {};

		this.messageHandlers = {};
		
		this.recieveMessage = this.recieveMessage.bind(this); // makes 'this' refers to Client, not socket
		this.socket.addEventListener("message", this.recieveMessage);
		this.socket.addEventListener("error", (e) => {console.log(e)} );
		this.socket.addEventListener("close", console.log("socket closed.") );

		this.addHandler("sessionId", (data) => { // Default sessionId Handler
			this.sessionId = data.sessionId; // Save sessionId
			this.connectionHandler(); // Trigger Connection Handler
		});
	}

	async fetch(method, body) {
		const response = await fetch(this.serverURL, {
			method: method,
			body: JSON.stringify(body)
		});
		
		return await response.json();
	}

	sendMessage(data) {
		data.sessionId = this.sessionId;
		const message = JSON.stringify(data);
		this.socket.send(message);
	}

	recieveMessage(event) {
		const data = JSON.parse(event.data);
		const type = data.type;
		this.messageHandlers[type](data);
	}

	addHandler(type, logic) {
		this.messageHandlers[type] = logic;
	}
}