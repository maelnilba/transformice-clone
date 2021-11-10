import { Map } from "../map/Map";
import { Sprite, Container, Text } from "@inlet/react-pixi";
import { TextStyle } from "@pixi/text";

export class Room {
  constructor(id) {
    this.id = id;
    this.players = {};
    this.map = null;
  }

  get ProtocolId() {
    return 300;
  }

  deserialize(input) {
    this.id = input.roomId;
    this.players = input.players;
    this.map = new Map(input.roomId, input.map);
  }

  action(gi) {
    gi.loadRoom(this);
  }

  awake() {
    const styleText = new TextStyle({
      align: "center",
      fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
      fontSize: 12,
      fontWeight: 400,
      fill: "#ffffff",
      stroke: "#000000",
      strokeThickness: 2.5,
      letterSpacing: 2,
      dropShadow: false,
      wordWrap: true,
      wordWrapWidth: 150,
    });

    const getTimeEnd = (t) => {
      let time = new Date(new Date(t) - new Date());
      return `${time.getMinutes()}:${
        time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()
      }`;
    };
    if (!this.map) {
      return <></>;
    }

    return (
      <>
        {this.map.grounds.map((ground, i) => {
          return (
            <Sprite
              key={i + ground.pos.x}
              image={`./assets/grounds/${ground.label}.png`}
              scale={1}
              anchor={0.5}
              height={ground.height}
              width={ground.width}
              rotation={ground.rotation}
              x={ground.pos.x}
              y={ground.pos.y}
            />
          );
        })}
        {this.map.mices_object.map((obj, i) => {
          return (
            <Sprite
              key={i + obj.pos.y}
              image={`./assets/decors/${obj.label}.png`}
              scale={0.25}
              anchor={0.5}
              x={obj.pos.x}
              y={obj.pos.y}
            />
          );
        })}
        {this.map.mices.map((mice, i) => {
          return new Mice(i, mice).render();
        })}
        <Container position={[0, 0]}>
          <Sprite
            image="./assets/ui/RoomBar.png"
            width={476}
            height={64}
            anchor={0.5}
            x={400}
            y={32}
          />
          <Text
            text={`Salon: ${this.id}`}
            anchor={0.5}
            x={275}
            y={30}
            style={styleText}
          />
          <Text
            text={`Temps restant: ${getTimeEnd(this.map.timeEnd)}`}
            anchor={0.5}
            x={425}
            y={30}
            style={styleText}
          />
        </Container>
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
      tick,
      username,
    }
  ) {
    this.username = username;
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
    this.tick = tick;
  }

  render() {
    let scale = { x: 0.3, y: 0.3 };
    let frame = 1;
    let anchor = { x: 0.5, y: 0.5 };

    let image = "mice";
    if (this.isRunningLeft || this.isRunningRight) {
      image = "micerun";
      anchor = { x: 0.5, y: 0.6 };
      frame = (Math.floor(this.tick / 5) % 4) + 1;
      if (this.isRunningRight) {
        scale = { x: 0.3, y: 0.3 };
      } else if (this.isRunningLeft) {
        scale = { x: -0.3, y: 0.3 };
      }
    } else {
      frame = (Math.floor(this.tick / 5) % 6) + 1;
      scale =
        this.direction === "right" ? { x: 0.3, y: 0.3 } : { x: -0.3, y: 0.3 };
    }

    if (this.isJumped) {
      frame = 1;
      image = "micerun";
    }

    if (this.hasWin || !this.isAlive) {
      return <></>;
    }
    return (
      <>
        <Text
          text={this.username}
          x={this.x + 2.5}
          y={this.y - 25}
          anchor={{ x: 0.5, y: 0.5 }}
          style={
            new TextStyle({
              align: "center",
              fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
              fontSize: 12,
              fontWeight: 400,
              fill: "#ffffff",
              stroke: "#000000",
              strokeThickness: 2.5,
              letterSpacing: 2,
              dropShadow: true,
              dropShadowColor: "#333333",
              dropShadowBlur: 3,
              dropShadowAngle: Math.PI / 6,
              dropShadowDistance: 6,
              wordWrap: true,
              wordWrapWidth: 200,
            })
          }
        />
        <Sprite
          key={this.index + this.x + this.y}
          image={`./assets/mice/${image}${
            this.hasCheese ? "cheese" : ""
          }${frame}.png`}
          scale={scale}
          anchor={anchor}
          x={this.x}
          y={this.y}
        />
      </>
    );
  }
}
