module.exports = {
    commands: 'warn',
    minArgs: 2,
    expectedArgs: "<membre> <reason>",
    requiredRoles: ['Membre du staff'],
    callback: async (message, arguments) => {
        const target = message.mentions.users.first()
        if(!target) {
            message.reply('Merci de mentionner un utilisateur.')
            return
        }

        arguments.shift()

        const guildId = message.guild.id
        const userId = message.member.id
        const reason = arguments.join(' ')

        const warning = {
            author: message.member.user.tag,
            timestamp: new Date().getTime(),
            reason
        }

        const channelId = '688360191707709557'
        const Discord = require('discord.js')
        const logo = 'https://e7.pngegg.com/pngimages/994/729/png-clipart-exclamation-mark-exclamation-mark.png'
        const logoBot = 'https://cdn.discordapp.com/avatars/725289123795173408/ef217af29ac291b50659698cd5dc6923.png?size=128'
        const embedList = new Discord.MessageEmbed()
            .setTitle('Un utilisateur a été warn')
            .setThumbnail(logo)
            .setColor('#ED0000')
            .setFooter('Arkia Bot', logoBot)
            .addFields({
                name: `Auteur du warn`,
                value: `Auteur du warn : ${warning.author}`
            },
            {
                name: 'Raison',
                value: `Pour la raison suivante : ${reason}`
            },
            {
                name: 'Warned',
                value: `Utilistateur warn : ${message.mentions.users.first().tag}`
            })
        
        const channel = message.member.guild.channels.cache.get(channelId)
        channel.send(embedList) 
    },
}