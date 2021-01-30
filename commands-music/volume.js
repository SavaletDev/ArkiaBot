const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Change le volume de la musique.",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Aucune musique n'est en cours de lecture.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("Vous devez rejoindre un salon vocal avant !").catch(console.error);

    if (!args[0]) return message.reply(`🔊 Le volume actuelle est : **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Utilisez un nombre pour le volume !").catch(console.error);
    if (Number(args[0]) > 100 || Number(args[0]) < 0 )
      return message.reply("Utilisez un nombre entre 0 et 100.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`Volume mis à : **${args[0]}%**`).catch(console.error);
  }
};
