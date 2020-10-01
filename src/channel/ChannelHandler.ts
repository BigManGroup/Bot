import CentralizedMiddleware from "../middleware/CentralizedMiddleware";
import {Guild} from "discord.js";

export default class ChannelHandler{
    readonly centralizedMiddleware : CentralizedMiddleware;

    constructor(centralizedMiddleware : CentralizedMiddleware) {
        this.centralizedMiddleware = centralizedMiddleware;
    }

    async onChannelDelete(guildChannel : string){
        if (this.centralizedMiddleware.guildMiddleware.insultSubmission === guildChannel) {
            await this.centralizedMiddleware.guildMiddleware.setInsultSubmissionChannel(undefined);
            let insults = Array.from(this.centralizedMiddleware.insultMiddleware.insultCache.pendingInsult.values());
            for (let i = 0; i !== insults.length; i++) await this.centralizedMiddleware.insultMiddleware.declineInsult(insults[i].message);
        }

        if (this.centralizedMiddleware.guildMiddleware.roastSubmission === guildChannel) {
            await this.centralizedMiddleware.guildMiddleware.setRoastSubmissionChannel(undefined);

            let roasts = Array.from(this.centralizedMiddleware.roastMiddleware.roastCache.pendingRoasts.values());
            for (let i = 0; i !== roasts.length; i++) await this.centralizedMiddleware.roastMiddleware.declineRoast(roasts[i].message);
        }

        if (this.centralizedMiddleware.guildMiddleware.quoteSubmission === guildChannel) {
            await this.centralizedMiddleware.guildMiddleware.setQuoteSubmissionChannel(undefined);

            let quotes = Array.from(this.centralizedMiddleware.quoteMiddleware.quoteCache.pendingQuotes.values());
            for (let i = 0; i !== quotes.length; i++) await this.centralizedMiddleware.quoteMiddleware.declineQuote(quotes[i].message);
        }

        if (this.centralizedMiddleware.guildMiddleware.quoteChannel === guildChannel) await this.centralizedMiddleware.guildMiddleware.setQuoteSubmissionChannel(undefined);
    }

    async onCacheLoad(guild : Guild){
        if (guild.channels.cache.get(this.centralizedMiddleware.guildMiddleware.insultSubmission) === undefined) await this.centralizedMiddleware.guildMiddleware.setInsultSubmissionChannel(undefined);
        if (guild.channels.cache.get(this.centralizedMiddleware.guildMiddleware.roastSubmission) === undefined) await this.centralizedMiddleware.guildMiddleware.setRoastSubmissionChannel(undefined);
        if (guild.channels.cache.get(this.centralizedMiddleware.guildMiddleware.quoteSubmission) === undefined) await this.centralizedMiddleware.guildMiddleware.setQuoteSubmissionChannel(undefined);
        if (guild.channels.cache.get(this.centralizedMiddleware.guildMiddleware.quoteChannel) === undefined) await this.centralizedMiddleware.guildMiddleware.setQuoteChannel(undefined);
    }
}