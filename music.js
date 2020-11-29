module.exports = (client) => {
    var dispatcher = null;
    var d = new Date();
    var play = 0
    var args = null
    var hours = "[" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "] ";
    const delay = require('delay');
    let playlist = [];
    var nb = 0
    const { Client, MessageEmbed } = require('discord.js');
    var clear = 0
    auto = 0

    client.on('message', async message => {
        if (!message.guild) return; 
    
// STOP //

        if (message.content.startsWith('-stop')) {
            if (play == 1) {
              if (message.member.voice.channel) {
              const connection = await message.member.voice.channel.join();
              dispatcher.destroy();
              connection.disconnect()
              console.log(hours + 'Musique coupé');
              const embed = new MessageEmbed()
              .setTitle('Musique coupée')
              .setColor(0x0B5394)
              message.channel.send(embed);              
              play = 0
              } else {
                  message.reply("**Vous n'etes dans aucun salon vocal !**")
              }
            } else {
                message.reply("**Aucune musique n'est lancé !**");
        }
          }

// PLAY //  

        if (message.content.startsWith('-play')) {
          if (message.member.voice.channel) {
              
            args = message.content.split(' ')
            const connection = await message.member.voice.channel.join();
            const ytdl = require('ytdl-core');
            playlist.push(args[1]);
            const msg = await message.channel.send('**Musique en cours de lancement.**');
            dispatcher = await connection.play(ytdl(playlist[nb], { filter: 'audioonly' }));
            console.log(hours + 'Musique lancé : ',playlist[nb]);
            clear = 1
            play = 1
            await delay(1000);
            msg.edit('**Musique en cours de lancement..**')
            await delay(1000);
            msg.edit('**Musique en cours de lancement...**')
            await delay(1000);
            msg.edit('**Musique en cours de lancement....**')
            await delay(500);
            msg.delete()
            const embed = new MessageEmbed()
            .setTitle('Musique Lancé')
            .setColor(0x0B5394)
            .setDescription(playlist[nb]);
            message.channel.send(embed);

          } else {
            message.reply('**Il faut que vous rejoignez un salon vocal avant !**');
          }  
    }

// ADD //

    if (message.content.startsWith('-add')) {
        if (message.member.voice.channel) {
          args = message.content.split(' ')
          playlist.push(args[1]);
          clear = 1
          const embed = new MessageEmbed()
          .setTitle('Musique ajouté')
          .setColor(0x0B5394)
          .setDescription(args[1]);
          message.channel.send(embed);
          console.log(hours + 'Musique ajouté : ',playlist);
        } else {
          message.reply('**Il faut que vous rejoignez un salon vocal avant !**');
        }  
    }

// NEXT //

       if (message.content.startsWith('-next')) {
          if (message.member.voice.channel) {
            nb = nb+1
            const connection = await message.member.voice.channel.join();
            const ytdl = require('ytdl-core');
            const embed = new MessageEmbed()
            .setTitle('Musique suivante')
            .setColor(0x0B5394)
            .setDescription(playlist[nb]);
            message.channel.send(embed);
            dispatcher = await connection.play(ytdl(playlist[nb], { filter: 'audioonly' }));
        } else {
          message.reply('**Il faut que vous rejoignez un salon vocal avant !**');
       }  
   }

// PREVIOUS //

     if (message.content.startsWith('-previous')) {
     if (message.member.voice.channel) {
       nb = nb-1
       const connection = await message.member.voice.channel.join();
       const ytdl = require('ytdl-core');
       const embed = new MessageEmbed()
       .setTitle('Musique précédente')
       .setColor(0x0B5394)
       .setDescription(playlist[nb]);
       message.channel.send(embed);
       dispatcher = await connection.play(ytdl(playlist[nb], { filter: 'audioonly' }));
     } else {
       message.reply('**Il faut que vous rejoignez un salon vocal avant !**');
    }  
   }  

// QUEUE //

     if (message.content.startsWith('-queue')) {
      if (clear == 1) {
      if (message.member.voice.channel) {
        const embed = new MessageEmbed()
        .setTitle('Voici la liste des musiques :')
        .setColor(0x0B5394)
        .setDescription(playlist);
        message.channel.send(embed);
       } else {
         message.reply('**Il faut que vous rejoignez un salon vocal avant !**');
      }
    } else {
        message.reply('**La liste de lecture est deja vide !')
    }  
     }  

// CLEAR //

     if (message.content.startsWith('-clear')) {
        if (message.member.voice.channel) {
          playlist = [];
          const embed = new MessageEmbed()
          .setTitle('Liste de lecture vidée')
          .setColor(0x0B5394)
          message.channel.send(embed);
          clear = 1
          } else {
          message.reply('**Il faut que vous rejoignez un salon vocal avant !**');
       }  
      } 

// PAUSE //  

        if (play == 1) {}
        if (message.content.startsWith('-pause')) {
            if (play == 1) {
                if ((message.member.voice.channel) && (dispatcher!= null)) {
                    dispatcher.pause();
                    console.log(hours + 'Musique mise en pause');
                    const embed = new MessageEmbed()
                    .setTitle('Musique mise en pause')
                    .setColor(0x0B5394)
                    message.channel.send(embed);
                    } else {
                    message.reply('**Il faut que vous rejoignez un salon vocal avant !**');
                  }
            } else {
                message.reply("**Aucune musique n'est en cours de lecture**")
            }
        } 

// RESUME //

        if (message.content.startsWith('-resume')) {
            if (play == 1) {
                if ((message.member.voice.channel) && (dispatcher!= null)) {
                    dispatcher.resume();
                    console.log(hours + 'Musique relancée');
                    const embed = new MessageEmbed()
                    .setTitle('Musique relancée')
                    .setColor(0x0B5394)
                    message.channel.send(embed);            
                    } else {
                    message.reply('**Il faut que vous rejoignez un salon vocal avant !**');
                  }
            } else {
                message.reply("**Aucune musique n'est en cours de lecture**")
            }
        }

// NP //

        if (message.content.startsWith('-np')) {
            if (play == 1) {
                if (message.member.voice.channel) {
                    const embed = new MessageEmbed()
                    .setTitle('La musique en cours est :')
                    .setColor(0x0B5394)
                    .setDescription(playlist[nb]);
                    message.channel.send(embed);       
                    } else {
                    message.reply('**Il faut que vous rejoignez un salon vocal avant !**');
                  }
            } else {
                message.reply("**Aucune musique n'est en cours de lecture**")
            }
        }
 

    });

// AUTO NEXT //


    if (play == 1) {
        dispatcher.on('finish', () => {
           auto = 1
      });
    }

    if (auto == 1) {
        nb = nb+1
        const connection = message.member.voice.channel.join();
        const ytdl = require('ytdl-core');
        const embed = new MessageEmbed()
        .setTitle('Musique terminé')
        .setColor(0x0B5394)
        .setDescription(playlist[nb]);
        message.channel.send(embed);
        dispatcher = connection.play(ytdl(playlist[nb], { filter: 'audioonly' }));
        console.log(hours + 'Musique terminé')
        auto = 0
     }

}