module.exports = client => {
    const channelId = '714859940090478612'
    const targetRules = '695261360736698399'

    client.on('guildMemberAdd', (member) => {
        console.log(`<@${member.id}> à rejoin Arkia.`)
        const message = `Bienvenue <@${member.id}> sur Arkia ! Va regarder les règles dans ${member.guild.channels.cache.get(targetRules).toString()} https://tenor.com/R8kY.gif`

        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)
    })
}
