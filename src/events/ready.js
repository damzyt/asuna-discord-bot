const dotenv = require("dotenv").config()
const { ActivityType, Events } = require('discord.js')
const { connect } = require("mongoose")

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        await connect(process.env.DATABASE_CONNECT, {
            keepAlive: true,
            useNewUrlParser: true
        }).catch(console.error)

        await client.user.setPresence({ 
            activities: [{ name: "Sword Art Online", type: ActivityType.Playing }],
            status: "online"
        });

        console.log(`[CLIENT] Connected to ${client.user.username}, started in ${client.guilds.cache.size} guild(s)`)
    }
}