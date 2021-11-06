class LoggerInstance {
  constructor(socket) {
    this.socket = socket;
    this.id = socket.id;
  }

  get _id() {
    return this.id;
  }
}

module.exports = LoggerInstance;
