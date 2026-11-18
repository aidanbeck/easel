import Messenger from '../src/Messenger.js';

let messenger = new Messenger("https://aidanbeck.com/api/chat", "wss://aidanbeck.com/api/chat"); // Cloudflare Worker or Node Server
let username = prompt("What is your name?", "Unknown");

// HTML Structure
const messages = document.createElement("div");

const input = document.createElement("textarea");
input.style.width = "25vw";
input.style.height = "5vw";

const container = document.createElement("div");
container.style.height = "100vh";
container.style.overflow = "scroll";
container.append(messages, input);

theatre.replaceWith(container); // Inject into demo.htnml

// Render Messages from Server
function printMessage(text) {
	const message = document.createElement("div");
	message.textContent = text;
	messages.append(message);
}

// Send Messages to Server
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
messenger.connectionHandler = () => messenger.sendMessage({ type: "joinMessage", sessionId: messenger.sessionId, username: username });
messenger.disconnectionHandler = () => printMessage("Disconnected from server. Refresh to reconnect.");
messenger.addHandler("chatMessage", (data) => printMessage(`<${data.username}>: ${data.chatContent}`) );
messenger.addHandler("joinMessage", (data) => printMessage(`${data.username} joined the chat.`) );

globalThis.MESSENGER = messenger;