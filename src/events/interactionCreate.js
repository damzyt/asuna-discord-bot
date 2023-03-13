const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if(!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName)
    
        if(!command) {
            console.log(`[SLASH] No command matching ${interaction.commandName} was found`)
            return
        }
    
        try {
            await command.execute(interaction, client)
        } catch(e) {
            console.log(`[SLASH] There was an error while executing an application command: ${e.stack}`)
            try {
                await interaction.reply({ content: "There was an error while executing this command, please try again", ephemeral: true })
            } catch {
                return
            }
        }
    }
}