const { canModifyQueue } = require("../util/utilmusic");

module.exports = {
  name: "loop",
  aliases: ["l"],
  description: "Active la boucle",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Il n'y a rien qui joue.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel.send(`Boucle ${queue.loop ? "**on**" : "**off**"}`).catch(console.error);
  }
};
