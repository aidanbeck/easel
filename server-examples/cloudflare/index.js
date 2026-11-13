// boot with `npx wrangler dev` in easel/server-examples/cloudflare/

import { DurableObject } from "cloudflare:workers";

export class DurableExample extends DurableObject {

	constructor(ctx, env) {
		super(ctx, env);
	}

	async sayHello(name) {
		return `Hello, ${name}!`;
	}
}

export default {

	async fetch(request, env, ctx) {

		const stub = env.DURABLE_EXAMPLE.getByName("foo");
		const greeting = await stub.sayHello("world");
		return new Response(greeting);
	},
};