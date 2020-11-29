/*const channelId = '726358118103253023'
const check = '✅'
let registered = false

const registerEvent = client => {
    if(registered) {
        return
    }
    registered = true
    console.log('REGISTERING EVENTS')

    client.on('meesageReactionAdd', (reaction, user) => {
        if(user.bot) {
            return
        }

        console.log('HANDLING REACTION')
        const { message } = reaction
        if(message.channel.id == channelId) {
            message.delete()
        }
    })
}

module.exports = {
    commands: ['ticket', 'support'],
    minArgs: 1,
    expectedArgs: '<message>',
    callback: (userMessage, arguments, text, client) => {
        const { guild, member } = userMessage

        registerEvent(client)

        const channel = guild.channels.cache.get(channelId)
        channel.send(`Nouveau ticket crée par <@${member.id}> pour sujet : "${text}". Cliquez sur ${check} icon quand le problème sera résolu.`)
        .then(ticketMessage => {
            ticketMessage.react(check)
            userMessage.reply('Votre ticket à bien été envoyé au staff !')
        })
    },
}*/
