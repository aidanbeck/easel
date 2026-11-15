import Switchboard from '../src/Switchboard.js';

export default class ChatServer {

    constructor(serverName) {
        
        this.switchboard = new Switchboard();

        this.serverName = serverName;
        this.usernameIds = new Map();

        this.switchboard.connectionHandler = this.welcomeMessage;
        this.switchboard.addHandler("chatMessage", this.chatMessage);
        this.switchboard.addHandler("joinMessage", this.joinMessage);
    }

    welcomeMessage = (sessionId) => {
        this.switchboard.sendMessage(sessionId, {type: "chatMessage", username: "Server", chatContent: "Welcome!" });
    }

    chatMessage = (data) => {
        
        const validatedUsername = this.usernameIds.get(data.sessionId);
        if (data.username != validatedUsername) { return; }

        console.log(`<${data.username}>: ${data.chatContent}`);
        
        this.switchboard.sendMessageToAll({
            type: "chatMessage",
            username: data.username,
            chatContent: data.chatContent
        });
    }

    joinMessage = (data) => {
        console.log(`${data.username} joined the chat.`);
        this.usernameIds.set(data.sessionId, data.username);
        
        this.switchboard.sendMessageToAll({
            type: "joinMessage",
            username: data.username
        });
    }
}