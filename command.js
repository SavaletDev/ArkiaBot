const { prefix } = require('./config.json')
var d = new Date();
var hours = "[" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "] ";

module.exports = (client, aliases, callback) => {
    if(typeof aliases === 'string') {
        aliases = [aliases]
    }

    client.on('message', message => {
        const { content } = message;

        aliases.forEach(alias => {
            const command = `${prefix}${alias}`

            if(content.startsWith(`${command} `) || content === command) {
                console.log(hours + `Commande exécutée : ${command}`)
                callback(message)
            }
        })
    })
}