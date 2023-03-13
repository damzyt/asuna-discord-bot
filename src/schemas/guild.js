const { Schema, model } = require("mongoose")
const guildSchema = new Schema({
    guildId: { type: String, requied: true },
    guildWelcomeChannel: { type: String, requied: false },
    guildLeaveChannel: { type: String, requied: false },
    guildWelcomeRole: { type: String, requied: false }
})

module.exports = model("Guild", guildSchema, "guilds")