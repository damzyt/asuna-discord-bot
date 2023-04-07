const { Schema, model } = require("mongoose")
const guildSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildId: { type: String, requied: true },
    guildWelcomeChannel: { type: String, requied: false },
    guildLeaveChannel: { type: String, requied: false },
    guildWelcomeRole: { type: String, requied: false }
})

module.exports = model("Guild", guildSchema, "guilds")