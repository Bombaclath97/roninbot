const Discord = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config(); //YOU NEED A .env FILE WITH A PREFIX AND A TOKEN VARIABLE TO RUN THIS

const bot = new Discord.Client();
const prefix = process.env.PREFIX;
const token = process.env.TOKEN;

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
    console.log(`Successfully added ${command.name} to commands.`);
}

bot.on('ready', async() => {
    console.log(`Successfully started bot with prefix '${prefix}'!`);
    bot.user.setActivity('r!help - github.com/Bombaclath97');
});

bot.on('message', async msg => {
    if (!msg.author.bot && msg.content.startsWith(prefix)) {
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        switch (command) {
            case 'cta':
                bot.commands.get('cta').execute(msg); //TODO implementare 'cta.js'
                break;
            case 'help':
                bot.commands.get('help').execute(bot, msg, args, prefix);
                break;
            default:
                msg.reply(`Comando non riconosciuto. Usa **${prefix}help** per una lista dei comandi`);
                break;
        }
    }
});

bot.login(token);