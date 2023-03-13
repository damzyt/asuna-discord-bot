const { Events } = require("discord.js")
const Guild = require("../schemas/guild")

module.exports = {
    name: Events.GuildMemberRemove,
    once: true,
    async execute(member) {
        const data = await Guild.findOne({ guildId: member.guild.id })
        if(!data || !data.guildLeaveChannel) return

        const leaveChannel = member.guild.channels.cache.get(data.guildLeaveChannel)

        const deathMessages = ["zginął w walce", "poległ w czasie walki", "poniósł śmierć w trakcie walki", "stracił życie w walce"]
        const worldFloors = [1,2,3,4,35,74,75]
        const worldFloorsMobs = []

        worldFloorsMobs[1] = ["z Wilkiem","z Szalonym Dzikiem","z Koboltem Żołnierzem Ruin","z Koboltem Wojownikiem Ruin","z Koboltem Wartownikiem Ruin","z Lordem Koboltów Ilfangiem"]
        worldFloorsMobs[2] = ["z Drżącym Wołem","z Wietrzną Osą","z Ząbkowanym Robakiem","z Pękatogłowym Bykiem","z Mniejszym Taurusem Napastnikiem","z Pułkownikiem Taurusów Natem","z Generałem Taurusów Baranem"]
        worldFloorsMobs[3] = ["z Drzewcem Podrostek","ze Starym Drzewcem","z Pająkiem z Gęstwiny","z Pająkem Kopisem","z Nephilą Reginą","z Ryczącym Wilkiem","z Nieznanym Rabusiem","z Upadłym Elfim Wojownikiem","z Dowódcą Upadłych Elfów","ze Złym Drzewcem Neliusem"]
        worldFloorsMobs[4] = ["z Niedźwiedziem","z Magnatherium","z Wędrującym Krabem","z Upadłym Elfem Brygadzistą Eddhu","z Upadłym Elfem Generałem N'ltzahh","z Dwugłowym Archelonem","z Hipokampem Wythegem","z Illfangiem Lordem Koboldów"]
        worldFloorsMobs[35] = ["z Mikołajem Renegatem"]
        worldFloorsMobs[74] = ["z Krzemieniookim"]
        worldFloorsMobs[75] = ["ze Skull Reaperem"]

        let randomFloor = worldFloors[Math.floor(Math.random() * worldFloors.length)]

        leaveChannel.send("```apache\nSYSTEM: "+member.user.tag+" "+deathMessages[Math.floor(Math.random() * deathMessages.length)]+" "+worldFloorsMobs[randomFloor][Math.floor(Math.random() * worldFloorsMobs[randomFloor].length)]+" na "+randomFloor+". piętrze\nSYSTEM: Pozostało "+member.guild.memberCount+" graczy```")
    
    }
}