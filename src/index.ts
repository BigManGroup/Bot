import * as Discord from 'discord.js';
import * as properties from '../resources/config.json'
import CommandHandler from "./commands/CommandHandler";
import Saving from "./database/DatabaseHandler";
import CentralizedMiddleware from "./middleware/CentralizedMiddleware";
import MessageInterceptor from "./commands/MessageInterceptor";

const client = new Discord.Client();

let commandHandler : CommandHandler;
let messageInterceptor : MessageInterceptor;
let centralizedMiddleware : CentralizedMiddleware;

client.on("ready", async () => {
    //Init the middleware
    centralizedMiddleware = new CentralizedMiddleware();
    await centralizedMiddleware.buildCache();
    //Init the middleware

    //Init the Centralized Middleware and Command Interceptor
    commandHandler = new CommandHandler(properties.bot.prefix, centralizedMiddleware);
    messageInterceptor = new MessageInterceptor(centralizedMiddleware);
    //Init the Centralized Middleware and Command Interceptor

    client.user.setPresence({ activity: { name: 'with Big People!' }, status: 'online' }).catch(console.error); //Setting the bot status
    console.log("Bot has started");
});

client.on("message", async (message) => {
    if(message.author.bot || !Saving.initialized || !centralizedMiddleware.cacheBuilt() || await messageInterceptor.intercepted(message)) return;
    commandHandler.execute(message);
});

client.login(properties.bot.token).catch(error => console.log("Error logging in; " + error));