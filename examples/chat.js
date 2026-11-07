import Messenger from '../src/Messenger.js';

const messenger = new Messenger("", "");
messenger.addHandler("chatMessage", (data) => console.log(`<${data.username}>: ${data.chatContent}`) );

function test() {
	messenger.sendMessage({
		type: "chatMessage",
		username: "aidanbeck",
		chatContent: "Hello World!"
	});
}

globalThis.TEST = test;