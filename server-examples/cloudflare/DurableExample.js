import { DurableObject } from "cloudflare:workers";
import Switchboard from '../../src/Switchboard.js';

/**
 * @typedef {Object} Env - reference bindings declared in wrangler.jsonc
 * @property {DurableObjectNamespace} DURABLE_EXAMPLE - The Durable Object namespace binding
**/

export class DurableExample extends DurableObject {
	/**
	 * The constructor is invoked once upon creation of the Durable Object, i.e. the first call to
	 * 	`DurableObjectStub::get` for a given identifier (no-op constructors can be omitted)
	 *
	 * @param {DurableObjectState} ctx - The interface for interacting with Durable Object state
	 * @param {Env} env - The interface to reference bindings declared in wrangler.jsonc
	 */
	constructor(ctx, env) {
		super(ctx, env);
        this.switchboard = new Switchboard();
        addCustomHandlers(this.switchboard);
        console.log("initalized");
    }

    addCustomHandlers(switchboard) {
        // this could be a separate class with unique functions and a builder that adds them all to a switchboard
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
    }

    async fetch(request) {
        console.log('request recieved');
        if (request.headers.get("Upgrade") === "websocket") { // upgrade websocket
            return await this.handleWebSocket(request);
        }
        return this.switchboard.fetch(request); // let switchboard handle non-socket requests. good idea?
    }

    async handleWebSocket(request) {
        console.log("newsocket");
        const pair = new WebSocketPair();
        const [client, server] = Object.values(pair);

        server.accept();

        const sessionId = this.switchboard.addSocket(sessionId, server);

        // welcome message - won't this send before the response enabling the socket?
        // how else to send things on initial connection?
        // should it send in the response? should Messenger handle that with built in logic?
        switchboard.sendMessage(sessionId, {type: "chatMessage", username: "Server", chatContent: "Welcome!" });

        return new Response(null, {
            status: 101,
            webSocket: client,
            sessionId: sessionId // should this be sent as an initial socket instead?
        });
    }
}

