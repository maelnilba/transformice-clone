export class ChatMessage {
  constructor() {
    this.senderId = "";
    this.senderUsername = "";
    this.message = "";
    this.time = "";
  }

  get ProtocolId() {
    return 333;
  }

  deserialize(input) {
    this.senderId = input.senderId;
    this.senderUsername = input.senderUsername;
    this.message = input.message;
    let d = new Date();
    this.time = `[${d.getHours() < 10 ? 0 : ""}${d.getHours()}:${
      d.getMinutes() < 10 ? 0 : ""
    }${d.getMinutes()}]`;
  }

  action(gi) {
    gi.addMessage(this);
  }
}
