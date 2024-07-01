const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {

        if(interaction.isChatInputCommand()) {

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

        if (interaction.isModalSubmit()) {

            const [customId, targetChannelId] = interaction.customId.split('-');

            if (customId === 'embedModal' || customId === 'embedModalNanaSubs') {
                const url = interaction.fields.getTextInputValue('urlInput') || null;
                const title = interaction.fields.getTextInputValue('titleInput');
                const description = interaction.fields.getTextInputValue('descriptionInput');
                const imageUrl = interaction.fields.getTextInputValue('imageUrlInput') || null;

                let targetChannel;
                if (targetChannelId === 'default') {
                    targetChannel = interaction.channel;
                } else {
                    targetChannel = interaction.client.channels.cache.get(targetChannelId);
                }

                let embed;
                if (customId === 'embedModal') {
                    const color = interaction.fields.getTextInputValue('colorInput') || '#61FFFF';
                    

                    embed = new EmbedBuilder()
                        .setTitle(title)
                        .setDescription(description)
                        .setColor(color.startsWith('#') ? parseInt(color.slice(1), 16) : color)
                        .setURL(url)
                        .setImage(imageUrl);

                } else if (customId === 'embedModalNanaSubs') {
                    const color = '#61FFFF';
                    const authorName = 'nanasubs.com';
                    const authorIconUrl = 'https://nanasubs.com/images/logotypes/logo-small.png';
                    const authorUrl = url;

                    embed = new EmbedBuilder()
                        .setTitle(title)
                        .setDescription(description)
                        .setColor(color.startsWith('#') ? parseInt(color.slice(1), 16) : color)
                        .setURL(url)
                        .setImage(imageUrl)
                        .setAuthor({ name: authorName, iconURL: authorIconUrl, url: authorUrl })
                        .setFooter({ text: 'nanasubs.com' });
                }

                // Send the embed to the target channel
                await targetChannel.send({ embeds: [embed] });

                // Respond to the interaction
                await interaction.reply({ content: 'Embed created and sent!', ephemeral: true });
            }
            
        }
        
    }
}
