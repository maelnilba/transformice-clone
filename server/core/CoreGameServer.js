const express = require("express");
const { createServer } = require("http");
const GameInstance = require("../instance/GameInstance");
const ServerInstance = require("../instance/ServerInstance");
const NetworkInstance = require("../network/NetworkInstance");

class CoreGameServer {
  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = require("socket.io")(this.httpServer, {
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    });
    this.ServerInstance = new ServerInstance();
    this.NetworkInstance = new NetworkInstance();
    this.GameInstance = null;
  }

  init(port) {
    this.io.on("connection", (socket) => {
      this.ServerInstance.addLogger(socket);
      socket.on("loggin", (data) => {
        this.ServerInstance.getLoggerInstance(socket.id).setUsername(
          data.username
        );
      });
      socket.on("event", (data) => {
        const e = this.NetworkInstance.handle(data, data.id);
        e.action(
          this.ServerInstance.getLoggerInstance(socket.id),
          this.GameInstance
        );
      });

      socket.on("disconnect", (reason) => {
        this.ServerInstance.removeLogger(socket);
        let arr = Object.values(this.GameInstance._rooms).filter((r) =>
          r.hasPlayer(socket.id)
        );

        arr.map((room, i) => {
          this.GameInstance.rooms[room.id].removePlayer(socket.id);
        });
      });
    });

    this.httpServer.listen(port, function () {
      console.log("listening on port ", port);
    });

    this.GameInstance = new GameInstance(this.io);
  }
}

module.exports = CoreGameServer;
