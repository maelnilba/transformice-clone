class LoggerInstance {
  constructor(socket) {
    this.socket = socket;
    this.id = socket.id;
    this.username = "";
  }

  get _id() {
    return this.id;
  }

  setUsername(username) {
    this.username = username;
  }
}

module.exports = LoggerInstance;
