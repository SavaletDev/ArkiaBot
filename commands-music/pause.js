const { canModifyQueue } = require("../util/utilmusic");

module.exports = {
  name: "pause",
  description: "Mettre en pause la musiqe actuelle",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Il n'y a rien qui joue.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(`${message.author} ⏸ a mis la musique en pause.`).catch(console.error);
    }
  }
};
