const path = require('path')
const fs = require('fs')
const Discord = require('discord.js');
const client = new Discord.Client();
const delay = require('delay');
const config = require('./config.json');
const command = require('./command');
const welcome = require('./welcome')
const music = require('./music')
const mute = require('./mute')

var d = new Date();
var hours = "[" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "] ";

client.on('ready', () => {

    // PING //

    command(client, 'ping', (message) => {
        message.channel.send('Calcul du ping...').then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

            message.channel.send(
`**__Latence :__**

**Bot** : ${ping}ms
**API** : ${client.ws.ping}ms`
            )
        })
    })
    // HELP //
    command(client, 'help', (message) => {
        const membre = message.mentions.members.first() || message.member;
        message.channel.send(`Hey ${membre.user.username}, voici la liste des commande que je peut exexcuter :\n**pub** *j'ecrit une joli pub d'Arkia'* ***[Tres long a répondre]***\n**site** *commande pour connaitre le site d'Arkia'* :yum: \n**logo** *Je t'envoie le logo d'Arkia'*\n**logo_gif** *je t'envoie le logo animé d'Arkia'*\n**sorry** *c'est dans le titre* :wink:\n**play** *pour jouer de la musique*\n**add** *pour ajouter une musique a la liste de lecture*\n**pause** *pour mettre en pause la musique en cours*\n**resume** *pour relancer la musique*\n**np** *pour voir quel est la musique en cours*\n**next** *pour passer à la musique suivante*\n**previous** *pour passer à la musique précédente*\n**queue** *pour voir la liste de lecture*\n**stop** *pour stoper la lecture en cours*\n\n**Les commandes de modération :**\n**ban** *Pour ban*\n**mute** *Pour mute temporairement*\n**kick** *Pour kick*`)
    
    })

    // LOGO //

    command(client, 'logo', (message) => {
        message.channel.send(`> **Le logo d'Arkia:**`, {files: ["./image/logo.png"]})

    })

    // LOGO_GIF //

    command(client, 'logo_gif', (message) => {
        message.channel.send(`> **Le logo animé d'Arkia :**`, {files: ["./image/logo.gif"]})


    })

    // PUB //

    command(client, 'pub', (message) => {
        message.channel.send("> **Cette commande à été temporairement désactivé.**");


    })

    // SALUT //

    command(client, 'salut', (message) => {
        const membre = message.mentions.members.first() || message.member;
        message.channel.send(`> Hey ${membre.user.username} , comment ça va sur le serveur de WorldMC ! :slight_smile:`);
        message.channel.send(`> Tu joue à ${membre.user.presence.game ? `${membre.user.presence.game.name}` : "aucun jeu."}`)
        message.channel.send(`> Et moi je suis la pour t'aider sur ce magnifique serveur ${membre.user.username}.`)
        message.channel.send(`> Donc si qqn embette ${membre.user.username}  c'est moi qui vais m'en ocuper :slight_smile: .`)
        message.channel.send({files: ["./image/salut.gif"]})

      
    })

    // SITE //

    command(client, 'site', (message) => {
        const membre = message.mentions.members.first() || message.member;
        message.channel.send(`> **Hey ${membre.user.username}** , ***voici le site d'Arkia, tu peut voter pour le serveur et nous aider en achetant des grades et etc :grin: :*** https://arkia-mc.fr/`);

    })

    // SORRY //

    command(client, 'sorry', (message) => {
        message.channel.send(`> **Pardon** :pleading_face: `, {files: ["./image/sorry.gif"]})


    })

    // WELCOME MSG //

    welcome(client)

    // MUTE //

    mute(client)

    // MUSIC //

    music(client)

    // BAN //

    command(client, 'ban', message => {
        const { member, mentions } = message
        const tag = `${member.id}`

        if(member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')) {
            const target = mentions.users.first()
            if(target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban()
                message.channel.send(`${target.tag} à bien été banni`)
            }else {
                message.channel.send(`Merci de préciser un utilisateur <@${tag}>`)
            }
        }else {
            message.channel.send(`<@${tag}> Vous n'avez pas la permission pour utiliser cette commande.`)
        }
    })

    // KICK //

    command(client, 'kick', message => {
        const { member, mentions } = message
        const tag = `${member.id}`


        if(member.hasPermission('ADMINISTRATOR') || member.hasPermission('KICK_MEMBERS')) {
            const target = mentions.users.first()
            if(target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`${target.tag} à bien été kick`)

       
            }else {
                message.channel.send(`Merci de préciser un utilisateur <@${tag}>`)
            }
        }else {
            message.channel.send(`<@${tag}> Vous n'avez pas la permission pour utiliser cette commande.`)
        }
    })

    // STATUS //

    client.user.setPresence({
        activity: {
            name: `Arkia V1 | -help`,
            type: "WATCHING",
            url: "https://arkia-mc.fr/"
        }
    })
});

client.login(config.token);