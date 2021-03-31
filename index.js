const Discord = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config(); //YOU NEED A .env FILE WITH A PREFIX AND A TOKEN VARIABLE TO RUN THIS

const bot = new Discord.Client({ws: {intents: ['GUILD_MEMBERS']}});
const prefix = process.env.PREFIX;
const token = process.env.TOKEN;

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(`Successfully added ${file} to commands.`);
    bot.commands.set(command.name, command);
}

bot.on('ready', () => {
    console.log('Successfully started bot!');
    bot.user.setActivity('r!help - github.com/Bombaclath97');
});

bot.on('guildMemberAdd', member => {
    console.log('Detected guildMemberAdd. Executing firstJoin.js.')
    bot.commands.get('firstJoin').execute(member); //TODO implementare 'firstJoin.js'
});

bot.on('message', msg => {
    if (!msg.author.bot && msg.content.startsWith(prefix)) {
        const args = msg.content.slice(prefix.length).split(' ');
        const command = args.shift().toLowerCase();
        switch (command) {
            case 'cta':
                bot.commands.get('cta').execute(msg); //TODO implementare 'cta.js'
                break;
            case 'test':
                bot.commands.get('firstJoin').execute(msg.guild.member(msg.author));
                break;
            default:
                msg.reply(`Comando non riconosciuto. Usa **${prefix}help** per una lista dei comandi`);
                break;
        }
    }
});

bot.login(token);