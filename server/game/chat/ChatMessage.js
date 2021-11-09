const CommandMessage = require("./CommandMessage");

class ChatMessage {
  constructor() {
    this.roomId = "";
    this.senderId = "";
    this.message = "";
  }

  get ProtocolId() {
    return 10;
  }

  deserialize(input) {
    this.roomId = input.roomId;
    this.senderId = input.senderId;
    this.message = input.message;
  }

  action({ socket, username }, instance) {
    if (this.message.startsWith("/", 0)) {
      let commande = new CommandMessage(this.message).handle();
      commande.action({ socket, username, roomId: this.roomId }, instance);
    } else if (instance._io) {
      instance._io.in(this.roomId).emit("event", {
        id: 333,
        senderId: this.senderId,
        senderUsername: username,
        message: this.message,
      });
    }
  }
}

module.exports = ChatMessage;
