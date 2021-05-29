const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help-music",
  aliases: ["mh"],
  description: "Affiche toutes les commandes disponible",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle(`${message.client.user.username}Bot Aide Musique`)
      .setColor("#2abef8");

      commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });


    return message.channel.send(helpEmbed).catch(console.error);
  }
};
