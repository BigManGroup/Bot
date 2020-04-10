import * as Discord from 'discord.js';
import * as properties from '../resources/config.json'
import CommandHandler from "./commands/CommandHandler";

const client = new Discord.Client();
const commandHandler = new CommandHandler(properties.bot.prefix);


client.on("ready", () => {
    //client.user.setPresence({ game: { name: 'with Big People!' }, status: 'online' }).catch(console.error); //Setting the bot status
    console.log("Bot has started");
});

client.on("message", async (message) => {
    commandHandler.execute(message);
});

client.login(properties.bot.token).catch(error => console.log("Error logging in; " + error));