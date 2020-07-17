import CentralizedMiddleware from "../middleware/CentralizedMiddleware";
import {Guild} from "discord.js";

export default class ChannelHandler{
    readonly centralizedMiddleware : CentralizedMiddleware;

    constructor(centralizedMiddleware : CentralizedMiddleware) {
        this.centralizedMiddleware = centralizedMiddleware;
    }

    async onChannelDelete(guildChannel : string){
        if (this.centralizedMiddleware.guildMiddleware.insultSubmission === guildChannel) await this.centralizedMiddleware.guildMiddleware.setInsultSubmissionChannel(undefined);
        if (this.centralizedMiddleware.guildMiddleware.roastSubmission === guildChannel) await this.centralizedMiddleware.guildMiddleware.setRoastSubmissionChannel(undefined);
        if (this.centralizedMiddleware.guildMiddleware.quoteSubmission === guildChannel) await this.centralizedMiddleware.guildMiddleware.setQuoteSubmissionChannel(undefined);
        if (this.centralizedMiddleware.guildMiddleware.quoteChannel === guildChannel) await this.centralizedMiddleware.guildMiddleware.setQuoteSubmissionChannel(undefined);    }

    async onCacheLoad(guild : Guild){
        if (guild.channels.cache.get(this.centralizedMiddleware.guildMiddleware.insultSubmission) === undefined) await this.centralizedMiddleware.guildMiddleware.setInsultSubmissionChannel(undefined);
        if (guild.channels.cache.get(this.centralizedMiddleware.guildMiddleware.roastSubmission) === undefined) await this.centralizedMiddleware.guildMiddleware.setRoastSubmissionChannel(undefined);
        if (guild.channels.cache.get(this.centralizedMiddleware.guildMiddleware.quoteSubmission) === undefined) await this.centralizedMiddleware.guildMiddleware.setQuoteSubmissionChannel(undefined);
        if (guild.channels.cache.get(this.centralizedMiddleware.guildMiddleware.quoteChannel) === undefined) await this.centralizedMiddleware.guildMiddleware.setQuoteChannel(undefined);
    }
}