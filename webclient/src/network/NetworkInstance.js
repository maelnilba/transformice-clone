import { JoinRoom } from "../game/rooms/JoinRoom";
import { Room } from "../game/rooms/Room";

export class NetworkInstance {
  constructor() {
    this.MessagesTypes = {};
    this.initTypes();
  }

  initTypes() {
    this.MessagesTypes[80] = JoinRoom;
    this.MessagesTypes[150] = Room;
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
