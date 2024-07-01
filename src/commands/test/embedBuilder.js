const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("create")
        .setDescription("🛠️ Collection of building commands.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addSubcommandGroup(group =>
            group
                .setName('embed')
                .setDescription('Embed creation commands')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('standard')
                        .setDescription('Create a standard embed')
                        .addChannelOption(option =>
                            option
                                .setName('targetchannel')
                                .setDescription('The target channel where the message should be sent.')
                                .setRequired(false)))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('nanasubs')
                        .setDescription('Create an embed for NanaSubs')
                        .addChannelOption(option =>
                            option
                                .setName('targetchannel')
                                .setDescription('The target channel where the message should be sent.')
                                .setRequired(false)))),

    async execute(interaction) {
        let customId = 'embedModal'; // Default customId
        let includeColorInput = true; // Flag to decide whether to include color input

        // Check if the user selected 'nanasubs' option
        if (interaction.options.getSubcommand() === 'nanasubs') {
            customId = 'embedModalNanaSubs';
            includeColorInput = false; // Do not add color input for 'nanasubs'
        }

        // Retrieve the target channel ID and include it in the customId if provided
        const targetChannel = interaction.options.getChannel('targetchannel');
        const targetChannelId = targetChannel ? targetChannel.id : 'default';
        customId = `${customId}-${targetChannelId}`;

        // Create the modal
        const modal = new ModalBuilder()
            .setCustomId(customId)
            .setTitle('Create Embed');

        // Add text input fields to the modal

        const urlInput = new TextInputBuilder()
            .setCustomId('urlInput')
            .setLabel('URL')
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        const titleInput = new TextInputBuilder()
            .setCustomId('titleInput')
            .setLabel('Title')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const descriptionInput = new TextInputBuilder()
            .setCustomId('descriptionInput')
            .setLabel('Description')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const imageUrlInput = new TextInputBuilder()
            .setCustomId('imageUrlInput')
            .setLabel('Image URL')
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        const row1 = new ActionRowBuilder().addComponents(urlInput);
        const row2 = new ActionRowBuilder().addComponents(titleInput);
        const row3 = new ActionRowBuilder().addComponents(descriptionInput);
        const row4 = new ActionRowBuilder().addComponents(imageUrlInput);

        modal.addComponents(row1, row2, row3, row4);

        // Add color input field if includeColorInput is true
        if (includeColorInput) {
            const colorInput = new TextInputBuilder()
                .setCustomId('colorInput')
                .setLabel('Color (Hex code)')
                .setStyle(TextInputStyle.Short)
                .setRequired(false)
                .setPlaceholder('#61ffff'); // Default value

            const row5 = new ActionRowBuilder().addComponents(colorInput);

            modal.addComponents(row5);
        }

        // Show the modal
        await interaction.showModal(modal);
    }
};
