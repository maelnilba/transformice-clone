import { GameInstance } from "../instance/GameInstance";
import { NetworkInstance } from "../network/NetworkInstance";

export class CoreGameClient {
  constructor(socket, rendering) {
    this.socket = socket;
    this.NetworkInstance = new NetworkInstance();
    this.init();
    this.GameInstance = new GameInstance();
    this.GameController = new GameController(socket, this.GameInstance);
    this.render = rendering;
  }

  init() {
    this.socket.on("event", (data) => {
      const e = this.NetworkInstance.handle(data, data.id);
      e.action(this.GameInstance);
      this.render();
    });
  }

  emit(id, input) {
    this.GameController.emit();
  }
}

class GameController {
  constructor(socket, gi) {
    this.gi = gi;
    this.socket = socket;
  }

  logIn(username) {
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
    if (this.gi.isInitiliaze) {
      this.socket.emit("event", {
        id: 10,
        roomId: this.gi.room.id,
        action,
      });
    }
  }
}
