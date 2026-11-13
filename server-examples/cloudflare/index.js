// boot with `npx wrangler dev` in easel/server-examples/cloudflare/

import { DurableObject } from "cloudflare:workers";
import Switchboard from '../../src/Switchboard.js';
import addChatHandlers from './chatHandlers.js';

export class DurableExample extends DurableObject {

	constructor(ctx, env) {
		super(ctx, env);
		this.switchboard = new Switchboard();
        addChatHandlers(this.switchboard);
	}

	async fetch(request) {
        if (request.headers.get("Upgrade") === "websocket") {
            return this.handleWebSocket(request);
        }
        return new Reponse(); // !!!
    }

	async handleWebSocket(request) {
        const pair = new WebSocketPair();
        const [client, server] = Object.values(pair);
        server.accept();

		// Add Socket to Switchboard
        const sessionId = this.switchboard.addSocket(server);

        this.switchboard.sendMessage(sessionId, {type: "chatMessage", username: "Cloudflare Worker", chatContent: "Welcome!" });

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