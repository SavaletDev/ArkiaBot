// CONST //

const version = "1.3"
const lastUpdate = "12/02/2021"
const serverName = "Pokétium"
const logChannel = "773508622545190932"
const banChannel = "773508622545190932"
const welcomeChannel = "773508624273244180"
let badw = ["pute","connard","Connard","Pute","C O N","c o n","C o n","Con"," con ","shit","merde","debile","débile","btrd","batard","fdp","tg","geule","mgl","Putain","ptn","Ptn","putain","Couile","couille"]

// IMPORTS //

const { Client, Collection, MessageEmbed, MessageAttachment } = require("discord.js");
const Discord = require('discord.js');
const Canvas = require('canvas')
const { readdirSync } = require("fs");
const { join } = require("path");
const path = require('path')
const delay = require('delay');
const config = require('./config.json');
const command = require('./command');
var d = new Date();
const client = new Client({ disableMentions: "everyone" });
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); 
const colors = require('colors');
const AntiSpam = require('discord-anti-spam');
const util = require('util');
const sleep = util.promisify(setTimeout);
const antiSpam = new AntiSpam({
  warnThreshold: 3,
  kickThreshold: 7,
  banThreshold: 7,
  maxInterval: 4000,
  warnMessage: '{@user}, Stop spam !',
  kickMessage: '**{user_tag}** à été kick pour spam.',
  banMessage: '**{user_tag}** à été ban pour spam.',
  maxDuplicatesWarning: 7,
  maxDuplicatesKick: 10,
  maxDuplicatesBan: 12,
  exemptPermissions: ['ADMINISTRATOR'],
  ignoreBots: true,
  verbose: true,
  ignoredUsers: [],
});
const Enmap = require("enmap")                 
const canvacord = require("canvacord")        
client.points = new Enmap({ name: "points" }); 
const leveling = require("./ranking");    
const utilserver = require('minecraft-server-util');
const random = require('random')



// VARIABLES //

const { TOKEN, PREFIX } = require("./util/utilmusic");
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
isbadw = false
loop = 1



console.log("[INFO] Connecting...")
  client.on("ready", () => {
    client.user.setActivity(`${client.user.username} v${version} | ${PREFIX}help`, { type: "WATCHING"})
  console.log(`






   ${serverName} BOT v${version}
   By Savalet
   Last Update ${lastUpdate}
   [INFO] Bot ready !
               `.cyan);

  // LOG //

  client.on('channelCreate', message => {
    const { guild } = message
    const channel = guild.channels.cache.get(logChannel)
    const embed = new MessageEmbed().setAuthor(
      `Salon Créer`,
      guild.iconURL()
    ).setColor('0x4DFF00');
    channel.send({ embed });
  });

  client.on('channelDelete', message => {
    const { guild } = message
    const channel = guild.channels.cache.get(logChannel)
    const embed = new MessageEmbed().setAuthor(
      `Salon Suprimé`,
      guild.iconURL()
    ).setColor('0xFF5500');
    channel.send({ embed });
  });

  client.on('roleCreate', message => {
    const { guild } = message
    const channel = guild.channels.cache.get(logChannel)
    const embed = new MessageEmbed().setAuthor(
      `Role Créer`,
      guild.iconURL()
    ).setColor('0x4DFF00');
    channel.send({ embed });
  });

  client.on('roleDelete', message => {
    const { guild } = message
    const channel = guild.channels.cache.get(logChannel)
    const embed = new MessageEmbed().setAuthor(
      `Role Suprimé`,
      guild.iconURL()
    ).setColor('0xFF5500');
    channel.send({ embed });
  });

  client.on('inviteCreate', message => {
    const { guild } = message
    const channel = guild.channels.cache.get(logChannel)
    const embed = new MessageEmbed().setAuthor(
      `Invitation Créer`,
      guild.iconURL()
    ).setColor('0x4DFF00');
    channel.send({ embed });
  });

  client.on('inviteDelete', message => {
    const { guild } = message
    const channel = guild.channels.cache.get(logChannel)
    const embed = new MessageEmbed().setAuthor(
      `Invitation Suprimée`,
      guild.iconURL()
    ).setColor('0xFF5500');
    channel.send({ embed });
  });


  client.on('messageDelete', message => {
    const { guild } = message
    const channel = guild.channels.cache.get(logChannel)
    if(isbadw == false) {
      if (message.type == 'text') {
        const embed = new MessageEmbed().setAuthor(
          `Message Surpimé`,
          message.author.avatarURL()
        ).addField('Auteur', message.author.username)
        .addField('Message', message.cleanContent)
        .setThumbnail(message.author.avatarURL)
        .setColor('0x00AAFF');
        channel.send({ embed });
      }
    }
  });

  client.on('channelUpdate', message => {
    const { guild } = message
    const channel = guild.channels.cache.get(logChannel)
    const embed = new MessageEmbed().setAuthor(
      `Salon Modifié`,
      guild.iconURL()
    ).setColor('0x00AAFF');
    channel.send({ embed });
  });

  client.on('emojiCreate', message => {
    const { guild } = message
    const channel = guild.channels.cache.get(logChannel)
    const embed = new MessageEmbed().setAuthor(
      `Emoji Créer`,
      guild.iconURL()
    ).setColor('0x4DFF00');
    channel.send({ embed });
  });

  client.on('emojiDelete', message => {
    const { guild } = message
    const channel = guild.channels.cache.get(logChannel)
    const embed = new MessageEmbed().setAuthor(
      `Emoji Suprimé`,
      guild.iconURL()
    ).setColor('0xFF5500');
    channel.send({ embed });
  });

  client.on('error', message => {
    const { guild } = message
    const channel = guild.channels.cache.get(logChannel)
    const embed = new MessageEmbed().setAuthor(
      `Erreur Bot !! Voir Console pour plus d'info.`,
      guild.iconURL()
    ).setColor('0xFF0000');
    channel.send({ embed });
  });

  client.on('guildMemberAdd', async (member) => {
    const { guild, user } = member
    let status = user.presence.status;
    const channel = guild.channels.cache.get(welcomeChannel)
    if (status === "dnd") { color = "#FF335B"; }
    else if (status === "online") { color = "#3390FF"; }
    else if (status === "idle") { color = "#3390FF"; }
    else { status = "streaming"; color = "#6833FF"; }  
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');
  
    const background = await Canvas.loadImage('./background.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
    ctx.font = '28px Arial';
    ctx.fillStyle = color;
    ctx.fillText(`Bienvenue sur ${serverName},`, canvas.width / 2.5, canvas.height / 3.5);
  
    ctx.font = '32px Arial';
    ctx.fillStyle = color;
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.font = '24px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Membre #${guild.memberCount}`, canvas.width / 2.5, canvas.height / 1.3);
  
    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
  
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);
  
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
  
    channel.send(`Bienvenue, ${member}!`, attachment);
  })

  client.on('guildMemberRemove', member => {
    const { guild, user } = member
    const channel = guild.channels.cache.get(welcomeChannel)
    const embed = new MessageEmbed().setAuthor(
      `à quitté ${guilf.name}. Snif.`,
      user.avatarURL()
    ).setColor('0xFF0000');
    channel.send({ embed });
  })





  

  // RANDOM //

 /* command(client, 'random', message => {
    const args = message.content.split(" ");
    arg = args[1]
    const randomNumber = random.int(min = 0, max = arg)
    message.channel.send(`Nombre aléatoire entre **0** et **${arg}** = **${randomNumber}**`)
  }) */

  // CLEAR //

  command(client, 'clear', message => {
    const args = message.content.split(" ");
    arg = args[1]
    const { member, mentions, guild } = message
    if(member.hasPermission('MANAGE_MESSAGES')) {
      if (arg==undefined) {
        message.reply("Veuillez préciser un nombre !")
      } else {
        message.channel.bulkDelete(arg)
        .then(messages => console.log(`${args[1]} messages suprimés.`))
        .catch(console.error);
        message.channel.send(`${args[1]} messages suprimés.`);
      }
    } else {
      message.reply("Vous n'avez pas la permission !")
    }
  })
    
    
  // LEVEL //

  leveling(client);   

  // INFO //

  command(client, 'info',  message => {
    const embed = new MessageEmbed()
      .setTitle(`PokéBot v${version}`)
      .setColor(0xff3000)
      .setDescription(`PokéBot est un bot privé au serveur ${serverName}.\nIl à été en partit coder coder par Savalet#6252 mais @PPC#3027 et ablayeYT
#5922 on rajouter les fonctionnalités propre à Pokétium.\nLa version actuelle est la v${version} et elle est sortit sur le bot le ${lastUpdate}.`);
    message.channel.send(embed);
  })





  // AUTOMOD //

      /* Anti Spam */
  client.on('message', (message) => antiSpam.message(message));
  antiSpam.on("warnAdd", (member) => {
    const channel = member.guild.channels.cache.get(banChannel)
    const bottag = client.user.username
    const raison = "Spam"
    const embed = new MessageEmbed().setAuthor(
      `Warn`,
      member.user.avatarURL()
      ).addFields(
        {
        name: 'Joueur',
        value: member.user.tag
    
      }, 
      {
        name : 'Raison',
        value: raison
      },
      {
        name: "Opérateur",
        value: bottag
    
      }).setColor('0xFFCD00');
    channel.send({ embed });
  });

      /* Anti Bad Word */
      client.on('message', async message => {
        if(message.author.bot === false) {
          for (var i = 0; i < badw.length; i++) {
            if (message.content.includes(badw[i])) {
              const { member } = message
              isbadw = true
              message.delete()
              message.reply("**Ce mot est interdit !**")
              const channel = member.guild.channels.cache.get(logChannel)
              const embed = new MessageEmbed().setAuthor(
                `Mot interdit`,
                message.author.avatarURL()
                ).addFields(
                  {
                  name: 'Message :',
                  value: message
              
                }, 
                {
                  name : 'Auteur',
                  value: message.author.tag
                },
                {
                  name: "ID de l'utilisateur",
                  value: message.author.id
              
                }).setColor('0xFFCD00');
              channel.send({ embed });
              await sleep(2000);
              isbadw = false
              break;
            }
          }
        }   
      })

      /* Anti Link */
     /* client.on('message', async message => {
        if(message.author.bot === false) {
          if (message.content.includes("discord.gg")) {
            isbadw = true
            message.delete()
            message.reply("**Il est interdit d'enoyer des invitations discord !**")
            await sleep(2000);
            isbadw = false
          }
        }
      }) */
  



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
  }).setColor("0x007FFF")

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
    const { member, mentions, guild } = message
    const tag = `${member.id}`

    if(member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')) {
        const target = mentions.users.first()
        if(target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.ban()
            message.channel.send(`${target.tag} à bien été banni`)
            const channel = guild.channels.cache.get(banChannel)
            const raison = "Undefied"
            const embed = new MessageEmbed().setAuthor(
              `Ban`,
              targetMember.user.avatarURL()
              ).addFields(
                {
                name: 'Joueur',
                value: targetMember
            
              }, 
              {
                name : 'Raison',
                value: raison
              },
              {
                name: "Opérateur",
                value: message.author.tag
            
              }).setColor('0xFF0000');
            channel.send({ embed });        }else {
            message.channel.send(`Merci de préciser un utilisateur <@${tag}>`)
        }
    }else {
        message.channel.send(`<@${tag}> Vous n'avez pas la permission pour utiliser cette commande.`)
    }
})

  // KICK //

  command(client, 'kick', message => {

    const { member, mentions, guild } = message
    const tag = `${member.id}`

    if(member.hasPermission('ADMINISTRATOR') || member.hasPermission('KICK_MEMBERS')) {
        const target = mentions.users.first()
        if(target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.kick()
            message.channel.send(`${target.tag} à bien été expulser !`)
            const channel = guild.channels.cache.get(banChannel)
            const raison = "Undefied"
            const embed = new MessageEmbed().setAuthor(
              `Kick`,
              targetMember.user.avatarURL()
              ).addFields(
                {
                name: 'Joueur',
                value: targetMember
            
              }, 
              {
                name : 'Raison',
                value: raison
              },
              {
                name: "Opérateur",
                value: message.author.tag
            
              }).setColor('0xFF5500');
            channel.send({ embed });

            
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
    .setTitle(`Aide ${message.client.user.username}`)
    .setColor(0x2abef8)
    .setDescription(`**${PREFIX}status** *Le status du serveur Minecraft d'${serverName}*\n**${PREFIX}ip** *Ip du serveur Minecraft d'${serverName}*\n**${PREFIX}info** *Infos d'${serverName}Bot*\n**${PREFIX}rank** *Envoie ton niveau actuel*\n**${PREFIX}leaderboard** *Voir le leaderboard d'${serverName}*\n**${PREFIX}site** *Envoie le site d'${serverName}* :yum: \n**${PREFIX}avatar** *Recupere l'avatar de l'utilisateur mentionner*\n**${PREFIX}uinfo** *Récupere des infos de l'utilisateur mentionner*\n**${PREFIX}sinfo** *informations du serveur*\n**${PREFIX}logo** *Je t'envoie le logo d'${serverName}'*\n**${PREFIX}gif** *Envoie un GIF random*\n**${PREFIX}sorry** *c'est dans le titre* :wink:\n**${PREFIX}help-music** *pour afficher les aides du système de musique*\n**${PREFIX}uptime** *connaitre depuis combien de temps le bot est lancé*\n\n**Les commandes de modération :**\n**${PREFIX}clear** *Suprime le nombre de messages indiqué*\n**${PREFIX}ban** *Pour ban*\n**${PREFIX}mute** *Pour mute temporairement*\n**${PREFIX}kick** *Pour kick*\n\n\n${serverName}Bot v`+version+" by savalet ");
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


    // LOGO //

    command(client, 'logo', (message) => {
      message.channel.send(`> **Le logo d'${serverName}:**`, {files: ["./image/logo.png"]})

  })


  // PUB //

  command(client, 'pub', (message) => {
      message.channel.send("> **Cette commande à étée temporairement désactivée.**");


  })

  // SALUT //

  command(client, 'salut', (message) => {
      const membre = message.mentions.members.first() || message.member;
      message.channel.send(`> Hey ${membre.user.username} , comment ça va sur le serveur d'${serverName} ! :slight_smile:`);
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
      message.channel.send(`> **Hey ${membre.user.username}** , ***voici le site d'${serverName}, tu peut voter pour le serveur :grin: :*** https://arkia-mc.fr/`);

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
