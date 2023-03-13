const fs = require("fs")
const mongoFiles = fs.readdirSync('./src/events/mongo').filter(file => file.endsWith('.js'));
const { connection } = require("mongoose")


async function mongo(client) {
    for(const file of mongoFiles) {
        const event = require(`../events/mongo/${file}`);

        // LOGGING
        if(!event.name) {
            console.log(`[MONGO] Event at ${file} is missing a name or has an invalid name`)
        } else {
            console.log(`[MONGO] Loaded ${event.name}`)
        }

        // EXECUTING
        if(event.once) {
            connection.once(event.name, (...args) => event.execute(...args, client))
        } else {
            connection.on(event.name, (...args) => event.execute(...args, client))
        }
    }
}

module.exports = mongo;