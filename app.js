const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

console.log(`Prefix ${prefix}`)

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    const commandName = file.split(".")[0]

    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Бот ${client.user.username} запустился`);
});




client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    //message.channel.send('');
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();


    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);


    try {
        command.execute(message, args, command);
    } catch (error) {
        console.error(error);
        message.reply("there was an error trying to execute that command!");
    }
});




client.login(token);