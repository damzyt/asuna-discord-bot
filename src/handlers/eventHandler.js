const fs = require("fs");
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

async function events(client) {
    for(const file of eventFiles) {
        const event = require(`../events/${file}`);

        // LOGGING
        if(!event.name) {
            console.log(`[EVENTS] Event at ${file} is missing a name or has an invalid name`)
        } else {
            console.log(`[EVENTS] Loaded ${event.name}`)
        }

        // EXECUTING
        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args, client))
        } else {
            client.on(event.name, (...args) => event.execute(...args, client))
        }
    }
}

module.exports = events;