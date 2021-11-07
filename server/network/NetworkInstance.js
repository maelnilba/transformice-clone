const JoinRoom = require("../game/auth/JoinRoom");
const MoveMice = require("../game/map/MoveMice");

class NetworkInstance {
  constructor() {
    this.MessagesTypes = {};
    this.initTypes();
  }

  initTypes() {
    this.MessagesTypes[80] = JoinRoom;
    this.MessagesTypes[10] = MoveMice;
  }

  get _MessageTypes() {
    return this.MessagesTypes;
  }

  handle(input, messageId) {
    let messageType = this.MessagesTypes[messageId];
    if (!messageType) {
      throw "Unknow packet";
    }
    let message = new messageType();
    message.deserialize(input);
    return message;
  }
}

module.exports = NetworkInstance;
