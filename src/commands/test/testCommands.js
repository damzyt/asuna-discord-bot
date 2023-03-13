const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("🛠️ Collection of testing commands.")
        .setDMPermission(false)
        .addSubcommand(subcommand => 
            subcommand
                .setName("join")
                .setDescription("🛠️ Test a welcome message.")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Specify the user to be welcome.")
                        .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
                .setName("leave")
                .setDescription("🛠️ Test a goodbye message.")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("Specify the user to say goodbye.")
                        .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
                .setName("connection")
                .setDescription("🛠️ Test a bot connection."))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction, client) {
        const guild = client.guilds.cache.get(interaction.guild.id)   
        
        if(interaction.options.getSubcommand() === "join") {
            const member = guild.members.cache.get(interaction.options.getUser("user").id)

            client.emit("guildMemberAdd", member)
            return interaction.reply({ content: "Sent test welcome message" })
        }

        if(interaction.options.getSubcommand() === "leave") {
            const member = guild.members.cache.get(interaction.options.getUser("user").id)

            client.emit("guildMemberRemove", member)
            return interaction.reply({ content: "Sent test goodbye message" })
        }

        if(interaction.options.getSubcommand() === "connection") {
            await interaction.deferReply()

            const reply = await interaction.fetchReply()
            const ping = reply.createdTimestamp - interaction.createdTimestamp

            interaction.editReply("Client: **`" + ping + "`**ms\nWebsocket: **`" + client.ws.ping + "`**ms")
        }
    }
}