export class ChatMessage {
  constructor() {
    this.senderId = "";
    this.senderUsername = "";
    this.message = "";
  }

  get ProtocolId() {
    return 333;
  }

  deserialize(input) {
    this.senderId = input.senderId;
    this.senderUsername = input.senderUsername;
    this.message = input.message;
  }

  action(gi) {
    gi.addMessage(this);
  }
}
