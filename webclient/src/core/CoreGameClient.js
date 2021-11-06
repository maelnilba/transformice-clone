import { GameInstance } from "../instance/GameInstance";
import { NetworkInstance } from "../network/NetworkInstance";

export class CoreGameClient {
  constructor(socket, rendering) {
    this.socket = socket;
    this.NetworkInstance = new NetworkInstance();
    this.init();
    this.GameInstance = new GameInstance();
    this.GameController = new GameController(socket);
    this.render = rendering;
  }

  init() {
    this.socket.on("event", (data) => {
      console.log(data);
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
  constructor(socket) {
    this.socket = socket;
  }

  joinRoom() {
    this.socket.emit("event", {
      id: 80,
      roomId: "salon1",
    });
  }
}
