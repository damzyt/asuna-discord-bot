const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("🏓 Pong!")
    .setDMPermission(false),
    async execute(interaction, client) {
        return await interaction.reply({ 
            content: "<:OS:1084750415133941781> May I inquire as to how your day is progressing, if you don't mind me asking? As for myself, I am doing well."
        })
    }
}