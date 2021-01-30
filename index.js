// VERSION //

const version = 0.7

// IMPORTS //

const { Client, Collection, MessageEmbed, MessageAttachment  } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const delay = require('delay');
const config = require('./config.json');
const command = require('./command');
var d = new Date();
const client = new Client({ disableMentions: "everyone" });
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const colors = require('colors');
const { checkServerIdentity } = require("tls");

// VARIABLES //

const { TOKEN, PREFIX } = require("./util/EvobotUtil");
client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
var hours = "[" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "] ";
const Tenor = require('tenorjs').client({
  "Key": "Q9R7FT8S8L9O",
  "Filter": "off",
  "Locale": "en_US",
  "MediaFilter": "minimal",
  "DateFormat": "D/MM/YYYY - H:mm:ss A"
})






console.log("[INFO] Connecting...")
client.on("ready", () => {
  console.log(`








        /$$$$$$            /$$       /$$                 /$$$$$$$ 
       /$$__  $$          | $$      |__/                | $$__  $$
      | $$  \ $$  /$$$$$$ | $$   /$$ /$$  /$$$$$$        | $$  \ $$
      | $$$$$$$$ /$$__  $$| $$  /$$/| $$ |____  $$      | $$$$$$$ 
      | $$__  $$| $$  \__/| $$$$$$/ | $$  /$$$$$$$       | $$__  $$
      | $$  | $$| $$      | $$_  $$ | $$ /$$__  $$      | $$  \ $$    Arkia BOT v${version}
      | $$  | $$| $$      | $$ \  $$| $$|  $$$$$$$       | $$$$$$$/   By Savalet
      |__/  |__/|__/      |__/  \__/|__/ \_______/        |_______/    Last Update 30/01/2021

      






               `.cyan);
  client.user.setActivity(`Arkia Bot v${version} || -help`, { type: "LISTENING" });

  // AVATAR //

  command(client, 'avatar', message => {

    const { guild, channel } = message
    const user = message.mentions.users.first() || message.member.user
    const member = guild.members.cache.get(user.id)
    const avatar = user.displayAvatarURL()

    channel.send(`**Avatar de ${user.username} :**`)
    channel.send(avatar)
    
  })
  


  // UINFO //

command(client, 'uinfo', message => {

  const { guild, channel } = message
  const user = message.mentions.users.first() || message.member.user
  const member = guild.members.cache.get(user.id)

  const embed = new MessageEmbed().setAuthor(
    `Informations de ${user.username}`,
    user.displayAvatarURL()
  ).addFields(
    {
    name: 'Nom et tag :',
    value: user.tag

  }, 
  {
    name : 'Créer le :',
    value: user.createdAt
  },
  {
    name: 'Bot :',
    value: user.bot

  },
  {
    name: 'ID :',
    value: user.id
  })

  channel.send(embed)
  
})


  // GIFS //

      command(client, 'gif', message => {
        Tenor.Search.Random("random", "1").then(Results => {
            Results.forEach(Post => {
                message.channel.send(`${Post.url}`)
            })
        })
    })

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
            message.channel.send(`${target.tag} à bien été expulser !`)

            
        }else {
            message.channel.send(`Merci de préciser un utilisateur <@${tag}>`)
        }
    }else {
        message.channel.send(`<@${tag}> Vous n'avez pas la permission pour utiliser cette commande.`)


    }
})

  // SRVINFOS //

  command(client, 'sinfo', message => {
    const { guild } = message

    const { name, memberCount, owner, createdAt } = guild
    const icon = guild.iconURL()

    const embed = new MessageEmbed()
        .setTitle(`Informations du serveur ${name}`)
        .setThumbnail(icon)
        .addFields(
            {
            name: 'Membres',
            value: memberCount,
            }
        )
        .addFields(
          {
            name: 'Créer le',
            value: createdAt
          }
      )
        .addFields(
          {
            name: 'Propriétaire',
            value: owner
          }
      )

      .addField("Emojis", `${message.guild.emojis.cache.size} emojis`)
      .addField("Roles", `${message.guild.roles.cache.size} roles`)
   

    message.channel.send(embed)    
})

  // HELP //

  command(client, 'help', (message) => {
    const embed = new MessageEmbed()
    .setTitle('Aide Arkia Bot')
    .setColor(0x2abef8)
    .setDescription("**pub** *Envoie une pub d'Arkia'* ***[Tres long a répondre]***\n**site** *Envoie le site d'Arkia* :yum: \n**avatar** *Recupere l'avatar de l'utilisateur mentionner*\n**uinfo** *Récupere des infos de l'utilisateur mentionner*\n**sinfo** *informations du serveur*\n**logo** *Je t'envoie le logo d'Arkia'*\n**logo_gif** *je t'envoie le logo animé d'Arkia'*\n**gif** *Envoie un GIF random*\n**sorry** *c'est dans le titre* :wink:\n**help-music** *pour afficher les aides du système de musique*\n**invite** *vous envoie le lien d'invitation du bot.*\n**uptime** *connaitre depuis combien de temps le bot est lancé*\n\n**Les commandes de modération :**\n**ban** *Pour ban*\n**mute** *Pour mute temporairement*\n**kick** *Pour kick*\n\n\nArkia Bot v"+version+" by savalet ");
  message.channel.send(embed);
})

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

    // UPTIME //

    command(client, 'uptime', (message) => {
      let seconds = Math.floor(message.client.uptime / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);
  
      seconds %= 60;
      minutes %= 60;
      hours %= 24;
  
      return message
        .reply(`\`${days} day(s),${hours} hours, ${minutes} minutes, ${seconds} seconds\``)
        .catch(console.error);
  })

    // INVITE //

    command(client, 'invite', (message) => {
      message.channel.send("Le lien d'invitation vous à été envoyer")
      return message.member.send(`Voici mon lien d'invitation pour que vous puissiez ajouter **Arkia Bot** sur votre serveur :slight_smile: : https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=2147483647&scope=bot`)

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
      message.channel.send("> **Cette commande à étée temporairement désactivée.**");


  })

  // SALUT //

  command(client, 'salut', (message) => {
      const membre = message.mentions.members.first() || message.member;
      message.channel.send(`> Hey ${membre.user.username} , comment ça va sur le serveur d'Arkia ! :slight_smile:`);
      message.channel.send(`> Tu joue à ${membre.user.presence.game ? `${membre.user.presence.game.name}` : "aucun jeu."}`)
      message.channel.send(`> Et moi je suis la pour t'aider sur ce magnifique serveur ${membre.user.username}.`)
      message.channel.send(`> Donc si qqn embette ${membre.user.username}  c'est moi qui vais m'en ocuper :slight_smile: .`)
      message.channel.send({files: ["./image/salut.gif"]})
  })

  // OCTOGONE //

  command(client, 'octogone', (message) => {
      message.channel.send(`> **Aller go octogone sans règles**`, {files: ["./image/octogone.gif"]})
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
});


client.on("warn", (info) => console.log(info));
client.on("error", console.error);

/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands-music")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands-music", `${file}`));
  client.commands.set(command.name, command);
}


client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `S'il vous plaît, attendez ${timeLeft.toFixed(1)} seconde(s) avant de réutiliser la commande \`${command.name}\`.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("Une erreur est survenue.").catch(console.error);
  }

  
});
