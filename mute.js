const redis = require('./redis')
const command = require('./command')

module.exports = (client) => {
    const redisKeyPrefix = 'muted-'

    redis.expire(message => {
        if(message.startsWith(redisKeyPrefix)) {
            const split = message.split('-')

            const memberId = split[1]
            const guildId = split[2]

            const guild = client.guilds.cache.get(guildId)
            const member = guild.members.cache.get(memberId)

            const role = getRole(guild)

            member.roles.remove(role)
            console.log('UNMUTED : ', memberId)
        }
    })
    const getRole = (guild) => {
        return guild.roles.cache.find((role) => role.name === 'Muted')
    }

    const giveRole = member => {
        const role = getRole(member.guild)

        if(role) {
            member.roles.add(role)
            console.log('Muted : ' + member.id)
        }
    }

    const onJoin = async (member) => {
        const { id, guild } = member

        const redisClient = await redis()
        try {
            redisClient.get(`${redisKeyPrefix}${id}-${guild.id}`, (err, result) => {
                if(err) {
                    console.error('Redis GET error : ', err)
                }else if(result) {
                    const removeRole = guild.roles.cache.find((role) => role.name === '')
                    giveRole(member)
                    member.roles.remove(removeRole)
                }else {
                    console.log('L' + "'" + 'utilisateur n' + "'" + 'a pas été mute.')
                }
            })
        } finally {
            redisClient.quit()
        }
    }

    command(client, 'simjoin', (message) => {
        onJoin(message.member)
    }) 

    client.on('guildMemberAdd', (member) => {
        onJoin(member)
    })

    command(client, 'mute', async (message) => {

        const syntax = 'm?mute <@membre> <durée> <m, h, d, ou perm>'
        const { member, channel, content, mentions, guild } = message

        if(!member.hasPermission('ADMINISTRATOR')) {
            channel.send('Vous n' + "'" + 'avez pas la permission d' + "'" + 'exécuter cette commande.')
            return
        }

        const split = content.trim().split(' ')

        if(split.length !== 4) {
            channel.send('Merci d' + "'" + 'utiliser la bonne syntaxe : ' + syntax)
            return
        }

        const duration = split[2]
        const durationType = split[3]

        if(isNaN(duration)) {
            channel.send('Merci de préciser un nombre pour la durée. ' + syntax)
            return
        }

        const durations = {
            m: 60,
            h: 60 * 60,
            d: 60 * 60 * 24,
            perm: -1
        }

        if(!durations[durationType]) {
            channel.send('Merci de donner un type de duration valide. ' + syntax)
            return
        }

        const seconds = duration * durations[durationType]

        const target = mentions.users.first()

        if(!target) {
            channel.send('Merci de mentionner un utilisateur. ' + syntax)
            return
        }

        const { id } = target

        const targetMember = guild.members.cache.get(id)
        giveRole(targetMember)

        const redisClient = await redis()

        try {
            const redisKey = `${redisKeyPrefix}${id}-${guild.id}`

            if(seconds > 0) {
                redisClient.set(redisKey, 'true', 'EX', seconds)
            }else {
                redisClient.set(redisKey, 'true')
            }
        }finally {
            redisClient.quit()
        }
    })
}