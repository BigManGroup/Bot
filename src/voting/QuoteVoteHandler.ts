import CentralizedMiddleware from "../middleware/CentralizedMiddleware";
import {Guild, Message, MessageEmbed, TextChannel} from "discord.js";
import BaseVoteHandler from "./BaseVoteHandler";

export default class QuoteVoteHandler extends BaseVoteHandler {
    centralizedMiddleware: CentralizedMiddleware;

    constructor(centralizedMiddleware: CentralizedMiddleware) {
        super(centralizedMiddleware);
    }

    protected getPostAuthor(message: Message): string {
        return this.centralizedMiddleware.quoteMiddleware.getPendingQuote(message.id).user;
    }

    protected async approve(message: Message, guild: Guild): Promise<void> {
        await this.centralizedMiddleware.quoteMiddleware.approveQuote(message.id);
        let quote = this.centralizedMiddleware.quoteMiddleware.getApprovedQuote(message.id);
        await message.delete();

        let embed = new MessageEmbed().setAuthor(`${guild.members.cache.get(quote.quoteUser).displayName} - ${quote.quoteYear}`, guild.members.cache.get(quote.quoteUser).user.avatarURL()).setTitle(quote.quoteText).setFooter(`Submitted by ${guild.members.cache.get(quote.user).displayName}`);
        await (<TextChannel>(await guild.channels.resolve(this.centralizedMiddleware.guildMiddleware.quoteChannel))).send(embed);
    }

    protected async decline(message: Message): Promise<void> {
        await this.centralizedMiddleware.quoteMiddleware.declineQuote(message.id);
        await message.delete();
    }
}