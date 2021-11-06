import { Sprite } from "@inlet/react-pixi";
import { Room } from "../game/rooms/Room";

export class GameInstance {
  constructor() {
    this.chat = [];
    this.room = null;
  }

  joinRoom(room) {
    this.room = room;
  }

  render() {
    if (this.room) {
      return (
        <Sprite
          image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/coin.png"
          scale={{ x: 0.5, y: 0.5 }}
          anchor={0.5}
          x={150}
          y={150}
        />
      );
    }

    return <></>;
  }
}
