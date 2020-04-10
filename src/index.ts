import * as Discord from 'discord.js';
import * as properties from '../resources/config.json'
import CommandHandler from "./commands/CommandHandler";
import Saving from "./database/DatabaseHandler";

const client = new Discord.Client();
const commandHandler = new CommandHandler(properties.bot.prefix);


let saving : Saving;
let connectionEstablished : Boolean = false;

//TODO FIX: If server doesn't respond fast Saving is created before pool is built, resulting in error
client.on("ready", async () => {
    saving = new Saving();
    //client.user.setPresence({ game: { name: 'with Big People!' }, status: 'online' }).catch(console.error); //Setting the bot status
    console.log("Bot has started");
});

client.on("message", async (message) => {
    if(!connectionEstablished) return;
    commandHandler.execute(message);
});

client.login(properties.bot.token).catch(error => console.log("Error logging in; " + error));