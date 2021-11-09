export class GameController {
  constructor(socket, gi) {
    this.gi = gi;
    this.socket = socket;
  }

  logIn(username) {
    this.gi.log();
    this.socket.emit("loggin", {
      username,
    });
    this.joinRoom();
  }

  joinRoom(roomId = "salon1") {
    this.socket.emit("event", {
      id: 80,
      roomId,
    });
  }

  moveMice(action) {
    if (this.gi.isInitiliaze && !this.gi.chatFocus) {
      this.socket.emit("event", {
        id: 10,
        roomId: this.gi.room.id,
        action,
      });
    }
  }

  sendMessage(message) {
    if (this.gi.isInitiliaze && message) {
      this.socket.emit("event", {
        id: 333,
        roomId: this.gi.room.id,
        senderId: this.socket.id,
        message,
      });
    }
  }
}
