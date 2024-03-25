const {
	Client,
	GatewayIntentBits,
	Partials,
	Collection,
} = require("discord.js")

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.GuildScheduledEvents,
	],
	partials: [
		Partials.User,
		Partials.Message,
		Partials.Channel,
		Partials.Reaction,
		Partials.GuildMember,
		Partials.GuildScheduledEvent,
		Partials.ThreadMember,
	],
})
const fs = require('fs')
require('dotenv').config()

const { slash } = require(`${__dirname}/src/utils/handler/commands.js`)
const { events } = require(`${__dirname}/src/utils/handler/events.js`)

events(fs, client)
slash(fs, client, Collection)

//MONGODB
// const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGO, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// }).then(db => console.log('|-------------------|\n|Conectado a MongoDB|\n|-------------------|')).catch((e) => {
// 		console.log(e);
// });

client.login(process.env.TOKEN)