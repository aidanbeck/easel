import Messenger from '../src/Messenger.js';

const messenger = new Messenger("https://bug-free-computing-machine-5g5xw74g6773v6jp-8080.app.github.dev/", "wss://bug-free-computing-machine-5g5xw74g6773v6jp-8080.app.github.dev/");

messenger.addHandler("chatMessage", (data) => {
	console.log(`<${data.username}>: ${data.chatContent}`);
});

globalThis.SEND_MESSAGE = (username, content) => {
	messenger.sendMessage({
		type: "chatMessage",
		username: username,
		chatContent: content
	});
}