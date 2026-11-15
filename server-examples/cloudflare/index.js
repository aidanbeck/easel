import { DurableObject } from "cloudflare:workers";
import ChatServer from "../chat-server.js";

export class DurableExample extends DurableObject {

	constructor(ctx, env) {
		super(ctx, env);
		this.chatServer = new ChatServer("Cloudflare Worker");
	}

	async fetch(request) {
        if (request.headers.get("Upgrade") === "websocket") {
            return this.handleWebSocket(request);
        }
        return new Reponse();
    }

	async handleWebSocket(request) {
        const pair = new WebSocketPair();
        const [client, server] = Object.values(pair);
        server.accept();
        
        this.chatServer.switchboard.addSocket(server); // add socket to chatServer

        return new Response(null, {
            status: 101,
            webSocket: client
        });
    }
}

export default {
	async fetch(request, env, ctx) {
		const stub = env.DURABLE_EXAMPLE.getByName("foo");
		return stub.fetch(request);
	},
};