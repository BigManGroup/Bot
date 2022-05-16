import {Client, GatewayIntentBits, Partials} from "discord.js";
import CommandRunner from "./commands/CommandRunner";

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent], partials: [Partials.Reaction, Partials.Message]});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
    if(message.partial) await message.fetch(); //If the message is a partial, fetch the message

    CommandRunner.runCommand(message).catch(error => console.log("Failed to run command due to error: " + error));
})

export default async function start(){
    await client.login(process.env["BOT_TOKEN"]).catch(error => console.dir("Unable to start with error: " + error, {depth: null}))
}
