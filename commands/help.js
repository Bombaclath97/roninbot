const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Tipico comando di help.',
    execute(bot, msg, args, prefix) {
        const commands = bot.commands;
        if (!args.length || args[0] === 'help') {
            const commandList = [];
            commandList.push(`${prefix}` + commands.filter(command => command.name !== 'firstJoin').map(command => command.name).join(`\n${prefix}`));
            const embed = new Discord.MessageEmbed()
                .setColor('#950203')
                .setTitle('Lista dei comandi')
                .addField('Comandi', commandList)
                .addField('Informazioni su un comando', `Per avere più informazioni su come si utilizza un comando, scrivi **${prefix}help <comando>**`);
            msg.channel.send(embed);
        } else if (args.length === 1) {
            const argument = args[0];
            if (commands.has(argument)) {
                const embed = new Discord.MessageEmbed()
                    .setColor('#950203')
                    .addField(`Come usare il comando **${prefix}${argument}**`, `${commands.get(argument).help}`);
                msg.channel.send(embed);
            } else {
                msg.channel.send(`Comando non riconosciuto. Usa ${prefix}help per una lista dei comandi`);
            }
        } else {
            msg.channel.send(`Hai chiesto aiuto per più di un comando, non ti posso aiutare. Per avere più informazioni su come si utilizza un comando, scrivi **${prefix}help <comando>**`)
        }
    }
}