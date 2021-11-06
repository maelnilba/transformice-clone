const LoggerInstance = require("./LoggerInstance");

class ServerInstance {
  constructor() {
    this.LoggerInstances = {};
  }

  getLoggerInstance(id) {
    return this.LoggerInstances[id];
  }

  addLogger(socket) {
    if (this.LoggerInstances[socket.id]) {
      throw `there's already someone with id ${socket.id}`;
    }

    let logger = new LoggerInstance(socket);
    this.LoggerInstances[socket.id] = logger;
  }

  removeLogger(socket) {
    if (!this.LoggerInstances[socket.id]) {
      throw "nobody with this id";
    }
    console.log("remove", this.LoggerInstances);
    delete this.LoggerInstances[socket.id];
  }
}

module.exports = ServerInstance;
