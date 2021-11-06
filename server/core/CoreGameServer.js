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
    this.GameInstance = new GameInstance();
  }

  init(port) {
    this.io.on("connection", (socket) => {
      this.ServerInstance.addLogger(socket);
      socket.on("event", (data) => {
        const e = this.NetworkInstance.handle(data, data.id);
        e.action(socket, this.GameInstance);
      });

      socket.on("disconnect", (reason) => {
        this.ServerInstance.removeLogger(socket);
      });
    });

    this.httpServer.listen(port, function () {
      console.log("listening on port ", port);
    });
  }
}

module.exports = CoreGameServer;
