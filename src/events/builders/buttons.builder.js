const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");
const Config = require('./../../..//config.json');
const db = require("megadb");
const Channel = new db.crearDB({ carpeta: "Database", nombre: "channel" });
const messageCreateModule = require('../commands/messageCreate');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if(!interaction.isButton()) return;
        
        switch (interaction.customId) {
            case "postulation":
                const infoChannel = await Channel.get(interaction.message.id)

                if (infoChannel.active == true) {
                    const modalEdit = new ModalBuilder()
                        .setCustomId('postulationInfo')
                        .setTitle("Informacion para la Postulacion");
                    
                    const modalQuest0 = new TextInputBuilder()
                        .setCustomId('quest0')
                        .setLabel("Link del Portafolio")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true);

                    const modalQuest1 = new TextInputBuilder()
                        .setCustomId('quest1')
                        .setLabel("¿Estar acuerdo con el precio?")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true);
                    
                    const modalQuest2 = new TextInputBuilder()
                        .setCustomId('quest2')
                        .setLabel("¿Podras cumplir las espectativas?")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true);
                    
                    const modalQuest3 = new TextInputBuilder()
                        .setCustomId('quest3')
                        .setLabel("¿Podras cumplir con la fecha limite?")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true);
                    
                    const modalQuest4 = new TextInputBuilder()
                        .setCustomId('quest4')
                        .setLabel("¿Cuales son tus medios de contacto?")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true);

                    const rowQuest0 = new ActionRowBuilder().addComponents(modalQuest0);
                    const rowQuest1 = new ActionRowBuilder().addComponents(modalQuest1);
                    const rowQuest2 = new ActionRowBuilder().addComponents(modalQuest2);
                    const rowQuest3 = new ActionRowBuilder().addComponents(modalQuest3);
                    const rowQuest4 = new ActionRowBuilder().addComponents(modalQuest4);

                    modalEdit.addComponents(rowQuest0, rowQuest1, rowQuest2, rowQuest3, rowQuest4);

                    await interaction.showModal(modalEdit);
                } else {
                    await interaction.reply({
                        content: "🔨 | La postulacion ya fue cerrada por el creador.",
                        ephemeral: true
                    })
                }
                
                break;
            case "close":
                Channel.set(interaction.message.id, {active: false});
                await interaction.reply({
                    content: "✅ | Postulacion Cerrada",
                    ephemeral: true
                })
                break;
            case "accept":
                //Crear canal privado con dicho usuario, se elimina de la base de datos y se desabilita los botones
                
                async function buscarPorChannelId(channelId) {
                    try {
                        const datos = await Channel.values();
                
                        const objetoEncontrado = await datos.find(objeto => objeto.channelId === channelId);
                
                        return objetoEncontrado || null;
                    } catch (error) {
                        console.error("Error al buscar en la base de datos:", error);
                        return null;
                    }
                }
                
                const channelIdABuscar = interaction.channel.id;
                const objetoEncontrado = await buscarPorChannelId(channelIdABuscar);
                if (objetoEncontrado) {
                    console.log(objetoEncontrado.message);
                }

                // await interaction.guild.channels
                //     .create({
                //         name: `ticket-${a}`,
                //         type: ChannelType.GuildText,
                //         parent: Config.Categorys.ChannelPrivate,
                //         permissionOverwrites: [
                //             {
                //                 id: interaction.user.id,
                //                 allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                //             },
                //             {
                //                 id: Config.EveryoneId,
                //                 deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                //             },
                //             {
                //                 id: Config.ClientID,
                //                 allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                //             },
                //         ],
                //     })
                //     .then(async (channel) => {
                //         Channel.set(messageCreateModule.messageId, {ownerId: interaction.user.id, channelId: channel.id, messageId: messageCreateModule.messageId, active: true});

                //         await interaction.reply({
                //             content: "🔨 | Publicacion Creada",
                //             ephemeral: true,
                //         });
                //     });

                await interaction.reply({
                    content: "✅ | Has aceptado al usuario",
                    ephemeral: true
                })

                break;
            case "deny":
                //Rechaza al usuario, se elimina de la base de datos, se desabilita los botones y le manda un dm para saber que fue rechazado.
                break;
        }
    }
}