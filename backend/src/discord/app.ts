import {Client, GatewayIntentBits, Partials} from "discord.js";

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions], partials: [Partials.Reaction, Partials.Message]});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
    if(message.partial) await message.fetch(); //If the message is a partial, fetch the message

})

export default async function start(){
    await client.login(process.env["BOT_TOKEN"]).catch(error => console.dir("Unable to start with error: " + error, {depth: null}))
}
