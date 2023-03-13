const { SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits } = require('discord.js')
const Guild = require("../../schemas/guild")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("⚙️ Setup options for bot on your discord server.")
        .setDMPermission(false)
        .addSubcommand(subcommand =>
            subcommand
                .setName("welcome_role")
                .setDescription("⚙️ Set the welcome role for the new users.")
                .addRoleOption(option =>
                    option
                        .setName("role")
                        .setDescription("Specify welcome role.")
                        .setRequired(true)))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addSubcommand(subcommand => 
            subcommand
                .setName("welcome_channel")
                .setDescription("👋 Set the channel where you want welcome messages to appear.")
                .addChannelOption(option =>
                    option
                        .setName("channel")
                        .setDescription("Specify welcome channel.")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName("leave_channel")
                .setDescription("🤧 Set the channel where you want leave messages to appear.")
                .addChannelOption(option =>
                    option
                        .setName("channel")
                        .setDescription("Specify leave channel.")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true))),

    async execute(interaction, client) {
        let guild = await Guild.findOne({ guildId: interaction.guild.id })

        if(!guild) {
            Guild.create({
                guildId: interaction.guild.id,
            })
        }

        if(interaction.options.getSubcommand() === "welcome_channel") {
            guild = await Guild.findOneAndUpdate({ guildId: interaction.guild.id, guildWelcomeChannel: interaction.options.getChannel("channel")})

            return interaction.reply({
                content: `Set welcome channel to ${interaction.options.getChannel("channel")}`
            })
        }

        if(interaction.options.getSubcommand() === "leave_channel") {
            guild = await Guild.findOneAndUpdate({ guildId: interaction.guild.id, guildLeaveChannel: interaction.options.getChannel("channel")})

            return interaction.reply({
                content: `Set leave channel to ${interaction.options.getChannel("channel")}`
            })
        }

        if(interaction.options.getSubcommand() === "welcome_role") {
            guild = await Guild.findOneAndUpdate({ guildId: interaction.guild.id, guildWelcomeRole: interaction.options.getRole("role")})

            return interaction.reply({
                content: `Set welcome role to ${interaction.options.getRole("role")}`
            })
        }
    }
}