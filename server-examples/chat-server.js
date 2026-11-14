let switchboard;
const usernameIds = new Map();

export default function addChatHandlers(inputboard) {

    switchboard = inputboard;

    switchboard.connectionHandler = welcomeMessage;
    switchboard.addHandler("chatMessage", chatMessage);
    switchboard.addHandler("joinMessage", joinMessage);
}

function welcomeMessage(sessionId) {
    switchboard.sendMessage(sessionId, {type: "chatMessage", username: "Server", chatContent: "Welcome!" });
}

function chatMessage(data) {
    
    const validatedUsername = usernameIds.get(data.sessionId);
	if (data.username != validatedUsername) { return; }

    console.log(`<${data.username}>: ${data.chatContent}`);
	
	switchboard.sendMessageToAll({
		type: "chatMessage",
		username: data.username,
		chatContent: data.chatContent
	});
}

function joinMessage(data) {
    console.log(`${data.username} joined the chat.`);
    usernameIds.set(data.sessionId, data.username);
    
    switchboard.sendMessageToAll({
        type: "joinMessage",
        username: data.username
    });
}