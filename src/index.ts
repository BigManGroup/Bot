import * as Discord from 'discord.js';
import {Guild, GuildChannel, GuildMember, Message, MessageReaction, PartialMessage, Role, User} from 'discord.js';
import * as properties from '../resources/config.json'
import GuildHandler from "./GuildHandler";
import GuildTools from "./GuildTools";

const client = new Discord.Client({partials: ['MESSAGE', 'REACTION']});
let guildHandler: GuildHandler;

client.on("ready", async () => {
    guildHandler = new GuildHandler(client); //Init the GuildHandler
    await guildHandler.setDefaultGuild(properties["default-guild"]); //Load the default guild

    GuildTools.deleteGuild(client, guildHandler).catch(error => console.error("Unable to delete guild on start " + error));

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

client.on('guildMemberUpdate', async (oldMember : GuildMember, newMember : GuildMember) => {
    if(newMember.roles.cache.size < oldMember.roles.cache.size){
        let defaultRoleHandler = await guildHandler.getDefaultRoleHandler(newMember.guild.id);
        await defaultRoleHandler.onChannelJoin(newMember);
    }
})

client.on('channelDelete', async (channel: GuildChannel) => {
    if (channel.type !== "text") return;
    let channelHandler = await guildHandler.getChannelHandler(channel.guild.id);
    await channelHandler.onChannelDelete(channel.id);
});

client.on('roleDelete', async (deletedRole: Role) => {
    if (!guildHandler.guildRoleHandler.has(deletedRole.guild.id)) await guildHandler.getRoleHandler(deletedRole.guild.id);
    else await (await guildHandler.getRoleHandler(deletedRole.guild.id)).onRoleDelete(deletedRole);
});

client.on('guildDelete', async (guild: Guild) => {
    guildHandler.deleteGuild(guild.id).catch(error => console.log(error));
});

function startBot() {
    client.login(properties.bot.token).catch(error => console.log("Error logging in; " + error));
}

export {startBot, client, guildHandler}

/*
Code-review: Split the listeners to their respective handlers
Code-review: Add comments and proper documentation
 */