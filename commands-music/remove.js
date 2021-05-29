const { canModifyQueue } = require("../util/utilmusic");

module.exports = {
  name: "remove",
  aliases: ["rm"],
  description: "Retirer une musique de la liste de lecture",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Aucune musique de ce nom dans la liste de lecture.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Usage: ${message.client.prefix}remove <Nombre>`);
    if (isNaN(args[0])) return message.reply(`Usage: ${message.client.prefix}remove <Nombre>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ **${song[0].title}** à été retiré de la liste de lecture.`);
  }
};
