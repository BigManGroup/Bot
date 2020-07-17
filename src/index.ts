import * as Discord from 'discord.js';
import {GuildMember, Message, MessageReaction, PartialMessage, User} from 'discord.js';
import * as properties from '../resources/config.json'
import Command from "./commands/model/Command";
import GuildHandler from "./GuildHandler";

const client = new Discord.Client({partials: ['MESSAGE', 'REACTION']});
let guildHandler: GuildHandler;

client.on("ready", async () => {
    Command.prefixes = properties.bot.prefixes;

    guildHandler = new GuildHandler(client); //Init the GuildHandler

    client.user.setPresence({activity: {name: 'with Big People!'}, status: 'online'}).catch(console.error); //Setting the bot status
    console.log("Bot has started");
});

client.on("message", async (message) => {
    let messageInterceptor = await guildHandler.getGuildMessageInterceptor(message.guild.id);
    let commandHandler = await guildHandler.getGuildCommandHandler(message.guild.id);
    if (message.author.bot || await messageInterceptor.intercepted(message, false)) return;
    commandHandler.execute(message);
});

client.on("messageUpdate", async (oldMessage: Message, newMessage: Message) => {
    if (newMessage.partial) newMessage = await newMessage.fetch();
    if (newMessage.author.bot) return;
    await (await guildHandler.getGuildMessageInterceptor(newMessage.guild.id)).intercepted(newMessage, true);
});

client.on("messageDelete", async (message: Message | PartialMessage) => {
    await (await guildHandler.getGuildVotingHandler(message.guild.id)).handleMessageDelete(await guildHandler.getGuildMiddleware(message.guild.id), message.id)
});


client.on('messageReactionAdd', async (messageReaction: MessageReaction, user: User) => {
    let votingHandler = await guildHandler.getGuildVotingHandler(messageReaction.message.guild.id);
    await votingHandler.handleVote(messageReaction, user);
})

client.on('messageReactionRemove', async (messageReaction: MessageReaction, user: User) => {
    let votingHandler = await guildHandler.getGuildVotingHandler(messageReaction.message.guild.id);
    await votingHandler.handleVote(messageReaction, user);
});

client.on('guildMemberAdd', async (member : GuildMember) => {
    let defaultRoleHandler = await guildHandler.getDefaultRoleHandler(member.guild.id);
    await defaultRoleHandler.onChannelJoin(member);
});

function startBot() {
    client.login(properties.bot.token).catch(error => console.log("Error logging in; " + error));
}

export {startBot}

/*
TODO refine middleware stuff and dynamic loading of cache
        * Unload cache if a guild is not used for x amount of time for the sake of RAM
        * Don't get all the cache at once, only get the needed cache and unload it when finished from it
TODO Disable the functionality of the bot if a used channel is not assigned
ASAP: TODO Have a way of loading general insults and lennys
ASAP: TODO onChannelDelete, make sure that it is not a channel used by the bot -> make a way to un-assign a channel as well
TODO Make sure only that guild's cache is loaded
 */