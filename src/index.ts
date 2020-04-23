import * as Discord from 'discord.js';
import {Message, MessageReaction, PartialMessage, User} from 'discord.js';
import * as properties from '../resources/config.json'
import Saving from "./database/DatabaseHandler";
import Command from "./commands/model/Command";
import MiddlewareHandler from "./middleware/MiddlewareHandler";

const client = new Discord.Client({partials: ['MESSAGE', 'REACTION']});
let middlewareHandler: MiddlewareHandler;

client.on("ready", async () => {
    Command.prefixes = properties.bot.prefixes;

    middlewareHandler = new MiddlewareHandler(); //Init the guild MiddlewareHandler

    client.user.setPresence({activity: {name: 'with Big People!'}, status: 'online'}).catch(console.error); //Setting the bot status
    console.log("Bot has started");
});

client.on("message", async (message) => {
    let messageInterceptor = await middlewareHandler.getGuildMessageInterceptor(message.guild.id);
    let commandHandler = await middlewareHandler.getGuildCommandHandler(message.guild.id);
    if (message.author.bot || !Saving.initialized || await messageInterceptor.intercepted(message, false)) return;
    commandHandler.execute(message);
});

client.on("messageUpdate", async (oldMessage: Message, newMessage: Message) => {
    if (newMessage.partial) newMessage = await newMessage.fetch();
    if (newMessage.author.bot || !Saving.initialized) return;
    let messageInterceptor = await middlewareHandler.getGuildMessageInterceptor(newMessage.guild.id);

    await messageInterceptor.intercepted(newMessage, true);
});

client.on("messageDelete", async (message: Message | PartialMessage) => {
    if (!Saving.initialized) return;
    let guildMiddleware = await middlewareHandler.getGuildMiddleware(message.guild.id);

    if (guildMiddleware.quoteMiddleware.isQuoteApproved(message.id)) await guildMiddleware.quoteMiddleware.deleteApprovedQuote(message.id);
    else if (guildMiddleware.quoteMiddleware.isQuotePending(message.id)) await guildMiddleware.quoteMiddleware.declineQuote(message.id);
    else if (guildMiddleware.roastMiddleware.isRoastPending(message.id)) await guildMiddleware.roastMiddleware.declineRoast(message.id);
    else if (guildMiddleware.insultMiddleware.isInsultPending(message.id)) await guildMiddleware.insultMiddleware.declineInsult(message.id);
}); //todo move these to VotingHandler


client.on('messageReactionAdd', async (messageReaction: MessageReaction, user: User) => {
    if (!Saving.initialized) return;
    let votingHandler = await middlewareHandler.getGuildVotingHandler(messageReaction.message.guild.id);
    await votingHandler.handleVote(messageReaction, user);
})

client.on('messageReactionRemove', async (messageReaction: MessageReaction, user: User) => {
    if (!Saving.initialized) return;
    let votingHandler = await middlewareHandler.getGuildVotingHandler(messageReaction.message.guild.id);
    await votingHandler.handleVote(messageReaction, user);
})

client.login(properties.bot.token).catch(error => console.log("Error logging in; " + error));


/*
ASAP: TODO refine the saving structure and stop using the static method in such a bad way
TODO refine middleware stuff and dynamic loading of cache
        * Unload cache if a guild is not used for x amount of time for the sake of RAM
        * Don't get all the cache at once, only get the needed cache and unload it when finished from it
TODO Disable the functionality of the bot if a used channel is not assigned -> Have a way of loading general insults and lennys
TODO onChannelDelete, make sure that it is not a channel used by the bot

 */