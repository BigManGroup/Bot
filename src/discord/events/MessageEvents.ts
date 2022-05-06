import {client} from "../app";
import {Message, MessageReaction, PartialMessage, User} from "discord.js";

/*
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
 */