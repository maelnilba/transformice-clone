import { ChatMessage } from "../game/chat/ChatMessage";
import { JoinRoom } from "../game/rooms/JoinRoom";
import { Room } from "../game/rooms/Room";

export class NetworkInstance {
  constructor() {
    this.MessagesTypes = {};
    this.initTypes();
  }

  initTypes() {
    this.MessagesTypes[150] = JoinRoom;
    this.MessagesTypes[300] = Room;
    this.MessagesTypes[333] = ChatMessage;
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
