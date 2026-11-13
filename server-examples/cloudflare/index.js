// boot with `npx wrangler dev` in easel/server-examples/cloudflare/

import { DurableObject } from "cloudflare:workers";
import Switchboard from '../../src/Switchboard.js';
import addChatHandlers from './chatHandlers.js';

export class DurableExample extends DurableObject {

	constructor(ctx, env) {
		super(ctx, env);
		this.switchboard = new Switchboard();
        addChatHandlers(this.switchboard);
		console.log(this.switchboard.messageHandlers);
	}

	async sayHello(name) {
		return `Hello, ${name}!`;
	}

	async fetch(request) {
        if (request.headers.get("Upgrade") === "websocket") {
            return this.handleWebSocket(request);
        }
        return await this.switchboard.fetch(request); // let switchboard handle non-socket requests. good idea?
    }

	async handleWebSocket(request) {
        const pair = new WebSocketPair();
        const [client, server] = Object.values(pair);
        server.accept();
		
		server.addEventListener("message", (event) => {
			this.switchboard.recieveMessage(event.data);
		});

		// Add Socket to Switchboard
        const sessionId = this.switchboard.addSocket(server);

        // Token & Welcome Message
		this.switchboard.sendMessage(sessionId, {
			type: "connected",
			sessionId: sessionId
		});

        this.switchboard.sendMessage(sessionId, {type: "chatMessage", username: "Server", chatContent: "Welcome!" });

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