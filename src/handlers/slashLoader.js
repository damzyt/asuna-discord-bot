const { REST, Routes } = require("discord.js")
const fs = require("node:fs")
const util = require("util")
const readdir = util.promisify(fs.readdir);

async function slashLoader() {
    const slashCommands = [];
    const slashFolders = await readdir('./src/commands/');
    slashFolders.forEach((dir) => {
        const commands = fs.readdirSync(`./src/commands/${dir}/`).filter((file) => file.endsWith('.js'));
        for(const file of commands) {
            const command = require(`../commands/${dir}/${file}`);
            try {
                slashCommands.push(command.data.toJSON())
            } catch(error) {
                console.log(`[ERROR] ${error.stack}`);
            }
        }
    })

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)

    try {
        console.log(`[SLASH] Started refreshing ${slashCommands.length} application commands`);

        // if(options.slash_global == true) {
        const global_data = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: slashCommands });
        console.log(`[SLASH] Successfully reloaded ${global_data.length} application commands`);
        // } else {
        //     const guild_data = await rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), { body: slashCommands });
        //     console.log(chalk.white(`[${chalk.grey("SLASH")}]${chalk.white(" - ")}Successfully reloaded ${guild_data.length} guild application commands`));
        // }
    } catch(error) {
        console.log(`[SLASH] There was an error while refreshing the application commands: ${error.stack}`);
    }
}

module.exports = slashLoader;