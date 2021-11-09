import { GameController } from "../instance/GameController";
import { GameInstance } from "../instance/GameInstance";
import { NetworkInstance } from "../network/NetworkInstance";

export class CoreGameClient {
  constructor(socket, rendering) {
    this.socket = socket;
    this.NetworkInstance = new NetworkInstance();
    this.init();
    this.GameInstance = new GameInstance(socket);
    this.render = rendering;
  }

  init() {
    this.socket.on("event", (data) => {
      const e = this.NetworkInstance.handle(data, data.id);
      e.action(this.GameInstance);
      this.render();
    });
  }
}
