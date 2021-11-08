import { Sprite } from "@inlet/react-pixi";
import { Room } from "../game/rooms/Room";

export class GameInstance {
  constructor() {
    this.chat = [];
    this.room = null;
  }

  get isInitiliaze() {
    return this.room ? true : false;
  }

  joinRoom(room) {
    this.room = room;
  }

  loadRoom(room) {
    this.room = room;
  }

  render() {
    if (this.room) {
      return (
        <>
          {Object.values(this.room.map?.players ?? {}).map((p, i) => {
            return (
              <Sprite
                key={p.id}
                image="./assets/Souris.png"
                scale={{ x: 0.1, y: 0.1 }}
                anchor={0.5}
                x={p.pos.x}
                y={p.pos.y}
              />
            );
          })}
        </>
      );
    }

    return <></>;
  }
}
