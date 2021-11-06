class MessageReceiver {
  constructor() {
    this.MessagesTypes = {};
    this.initTypes;
  }

  initTypes() {
    this.MessagesTypes[80] = 100;
  }

  get _MessageTypes() {
    return this.MessagesTypes;
  }

  parse(input, messageId) {
    let messageType = this.MessagesTypes[messageId];
    if (!messageType) {
      throw "Unknow packet";
    }
    let message = new messageType();
    return message.deserialize(input);
  }
}
