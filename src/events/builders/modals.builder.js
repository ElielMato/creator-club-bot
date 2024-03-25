const {
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
    ChannelType,
    PermissionsBitField
} = require("discord.js");
const Config = require("./../../../config.json");
const db = require("megadb");
const Channel = new db.crearDB({ carpeta: "Database", nombre: "channel" });
const Postulants = new db.crearDB({ carpeta: "Database", nombre: "postulants" });
const { exportedMessages } = require('../commands/messageCreate.js');

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (!interaction.isModalSubmit()) return;

        const fields = interaction.fields.fields;

        const quest0Field = fields.get("quest0");
        const quest1Field = fields.get("quest1");
        const quest2Field = fields.get("quest2");
        const quest3Field = fields.get("quest3");
        const quest4Field = fields.get("quest4");

        const embed = new EmbedBuilder().setColor(Config.Color.Pink);

        switch (interaction.customId) {
            case "publicationEdit":
                embed
                    .setAuthor({
                        name: interaction.user.username,
                        iconURL: interaction.user.displayAvatarURL(),
                    })
                    .setThumbnail(interaction.user.displayAvatarURL()).setDescription(`
                    # 📋 **Oferta de Trabajo** 📋 #

                    **¿Qué tipo de servicios buscas?:**
                    ${quest0Field.value}

                    **Descripcion del Servicio:**
                    ${quest1Field.value}
                    
                    **¿Cuanto pagarias por el servicio?:**
                    ${quest2Field.value}

                    **Establece la fecha limite:**
                    ${quest3Field.value}
                `);

                const postulation = new ButtonBuilder()
                    .setCustomId("postulation")
                    .setLabel("Postularse")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("📋");
                
                const close = new ButtonBuilder()
                    .setCustomId("close")
                    .setLabel("Cerrar Oferta")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("❌");

                const row = new ActionRowBuilder().addComponents(postulation, close);

                client.channels.cache
                    .get(Config.Channels.Opportunities)
                    .send({ embeds: [embed], components: [row] });


                await interaction.guild.channels
                    .create({
                        name: `ofertas-${interaction.user.username}`,
                        type: ChannelType.GuildText,
                        parent: Config.Categorys.ChannelPrivate,
                        permissionOverwrites: [
                            {
                                id: interaction.user.id,
                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                            },
                            {
                                id: Config.EveryoneId,
                                deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                            },
                            {
                                id: Config.ClientID,
                                allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                            },
                        ],
                    })
                    .then(async (channel) => {
                        Channel.set(exportedMessages.opportunities, {ownerId: interaction.user.id, channelId: channel.id, messageId: exportedMessages.opportunities, active: true});

                        await interaction.reply({
                            content: "🔨 | Publicacion Creada",
                            ephemeral: true,
                        });
                    });

                break;
            case "postulationInfo":
                embed
                    .setTitle("Postulantes")
                    .setAuthor({
                        name: interaction.user.username,
                        iconURL: interaction.user.displayAvatarURL(),
                    }).setDescription(`
                    **Link del Portafolio:**
                    ${quest0Field.value}

                    **¿Estar acuerdo con el precio?:**
                    ${quest1Field.value}
                    
                    **¿Podras cumplir las espectativas?:**
                    ${quest2Field.value}

                    **¿Podras cumplir con la fecha limite?:**
                    ${quest3Field.value}

                    **¿Cuales son tus medios de contacto?:**
                    ${quest4Field.value}
                `);
                const PostInfo = await Channel.get(interaction.message.id)

                const accept = new ButtonBuilder()
                    .setCustomId("accept")
                    .setLabel("Aceptar")
                    .setStyle(ButtonStyle.Success)
                    .setEmoji("✅");
                
                const deny = new ButtonBuilder()
                    .setCustomId("deny")
                    .setLabel("Rechazar")
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji("❎");

                const row1 = new ActionRowBuilder().addComponents(accept, deny);

                client.channels.cache
                    .get(PostInfo.channelId)
                    .send({ embeds: [embed], components: [row1] });

                await Postulants.establecer(interaction.message.id, {users: interaction.user.id, messageId: exportedMessages.infoChannel});
                
                await interaction.reply({
                    content: "🔨 | Te postulaste correctamente",
                    ephemeral: true,
                });
                break;
        }
    },
};
