const { InteractionType } = require("discord.js")
const { exportedMessages } = require('../commands/messageCreate.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if (interaction.type === InteractionType.ApplicationCommand){
            let command = await client.commands.get(interaction.commandName)

            if (!command) return
            
            try {
                const user = interaction.user
                if (interaction.isCommand()) {
                    if (client.commands.has(interaction.commandName)) {
                        let options = []
                        interaction.options._hoistedOptions.forEach(option => options.push(option.value))
                        await command.run(client, interaction, user)
                    }
                }
            } catch (e) {
                console.error(e)
                return interaction.reply({
                    content: 'Ha surgido un error al ejecutar el comando.',
                    ephemeral: true
                })
            }
        }

        
    }
}