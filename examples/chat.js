import Messenger from '../src/Messenger.js';

const messenger = new Messenger("https://bug-free-computing-machine-5g5xw74g6773v6jp-8080.app.github.dev/", "wss://bug-free-computing-machine-5g5xw74g6773v6jp-8080.app.github.dev/");

const theatre = document.getElementById("theatre");
const container = document.createElement("div");
const messages = document.createElement("div");
const input = document.createElement("input");

container.append(messages, input);
theatre.replaceWith(container);

const username = prompt("What is your username?", "Unknown");

input.onkeyup = (event) => {
	if (event.key != "Enter") { return; }

	messenger.sendMessage({
		type: "chatMessage",
		username: username,
		chatContent: input.value
	});

	input.value = "";
}

messenger.addHandler("chatMessage", (data) => {
	const message = document.createElement("div");
	message.innerText = `<${data.username}>: ${data.chatContent}`;
	messages.append(message);
});