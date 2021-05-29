const { canModifyQueue } = require("../util/utilmusic");

module.exports = {
  name: "stop",
  description: "Stop la musique",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Aucune musique n'est en cours.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ musique coupée!`).catch(console.error);
  }
};
