import { Map } from "../map/Map";
import { Sprite, Container, Text } from "@inlet/react-pixi";

export class Room {
  constructor(id) {
    this.id = id;
    this.players = {};
    this.map = null;
  }

  deserialize(input) {
    this.id = input.roomId;
    this.players = input.players;
    this.map = new Map(input.roomId, input.map.mices, input.map.grounds);
  }

  action(gi) {
    gi.loadRoom(this);
  }

  awake() {
    if (!this.map) {
      return <></>;
    }

    return (
      <>
        <Container position={[0, 0]}>
          <Text text={this.id} anchor={0.5} x={100} y={20} />
        </Container>
        {this.map.grounds.map((ground, i) => {
          return (
            <Sprite
              key={i}
              image={`./assets/grounds/${ground.label}.png`}
              scale={1}
              anchor={0.5}
              height={ground.height}
              width={ground.width}
              x={ground.pos.x}
              y={ground.pos.y}
            />
          );
        })}
        {this.map.mices.map((mice, i) => {
          return (
            <Sprite
              key={i}
              image="./assets/Souris.png"
              scale={{ x: 0.1, y: 0.1 }}
              anchor={0.5}
              x={mice.pos.x}
              y={mice.pos.y}
            />
          );
        })}
      </>
    );
  }
}
