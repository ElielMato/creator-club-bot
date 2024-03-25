const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client, interaction) {
        
        console.log(`${client.user.tag} está online!`);
        
        function updateStatus(client) {
            const guildNum = client.guilds.cache.size
            const memberNum = client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)

            client.user.setPresence({
                activities: [
                    {
                        name: `Bot Oficial de Club de Creadores`,
                        type: ActivityType.Watching,
                    },
                    {
                        name: `Creado por Arcenix Company`,
                        type: ActivityType.Watching,
                    },
                ],
                status: "online",
            })
        }

        setInterval(() => {
            updateStatus(client)
            let slashcmds = client.commands.map(c => c.builder)
            client.application.commands.set(slashcmds)
        }, 60000)
    }
}