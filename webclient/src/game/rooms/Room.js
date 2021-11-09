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
    this.map = new Map(input.roomId, input.map.entities);
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
          return new Mice(i, mice).render();
        })}
        {this.map.mices_object.map((obj, i) => {
          return (
            <Sprite
              key={i}
              image={`./assets/decors/${obj.label}.png`}
              scale={0.25}
              anchor={0.5}
              x={obj.pos.x}
              y={obj.pos.y}
            />
          );
        })}
      </>
    );
  }
}

class Mice {
  constructor(
    i,
    {
      pos,
      direction,
      isRunningLeft,
      isRunningRight,
      isJumped,
      isAlive,
      hasWin,
      hasCheese,
      isShaman,
    }
  ) {
    this.index = i;
    this.x = pos.x;
    this.y = pos.y;
    this.direction = direction;
    this.isRunningLeft = isRunningLeft;
    this.isRunningRight = isRunningRight;
    this.isJumped = isJumped;
    this.isAlive = isAlive;
    this.hasWin = hasWin;
    this.hasCheese = hasCheese;
    this.isShaman = isShaman;
  }

  render() {
    let scale = { x: 0.3, y: 0.3 };

    let image = "mice1";
    if (this.isRunningLeft || this.isRunningRight) {
      image = "micerun1";
      if (this.isRunningRight) {
        scale = { x: 0.3, y: 0.3 };
      } else if (this.isRunningLeft) {
        scale = { x: -0.3, y: 0.3 };
      }
    } else {
      scale =
        this.direction === "right" ? { x: 0.3, y: 0.3 } : { x: -0.3, y: 0.3 };
    }

    if (this.isJumped) {
      image = "micerun1";
    }

    if (this.hasWin) {
      return <></>;
    }
    return (
      <Sprite
        key={this.index}
        image={`./assets/mice/${image}.png`}
        scale={scale}
        anchor={0.5}
        x={this.x}
        y={this.y}
      />
    );
  }
}
