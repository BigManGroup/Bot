import * as Discord from 'discord.js';
import {
    DMChannel,
    Guild,
    GuildMember,
    Message,
    MessageReaction, NonThreadGuildBasedChannel,
    PartialMessage,
    Role,
    User
} from 'discord.js';
import * as properties from '../resources/config.json'
import GuildHandler from "./GuildHandler";
import GuildTools from "./GuildTools";

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES"], partials: ['MESSAGE', 'REACTION']});
let guildHandler: GuildHandler;

client.on("ready", async () => {
    try {
        guildHandler = new GuildHandler(client); //Init the GuildHandler
        await guildHandler.setDefaultGuild(properties["default-guild"]); //Load the default guild

        GuildTools.deleteGuild(client, guildHandler).catch(error => console.error("Unable to delete guild on start " + error));

        client.user.setPresence({activities: [{name: "with Big People!", url: "https://bigman.group/"}], status: 'online'}); //Setting the bot status
        console.log("Bot has started");
    } catch (e) {
        console.error("Error starting bot: " + e.stack);
    }
});

client.on("message", async (message) => {
    try {
        let messageInterceptor = await guildHandler.getGuildMessageInterceptor(message.guild.id);
        let commandHandler = await guildHandler.getGuildCommandHandler(message.guild.id);
        if (message.author.bot || await messageInterceptor.intercepted(message, false)) return;
        commandHandler.execute(message);
    } catch (e) {
        console.error("Error on message execution: " + e.stack);
    }
});

client.on("messageUpdate", async (oldMessage: Message, newMessage: Message) => {
    try {
        if (newMessage.partial) newMessage = await newMessage.fetch();
        if (newMessage.author.bot) return;
        await (await guildHandler.getGuildMessageInterceptor(newMessage.guild.id)).intercepted(newMessage, true);
    } catch (e) {
        console.error("Error on message update: " + e.stack);
    }
});

client.on("messageDelete", async (message: Message | PartialMessage) => {
    try {
        await (await guildHandler.getGuildVotingHandler(message.guild.id)).handleMessageDelete(await guildHandler.getGuildMiddleware(message.guild.id), message.id)
    } catch (e) {
        console.error("Error on message delete: " + e.stack);
    }
});


client.on('messageReactionAdd', async (messageReaction: MessageReaction, user: User) => {
    try {
        let votingHandler = await guildHandler.getGuildVotingHandler(messageReaction.message.guild.id);
        await votingHandler.handleVote(messageReaction, user);
    } catch (e) {
        console.error("Error on message reaction add: " + e.stack);
    }
})

client.on('messageReactionRemove', async (messageReaction: MessageReaction, user: User) => {
    try {
        let votingHandler = await guildHandler.getGuildVotingHandler(messageReaction.message.guild.id);
        await votingHandler.handleVote(messageReaction, user);
    } catch (e) {
        console.error("Error on message reaction remove: " + e.stack);
    }
});

client.on('guildMemberAdd', async (member : GuildMember) => {
    try {
        let defaultRoleHandler = await guildHandler.getDefaultRoleHandler(member.guild.id);
        await defaultRoleHandler.onChannelJoin(member);
    } catch (e) {
        console.error("Error on guild member add: " + e.stack);
    }
});

client.on('guildMemberUpdate', async (oldMember : GuildMember, newMember : GuildMember) => {
    try {
        if (newMember.roles.cache.size < oldMember.roles.cache.size) {
            let defaultRoleHandler = await guildHandler.getDefaultRoleHandler(newMember.guild.id);
            await defaultRoleHandler.onChannelJoin(newMember);
        }
    } catch (e) {
        console.error("Error on guild member update: " + e.stack);
    }
})

client.on('channelDelete', async (channel: DMChannel | NonThreadGuildBasedChannel) => {
    try {
        if (channel.type !== "GUILD_TEXT") return;
        let channelHandler = await guildHandler.getChannelHandler(channel.guild.id);
        await channelHandler.onChannelDelete(channel.id);
    } catch (e) {
        console.error("Error on channel delete: " + e.stack);
    }
});

client.on('roleDelete', async (deletedRole: Role) => {
    try {
        if (!guildHandler.guildRoleHandler.has(deletedRole.guild.id)) await guildHandler.getRoleHandler(deletedRole.guild.id);
        else await (await guildHandler.getRoleHandler(deletedRole.guild.id)).onRoleDelete(deletedRole);
    } catch (e) {
        console.error("Error on role delete: " + e.stack);
    }
});

client.on('guildDelete', async (guild: Guild) => {
    guildHandler.deleteGuild(guild.id).catch(error => console.log(error));
});

function startBot() {
    client.login(properties.bot.token).catch(error => console.log("Error logging in; " + error));
}

export {startBot, client}

/*
Code-review: Split the listeners to their respective handlers
Code-review: Add comments and proper documentation
 */