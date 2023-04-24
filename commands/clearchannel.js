//Clears an entire channel by cloning and deleting it.
const Discord = require("discord.js");
const client = new Discord.Client();

const config = require('../config.json');

module.exports = {
    name: "clear",
    description: "Clear messages from the channel.",
    args: true,
    usage: "<number greater than 0, less than 100>",
    execute(message, args, interaction) {
      if(!message.member.hasPermission("ADMINISTRATOR")){
          return message.reply("у пользователя недостаточно прав на выполнение данной операции!");
         }else {
        const amount = parseInt(args[0]) + 1;
        if (isNaN(amount)) {
            return message.reply("that doesn't seem to be a valid number.");
        } else if (amount <= 1 || amount > 1000) {
            return message.reply("you need to input a number between 1 and 999.");
        }

        message.channel.bulkDelete(amount, true).catch((err) => {
            console.error(err);
            message.channel.send(
                "произошла ошибка при попытке удалить сообщения в этом канале!"
            );
        });
        }
    },
};