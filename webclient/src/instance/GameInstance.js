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

  renderMap() {
    if (this.room) {
      return <>{this.room.awake()}</>;
    }
    return <></>;
  }

  renderList() {
    if (this.room && this.room.players) {
      return (
        <ul>
          {this.room.players.map((player, i) => {
            return <li key={i + player.username}>{player.username}</li>;
          })}
        </ul>
      );
    }

    return <></>;
  }
}
