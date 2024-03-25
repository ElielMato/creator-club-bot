const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");
const Config = require('./../../..//config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if (!interaction.isStringSelectMenu()) return;

        const option = interaction.values[0];

        switch (option) {
            case 'edit':
                const modalEdit = new ModalBuilder()
                    .setCustomId('publicationEdit')
                    .setTitle("Publicaciones de Editores");
                
                const modalQuest0 = new TextInputBuilder()
                    .setCustomId('quest0')
                    .setLabel("¿Qué tipo de servicios buscas?")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                const modalQuest1 = new TextInputBuilder()
                    .setCustomId('quest1')
                    .setLabel("Descripcion del Servicio")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);
                
                const modalQuest2 = new TextInputBuilder()
                    .setCustomId('quest2')
                    .setLabel("¿Cuanto pagarias por el servicio?")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);
                
                const modalQuest3 = new TextInputBuilder()
                    .setCustomId('quest3')
                    .setLabel("Establece la fecha limite")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                const rowQuest0 = new ActionRowBuilder().addComponents(modalQuest0);
                const rowQuest1 = new ActionRowBuilder().addComponents(modalQuest1);
                const rowQuest2 = new ActionRowBuilder().addComponents(modalQuest2);
                const rowQuest3 = new ActionRowBuilder().addComponents(modalQuest3);

                modalEdit.addComponents(rowQuest0, rowQuest1, rowQuest2, rowQuest3);
                
                interaction.showModal(modalEdit);
                await interaction.message.edit();
                break;
            case 'desing':
                const modal1 = new ModalBuilder()
                    .setCustomId('embedWelcome')
                    .setTitle(client.languages.__({phrase: 'welcome.menu-title', locale: language}))

                const modalDesc = new TextInputBuilder()
                    .setCustomId('description')
                    .setLabel(client.languages.__({phrase: 'welcome.write-description', locale: language}))
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false);

                const rowDesc = new ActionRowBuilder().addComponents(modalDesc);

                modal1.addComponents(rowDesc);

                await interaction.showModal(modal1);
                break;
            case 'producer':
                const modal2 = new ModalBuilder()
                    .setCustomId('embedWelcome')
                    .setTitle(client.languages.__({phrase: 'welcome.menu-title', locale: language}))

                const modalColor = new TextInputBuilder()
                    .setCustomId('color')
                    .setLabel(client.languages.__({phrase: 'welcome.write-color', locale: language}))
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false);

                const rowColor = new ActionRowBuilder().addComponents(modalColor);

                modal2.addComponents(rowColor);

                await interaction.showModal(modal2);
                break;
            case 'devs':
                const modal3 = new ModalBuilder()
                    .setCustomId('embedWelcome')
                    .setTitle(client.languages.__({phrase: 'welcome.menu-title', locale: language}))

                const modalChannel = new TextInputBuilder()
                    .setCustomId('channel')
                    .setLabel(client.languages.__({phrase: 'welcome.write-channel', locale: language}))
                    .setStyle(TextInputStyle.Short)
                    .setRequired(false);

                const rowChannel= new ActionRowBuilder().addComponents(modalChannel);

                modal3.addComponents(rowChannel);

                await interaction.showModal(modal3);
                break;
        }
    }
}