import CentralizedMiddleware from "../middleware/CentralizedMiddleware";
import {Guild, Message, MessageEmbed, MessageReaction, PartialMessage, TextChannel, User} from "discord.js";
import VotingHandler from "./VotingHandler";
import Tools from "../tools";

export default class QuoteVoteHandler {
    static quoteSubmissionsChannel: string = "698923581832298617";
    static quoteChannel: string = "669245652664057867";

    centralizedMiddleware: CentralizedMiddleware;

    constructor(centralizedMiddleware: CentralizedMiddleware) {
        this.centralizedMiddleware = centralizedMiddleware;
    }

    async handle(messageReaction: MessageReaction, user: User): Promise<void> {
        let message: Message;
        if (messageReaction.message.partial) message = await messageReaction.message.fetch(); //if the message is not in cache load it
        else message = messageReaction.message; //if the message is in cache, just load the one in cache

        let likedUsers = (await message.reactions.resolve(VotingHandler.approveReaction).users.fetch()).array(); //Get the amount of liked users
        let dislikedUsers = (await message.reactions.resolve(VotingHandler.declineReaction).users.fetch()).array(); //Get the amount of disliked users

        let guild = await user.client.guilds.resolve(Tools.bigmanGuild).fetch(); //Get the guild (load to cache)
        let currentQuote = this.centralizedMiddleware.quoteMiddleware.getPendingQuote(message.id);

        let deleteQuote = false;
        let valid: number = 0;
        for (let i = 0; i !== likedUsers.length; i++) if (Tools.isBigMan(guild, likedUsers[i])) valid++; //If they are bigman, vote is valid
        for (let i = 0; i !== dislikedUsers.length; i++) {
            if (Tools.isBigMan(guild, dislikedUsers[i])) valid--; //If they are bigman, vote is valid
            if (dislikedUsers[i].id === currentQuote.user) deleteQuote = true; //If the user that submitted presses x, the quote is deleted
        }

        if (valid >= 3) await this.approve(message, guild);
        else if (valid <= -3 || deleteQuote) await this.decline(message);
    }

    private async approve(message: Message, guild: Guild): Promise<void> {
        await this.centralizedMiddleware.quoteMiddleware.approveQuote(message.id);
        let quote = this.centralizedMiddleware.quoteMiddleware.getApprovedQuote(message.id);
        await message.delete();

        let embed = new MessageEmbed().setAuthor(`${guild.members.cache.get(quote.quoteUser).displayName} - ${quote.quoteYear}`, guild.members.cache.get(quote.quoteUser).user.avatarURL()).setTitle(quote.quoteText).setFooter(`Submitted by ${guild.members.cache.get(quote.user).displayName}`);
        await (<TextChannel>(await guild.channels.resolve(QuoteVoteHandler.quoteChannel))).send(embed);
    }

    private async decline(message: Message): Promise<void> {
        await this.centralizedMiddleware.quoteMiddleware.declineQuote(message.id);
        await message.delete();
    }

    async declineWithoutDeletion(message: Message | PartialMessage): Promise<void> {
        await this.centralizedMiddleware.quoteMiddleware.declineQuote(message.id);
    }
}