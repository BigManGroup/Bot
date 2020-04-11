import * as Discord from 'discord.js';
import * as properties from '../resources/config.json'
import CommandHandler from "./commands/CommandHandler";
import Saving from "./database/DatabaseHandler";
import CentralizedMiddleware from "./middleware/CentralizedMiddleware";

const client = new Discord.Client();

let commandHandler : CommandHandler;
let centralizedMiddleware : CentralizedMiddleware;

client.on("ready", async () => {
    //Init the middleware
    centralizedMiddleware = new CentralizedMiddleware();
    await centralizedMiddleware.buildCache();
    //Init the roast middleware

    commandHandler = new CommandHandler(properties.bot.prefix, centralizedMiddleware);
    //client.user.setPresence({ game: { name: 'with Big People!' }, status: 'online' }).catch(console.error); //Setting the bot status
    console.log("Bot has started");
});

client.on("message", async (message) => {
    if(!Saving.initialized || !centralizedMiddleware.cacheBuilt()) return;
    commandHandler.execute(message);
});

client.login(properties.bot.token).catch(error => console.log("Error logging in; " + error));