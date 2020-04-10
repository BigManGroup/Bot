import * as Discord from 'discord.js';
import * as properties from '../resources/config.json'
import CommandHandler from "./commands/CommandHandler";
import Saving from "./database/DatabaseHandler";

const client = new Discord.Client();
const commandHandler = new CommandHandler(properties.bot.prefix);


const saving = new Saving(); //Initialize the database
let connectionEstablished : Boolean = false;

client.on("ready", async () => {
    //client.user.setPresence({ game: { name: 'with Big People!' }, status: 'online' }).catch(console.error); //Setting the bot status
    console.log("Bot has started");
});

client.on("message", async (message) => {
    if(!connectionEstablished) return;
    commandHandler.execute(message);
});

client.login(properties.bot.token).catch(error => console.log("Error logging in; " + error));