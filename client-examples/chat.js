import Messenger from '../src/Messenger.js';

let messenger = new Messenger("https://aidanbeck.com/api/chat", "wss://aidanbeck.com/api/chat"); // Cloudflare Worker or Node Server

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
let username = prompt("What is your username?", "Unknown");
messenger.connectionHandler = () => {
	messenger.sendMessage({ type: "joinMessage", sessionId: messenger.sessionId, username: username });
}

// Send Message
input.onkeyup = (event) => {
	if (event.key != "Enter") { return; }

	messenger.sendMessage({
		type: "chatMessage",
		sessionId: messenger.sessionId,
		username: username,
		chatContent: input.value
	});

	input.value = "";
}

// Custom Handlers
messenger.addHandler("chatMessage", (data) => printMessage(`<${data.username}>: ${data.chatContent}`) );
messenger.addHandler("joinMessage", (data) => printMessage(`${data.username} joined the chat.`) );