const { Events, EmbedBuilder, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, userMention } = require("discord.js")
const { createCanvas, GlobalFonts, loadImage } = require("@napi-rs/canvas")
const Guild = require("../schemas/guild")

GlobalFonts.registerFromPath(__dirname + "/../assets/fonts/SAOWelcome-Bold.otf", "SAO Bold")
GlobalFonts.registerFromPath(__dirname + "/../assets/fonts/SAOWelcome-Regular.otf", "SAO Normal")

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const data = await Guild.findOne({ guildId: member.guild.id })
        if(!data || !data.guildWelcomeChannel) return

        const welcomeChannel = member.guild.channels.cache.get(data.guildWelcomeChannel)
        
        const canvas = createCanvas(1100,500)
        const ctx = canvas.getContext('2d')
        const bg = await loadImage(__dirname + "/../assets/images/background.png")
        const avatar = await loadImage(member.user.displayAvatarURL({ format: "png", size: 256 }))
        
        ctx.imageSmoothingQuality = "high"
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "rgba(0, 0, 0, 0.4)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.font = '60px "SAO Bold"'
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.fillText(`Witamy w Aincrad, ${member.user.username}`, canvas.width / 2, 390, canvas.width)
        
        ctx.font = '35px "SAO Normal"'
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.fillText(`Zalogowałeś/aś się jako ${member.guild.memberCount} gracz`, canvas.width / 2, 435, canvas.width)
        
        ctx.beginPath()
        ctx.arc((canvas.width / 2), 178, 128, 0, Math.PI * 2, false)
        ctx.strokeStyle = "white"
        ctx.lineWidth = 10
        ctx.stroke()
        ctx.clip()
        ctx.drawImage(avatar, (canvas.width / 2) - 128, 50, 256, 256)

        const welcomeImage = new AttachmentBuilder(await canvas.encode("png"), { name: "welcome.png" })
        const welcomeMessage = new EmbedBuilder() 
            .setColor("#117cbd")
            .setTitle("Na serwer zalogował się nowy gracz!")
            .setDescription(`<:__:1084748123915689985> Witaj w **NanaSubs**, ${userMention(member.id)}!\n\nNasze najnowsze tłumaczenia znajdziesz na kanale \n<#771728305421680661> oraz na naszej stronie internetowej. Jeśli masz jakieś pytania, prosimy je kierować na kanał <#772077797803556875>, bądź zachęcamy do rozpoczęcia prywatnej korespondencji z <@&689909150834098234>.`)
            .setImage("attachment://welcome.png")
            .setTimestamp()
            .setFooter({ text: 'Pozdrawiamy, ekipa NanaSubs', iconURL: "https://nanasubs.com/images/logotypes/logo-small.png" })

        const buttonRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('💜 nanasubs.com')
                    .setURL('https://nanasubs.com')
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setLabel('💙 facebook')
                    .setURL('https://www.facebook.com/7subs')
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setLabel('💚 wesprzyj nas!')
                    .setURL('https://buycoffee.to/nanasubs')
                    .setStyle(ButtonStyle.Link),
            )
        welcomeChannel.send({ embeds: [welcomeMessage], files: [welcomeImage], components: [buttonRow] })

        // if(data.guildWelcomeChannel) member.roles.add(data.guildWelcomeRole)
    }
}