const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "Aller à la musique avec le numéro",
  execute(message, args) {
    if (!args.length || isNaN(args[0]))
      return message
        .reply(`Utilsez : ${message.client.prefix}${module.exports.name} <Nombre>`)
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Aucune musique connue avec ce numéro.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    if (args[0] > queue.songs.length)
      return message.reply(`La liste de lecture fais que ${queue.songs.length} musiques de long !`).catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }

    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ musique passer ${args[0] - 1}`).catch(console.error);
  }
};
