const Discord = module.require("discord.js");
const fs = require("fs");

module.exports = {
  name: "ping",
  execute(message) {
      const ping = new Date(message.createdTimestamp);
      const timeTaken = Date.now() - message.createdTimestamp;
      message.channel.send(`Пинг: ${timeTaken}ms`);
  }
};
