const Discord = require('discord.js');
const client = new Discord.Client();

const {prefix, token, master, stable, host, user, password} = require('../config.json');
const fs = require('fs');
var SSHClient = require('ssh2').Client;

var i, s
const react_time = 45
const jobs = {}

function connection(branch) {
     const len = branch.length;
     //console.log(len)
     //for(var i=0; i<len; ++i) {
     var conn = new SSHClient();
     conn.on('ready', () => {
        for (i=0; i<len; ++i) {
            const cmd = `cd /compose/${branch[i]}/ && docker-compose pull && docker-compose up -d --force-recreate && echo "Обновление завершено по "${branch[i]}`
        //    console.log('i = ' + i)
            conn.exec(cmd, (err, stream) => {
              if (err) throw err;
              stream.on('close', (code, signal) => {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                //conn.end();
              }).on('data', (data) => {
                console.log('STDOUT: ' + data);
              }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
             });
            });
        }
      }).connect({
        host: host,
        port: 22,
        username: user,
        password: password
      })
}

module.exports = {
    name: 'update',
    description: 'update stand',
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


        if (args[0] == 'stop') {
            if (jobs[args[1]]) {
                message.reply(` отменил обновление **${args[1]}**`);
                clearTimeout(jobs[args[1]]);
                jobs[args[1]] = undefined
            }else{
                message.channel.send('Нечего отменять!').then(function(message) {message.delete({timeout: 3000})}).catch(console.error);
                setTimeout(() => {
                     message.channel.bulkDelete(1)
                }, 4000);
            };
        } else {
            jobs[args[0]] = setTimeout(() => {
                if ( `${args[0]}` == 'master' ) {
                   connection(master);
                     }
                 if( `${args[0]}` == 'stable' ) {
                    connection(stable);
                 }
                 if ((`${args[0]}` == 'master') || (`${args[0]}` == 'stable')) {
                       setTimeout(() => {
                                    message.reply(` обновил **${args[0]}**`).then(msg => {
                                        msg.react('👍').catch(console.error);
                                    })
                                    message.delete()
                                        .then(msg => console.log(`Сообщение ${msg.content} удалено ${msg.author.username}`))
                                        .catch(console.error);
                                   }, `${react_time}000` );
                 }
            }, `${timer_delay}000`)
        }
    }

}
