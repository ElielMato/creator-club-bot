const { InteractionType } = require("discord.js")
const Config = require('../../../config.json')
const db = require("megadb");
const Channel = new db.crearDB({ carpeta: "Database", nombre: "channel" });
const exportedMessages  = {};

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        
        async function verificarChannelId(channelId) {
            const datos = await Channel.values();
            
            for (let i = 0; i < datos.length; i++) {
                if (datos[i].channelId === channelId) {
                    return true;
                }
            }
            return false;
        }
        
        const channelId = message.channel.id;
        const InfoChannel = await verificarChannelId(channelId);

        if (message.channel.id === Config.Channels.Opportunities) {
            exportedMessages.opportunities = message.id;
        } else if (InfoChannel === true) {
            console.log(message.id)
            exportedMessages.infoChannel = message.id;
        }
        
    }
}

module.exports.exportedMessages = exportedMessages;