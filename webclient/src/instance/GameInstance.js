import { LimitedArray } from "../utils/LimitedArray";
import { GameController } from "./GameController";

export class GameInstance {
  constructor(socket) {
    this.GameController = new GameController(socket, this);
    this.chat = new LimitedArray(100);
    this.room = null;
    this.isLogged = false;
    this.message = "";
    this.chatFocus = false;
  }

  get isLog() {
    return this.isLogged;
  }

  get isInitiliaze() {
    return this.room ? true : false;
  }

  log() {
    this.isLogged = true;
  }

  joinRoom(room) {
    this.room = room;
  }

  loadRoom(room) {
    this.room = room;
  }

  addMessage(chatmessage) {
    this.chat.push({
      sender: chatmessage.senderUsername,
      message: chatmessage.message,
    });
  }

  renderUI() {
    return (
      <div
        style={{
          width: "800px",
          height: "200px",
          display: "flex",
          flex: 1,
          flexDirection: "row",
          backgroundImage: "url(" + "https://i.imgur.com/9i5pYIp.jpeg" + ")",
        }}
      >
        <div
          style={{
            flex: 4,
            flexDirection: "column",
            width: "800px",
            display: "flex",
          }}
        >
          <div
            style={{
              flex: 4,
              display: "flex",
              flexDirection: "column-reverse",
              overflowY: "auto",
              maxWidth: "500px",
              height: "200px",
              padding: "5px",
            }}
          >
            {this.renderChat()}
          </div>
          <div style={{ flex: 1 }}>
            <input
              style={{ width: "90%", margin: "10px" }}
              value={this.message}
              onChange={(e) => (this.message = e.target.value)}
              onFocus={() => (this.chatFocus = true)}
              onBlur={() => (this.chatFocus = false)}
              onKeyDown={({ key }) => {
                if (key === "Enter") {
                  this.GameController.sendMessage(this.message);
                  this.message = "";
                }
              }}
            />
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            height: "200px",
            overflowY: "auto",
            color: "white",
          }}
        >
          {this.renderList()}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            height: "200px",
            overflowY: "auto",
            color: "white",
          }}
        >
          {this.renderRecord()}
        </div>
      </div>
    );
  }

  renderMap() {
    if (this.room && this.isLogged) {
      return <>{this.room.awake()}</>;
    }
    return <></>;
  }

  renderList() {
    if (this.room && this.room.players && this.isLogged) {
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

  renderRecord() {
    if (this.room && this.room.players && this.isLogged) {
      return (
        <ul>
          {this.room.map.records.map((player, i) => {
            return (
              <li key={i + player.username}>
                {player.username} : {new Date(player.hasWinAt).getSeconds()}.
                {new Date(player.hasWinAt).getMilliseconds()}
              </li>
            );
          })}
        </ul>
      );
    }

    return <></>;
  }

  renderChat() {
    if (this.isLogged) {
      if (!this.chat.length) {
        return <></>;
      }
      return (
        <>
          {this.chat.a.map(({ sender, message }) => {
            return (
              <p style={{ color: "white", margin: "0px" }}>
                {sender} : {message}
              </p>
            );
          })}
        </>
      );
    }
  }
}
