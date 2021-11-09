const JoinNewRoom = require("../auth/JoinNewRoom");

class CommandMessage {
  constructor(RAW) {
    this.RAW = RAW;
    this.commandeType = {};
    this.initTypes();
  }

  initTypes() {
    this.commandeType["room"] = JoinNewRoom;
    this.commandeType["help"] = "not implemented";
  }

  handle() {
    let commandeSplit = this.RAW.substring(1).split(" ");
    let type = commandeSplit[0];
    let parameters = commandeSplit[1];
    let CommandType = this.commandeType[type];
    let command = new CommandType();
    command.deserialize(parameters);
    return command;
  }
}

module.exports = CommandMessage;
