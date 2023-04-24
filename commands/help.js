const Discord = require('discord.js');
const { prefix, token, b_array } = require('../config.json');

const client = new Discord.Client()
const fs = require('fs');
const test = {}
module.exports = {
  name: "help",
  description: "Replies with help menu.",
  permissions: ['SendMessages'],
  execute(message,prefix) {
    const branchs = b_array;
    const result = branchs.join(', ');
    return message.author.send(`Commands: /help, /update branch,  branch - ${result}`);
  },
};