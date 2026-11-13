import Messenger from '../src/Messenger.js';

const messenger = new Messenger("https://bug-free-computing-machine-5g5xw74g6773v6jp-8787.app.github.dev/", "wss://bug-free-computing-machine-5g5xw74g6773v6jp-8787.app.github.dev/");
// const messenger = new Messenger("https://bug-free-computing-machine-5g5xw74g6773v6jp-8080.app.github.dev/", "wss://bug-free-computing-machine-5g5xw74g6773v6jp-8080.app.github.dev/");

// HTML Structure
const theatre = document.getElementById("theatre");
const container = document.createElement("div");
const messages = document.createElement("div");
const input = document.createElement("input");

container.append(messages, input);
theatre.replaceWith(container);

function printMessage(text) {
	const message = document.createElement("div");
	message.textContent = text;
	messages.append(message);
}

// Open Socket
const username = prompt("What is your username?", "Unknown");
let sessionId;

// Send Message
input.onkeyup = (event) => {
	if (event.key != "Enter") { return; }

	messenger.sendMessage({
		type: "chatMessage",
		username: username,
		chatContent: input.value
	});

	input.value = "";
}

// Custom Handlers
messenger.addHandler("connected", (data) => {
	sessionId = data.sessionId;
	messenger.sendMessage({ type: "joinMessage", username: username });
});

messenger.addHandler("chatMessage", (data) => {
	printMessage(`<${data.username}>: ${data.chatContent}`);
});

messenger.addHandler("joinMessage", (data) => {
	printMessage(`${data.username} joined the chat.`);
});