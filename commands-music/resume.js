const { canModifyQueue } = require("../util/utilmusic");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Relancer la lecture",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Aucune musique n'est en en cours de lecture !").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ▶ lecture relancer !`).catch(console.error);
    }

    return message.reply("The queue is not paused.").catch(console.error);
  }
};
