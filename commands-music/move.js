const move = require("array-move");
const { canModifyQueue } = require("../util/utilmusic");

module.exports = {
  name: "move",
  aliases: ["mv"],
  description: "Déplacez les chansons dans la liste de lecture",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Il n'y a pas de liste de lecture.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Usage: ${message.client.prefix}move <Nombre>`);
    if (isNaN(args[0]) || args[0] <= 1) return message.reply(`Usage: ${message.client.prefix}move <Nombre>`);

    let song = queue.songs[args[0] - 1];

    queue.songs = move(queue.songs, args[0] - 1, args[1] == 1 ? 1 : args[1] - 1);
    queue.textChannel.send(
      `${message.author} 🚚 à déplacer **${song.title}** à la position ${args[1] == 1 ? 1 : args[1] - 1} sur la liste de lecture.`
    );
  }
};
