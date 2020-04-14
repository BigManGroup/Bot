import * as Discord from 'discord.js';
import {Message, MessageReaction, PartialMessage, User} from 'discord.js';
import * as properties from '../resources/config.json'
import CommandHandler from "./commands/CommandHandler";
import Saving from "./database/DatabaseHandler";
import CentralizedMiddleware from "./middleware/CentralizedMiddleware";
import MessageInterceptor from "./commands/MessageInterceptor";
import VotingHandler from "./voting/VotingHandler";
import Command from "./commands/model/Command";

const client = new Discord.Client({partials: ['MESSAGE', 'REACTION']});

let commandHandler : CommandHandler;
let messageInterceptor : MessageInterceptor;
let centralizedMiddleware: CentralizedMiddleware;
let votingHandler: VotingHandler;

client.on("ready", async () => {
    Command.prefixes = properties.bot.prefixes;

    //Init the centralizedMiddleware
    centralizedMiddleware = new CentralizedMiddleware();
    await centralizedMiddleware.buildCache();
    //Init the centralizedMiddleware

    //Init the Centralized Middleware and Command Interceptor
    commandHandler = new CommandHandler(centralizedMiddleware);
    messageInterceptor = new MessageInterceptor(centralizedMiddleware);
    votingHandler = new VotingHandler(centralizedMiddleware);
    //Init the Centralized Middleware and Command Interceptor

    client.user.setPresence({activity: {name: 'with Big People!'}, status: 'online'}).catch(console.error); //Setting the bot status
    console.log("Bot has started");
});

client.on("message", async (message) => {
    if (message.author.bot || !Saving.initialized || !centralizedMiddleware.cacheBuilt() || await messageInterceptor.intercepted(message, false)) return;
    commandHandler.execute(message);
});

client.on("messageUpdate", async (oldMessage: Message, newMessage: Message) => {
    if (newMessage.partial) newMessage = await newMessage.fetch();
    if (newMessage.author.bot || !Saving.initialized || !centralizedMiddleware.cacheBuilt()) return;

    await messageInterceptor.intercepted(newMessage, true);
});

client.on("messageDelete", async (message: Message | PartialMessage) => {
    if (!Saving.initialized || !centralizedMiddleware.cacheBuilt()) return;

    if (centralizedMiddleware.quoteMiddleware.isQuoteApproved(message.id)) await centralizedMiddleware.quoteMiddleware.deleteApprovedQuote(message.id);
    else if (centralizedMiddleware.quoteMiddleware.isQuotePending(message.id)) await centralizedMiddleware.quoteMiddleware.deleteApprovedQuote(message.id);
    else if (centralizedMiddleware.roastMiddleware.isRoastPending(message.id)) await centralizedMiddleware.roastMiddleware.deleteApprovedRoast(message.id);
});

client.on('messageReactionAdd', async (messageReaction: MessageReaction, user: User) => {
    if (!Saving.initialized || !centralizedMiddleware.cacheBuilt()) return;
    await votingHandler.handleVote(messageReaction, user);
})

client.on('messageReactionRemove', async (messageReaction: MessageReaction, user: User) => {
    if (!Saving.initialized || !centralizedMiddleware.cacheBuilt()) return;
    await votingHandler.handleVote(messageReaction, user);
})

client.login(properties.bot.token).catch(error => console.log("Error logging in; " + error));