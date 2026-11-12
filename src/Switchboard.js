// For use by servers, not clients.

export default class Switchboard {
	constructor() {
		this.sockets = new Map();
		this.messageHandlers = new Map();
		
		this.recieveMessage = this.recieveMessage.bind(this);
	}
	
	sendMessage(sessionId, data) {
		const socket = this.sockets.get(sessionId);
		const message = JSON.stringify(data);
		socket.send(message);
	}

	sendMessageToAll(data) {
		const message = JSON.stringify(data);

		for (const [sessionId, socket] of this.sockets) {
			try { socket.send(message); }
			catch { this.sockets.delete(sessionId); }
		}
	}
	
	addHandler(type, handler) {
		this.messageHandlers.set(type, handler)
	}

	addSocket(socket) {
		const sessionId = crypto.randomUUID();
		this.sockets.set(sessionId, socket);
		return sessionId;
	}

	recieveMessage(data) {
		const message = JSON.parse(data.toString());
		const type = message.type;
		const handler = this.messageHandlers.get(type);
		handler(message);
	}

	async fetch(request) {
		
		if (request.headers.get("Upgrade") === "websocket") { return await this.handleWebSocket(); }
		
		const body = await request.json();
		const response = {}; // !!! Get response from fetchHandlers
		
		return new Response( JSON.stringify(response), { headers: { // !!! Modifiable Headers
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type"
		}});
	}

	async handleWebSocket() {
		
		const pair = new WebSocketPair(); // !!! Cloudflare worker specific
		const [client, socketServer] = Object.values(pair);
		socketServer.accept();
		
		const sessionId = crypto.randomUUID();
		this.sockets[sessionId] = socketServer;
		
		socketServer.addEventListener("close", () => this.sockets.delete(socketServer) );
		socketServer.addEventListener("error", () => this.sockets.delete(socketServer) );
		socketServer.addEventListener("message", (event) => this.recieveMessage(event) );
		
		return new Response(null, { status: 101, webSocket: client });
	}
}

async function handleCloudflareWebSocket(switchboard) {
	const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);

    server.accept();

    const sessionId = crypto.randomUUID();
    switchboard.addSocket(sessionId, server);

    return new Response(null, {
        status: 101,
        webSocket: client
    });
}