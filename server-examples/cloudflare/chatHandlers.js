let switchboard;

export default function addChatHandlers(inputboard) {

    switchboard = inputboard;

    switchboard.addHandler("chatMessage", chatMessage);
    switchboard.addHandler("joinMessage", joinMessage);
}

function chatMessage(data) {
    console.log(`<${data.username}>: ${data.chatContent}`);
	
	switchboard.sendMessageToAll({
		type: "chatMessage",
		username: data.username,
		chatContent: data.chatContent
	});
}

function joinMessage(data) {
    console.log(`${data.username} joined the chat.`);
    
    switchboard.sendMessageToAll({
        type: "joinMessage",
        username: data.username
    });
}
