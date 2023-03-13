const fs = require("fs")
const dotenv = require("dotenv").config()
const { connect } = require("mongoose")
const { Player } = require("discord-player")
const { Client, GatewayIntentBits, Collection, Events } = require("discord.js")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
    ],
    partials: [ 'CHANNEL' ]
})

client.commands = new Collection()
client.prefixCommands = new Collection()
client.aliases = new Collection()

const handlers = fs.readdirSync('./src/handlers').filter(file => file.endsWith(".js"));

for(const handler of handlers) {
    require(`./src/handlers/${handler}`)(client)
}

client.login(process.env.DISCORD_TOKEN)