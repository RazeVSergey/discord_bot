const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token, host, user, password, b_array} = require('../config.json');
var SSHClient = require('ssh2').Client;

const fs = require('fs');


const jobs = {}


module.exports = {
    name: 'update',
    description: 'update command',
    execute: (message, args) => {

        if (!message.content.startsWith(prefix)) return;
        if (message.content.indexOf(`${prefix}`) !== 0) return;
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        if (args[1] !== "" && args[0] !== 'stop') {
            var timer_delay = args[1];
        }
        if (!args[1] && args[0] !== 'stop' && args[1] === undefined) {
            var timer_delay = "120";
        }
        const branchs = b_array;
        let result = args[0]
        const see_branch = branchs.join(', ');

        if (args[0] == 'stop') {
            if (jobs[args[1]]) {
                message.reply(` отменил обновление ${args[1]}`);
                console.log(`${message.author.username} отменил обновление ${args[1]}`);
                clearTimeout(jobs[args[1]]);
                jobs[args[1]] = undefined
            }else{
                message.channel.send('Нечего отменять!').then(function(message) {message.delete({timeout: 3000})}).catch(console.error);
                setTimeout(() => {
                     message.channel.bulkDelete(1)
                }, 4000);
            };
        } else {

            if (branchs.indexOf(result) >= 0) {
                console.log(`Время ${timer_delay}`);
                jobs[args[0]] = setTimeout(() => {
                    var conn = new SSHClient();
                    conn.on('ready', () => {
                        const cmd = ``
                        conn.exec(cmd, (err, stream) => {
                            if (err) throw err;
                            stream.on('close', (code, signal) => {
                                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                                conn.end();
                                message.reply(` обновил ${args[0]}`).then(msg => {
                                msg.react('👍').catch(console.error);
                                })
                                message.delete()
                                    .then(msg => console.log(`Сообщение ${msg.content} удалено ${msg.author.username}`))
                                    .catch(console.error);
                            }).on('data', (data) => {
                                console.log('STDOUT: ' + data);
                            }).stderr.on('data', (data) => {
                                console.log('STDERR: ' + data);
                            });
                          });
                      }).connect({
                        host: host,
                        port: 22,
                        username: user,
                        password: password
                      })
                }, `${timer_delay}000`)
            } else {
                message.author.send(`Commands: /update branch, где branch - ${see_branch}`);
                message.channel.send(`${message.author}, Вы указали не верный аргумент для обновления!\nЯ отправил Вам личное сообщение с примерами команд.\nХорошего дня!`)
                    .then(function (message) {
                        message.delete({timeout: 5000});
                    })
                    .catch(console.error)
                message.channel.bulkDelete(1)
            }
        }

    }

}
