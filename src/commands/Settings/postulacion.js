const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    PermissionsBitField
} = require("discord.js")
const Config = require('./../../..//config.json');

const builder = new SlashCommandBuilder()
    .setName('publication')	
    .setDescription('Creat el menu de publicaciones')

module.exports = {
    builder: builder.toJSON(),
    name: 'publication',
    async run(client, interaction, user) {

        var Permissions = interaction.member.permissions.has(PermissionsBitField.Flags.Administrator);
        if(!Permissions) return interaction.reply({
            content: "🔒 | No tienes permisos para ejecutar este comando.",
            ephemeral: true
        })

        const embed = new EmbedBuilder()
            .setTitle("📋 PUBLICACIONES 📋")
            .setDescription("Descripcion")
            .setColor(Config.Color.Pink)
            .addFields(
                {
                    name: "Para poder solicitar a un Editor",
                    value: "Selecciona a 💻 Editor"
                },
                {
                    name: "Para poder solicitar a un Diseñador",
                    value: "Selecciona a 🎨 Diseñador"
                },
                {
                    name: "Para poder solicitar a un Músico",
                    value: "Selecciona a 🎵 Músico"
                },
                {
                    name: "Para poder solicitar a un Programador",
                    value: "Selecciona a 🤖 Programador"
                }
            )

        const menuTickets = new StringSelectMenuBuilder()
            .setCustomId('publication')
            .setPlaceholder("Selecciona una opcion")
            .addOptions(
                {
                    label: "💻 Editor",
                    description: "Buscas un Editor, seleciona esta opcion",
                    value: "edit"
                },
                {
                    label: "🎨 Diseñador",
                    description: "Buscas un Diseñador, seleciona esta opcion",
                    value: "desing"
                }, 
                {
                    label: "🎵 Productor",
                    description: "Buscas un Productor, seleciona esta opcion",
                    value: "producer"
                },
                {
                    label: "🤖 Programador",
                    description: "Buscas un Programador, seleciona esta opcion",
                    value: "devs"
                }
            );

        const row = new ActionRowBuilder().addComponents(menuTickets);

        interaction.reply({
            embeds: [embed],
            components: [row],
        })
        
    }
}