import BaseMiddleware from "./BaseMiddleware";
import GuildCache from "../cache/GuildCache";
import GuildWrapper from "../database/wrapper/GuildWrapper";

export default class GuildMiddleware extends BaseMiddleware {
    readonly guildCache: GuildCache;
    readonly guildWrapper: GuildWrapper;
    cacheBuilt: boolean;

    constructor(guild: string) {
        super(guild);

        this.guildCache = new GuildCache();
        this.guildWrapper = new GuildWrapper(guild);
    }

    async buildCache(): Promise<void> {
        this.guildCache.setCache(await this.guildWrapper.getGuild());
        this.cacheBuilt = true;
    }

    async setQuoteSubmissionChannel(channel: string): Promise<void> {
        this.guildCache.setQuoteSubmissionChannel(channel);
        await this.guildWrapper.setQuoteSubmissionChannel(channel);
    }

    async setQuoteChannel(channel: string): Promise<void> {
        this.guildCache.setQuoteChannel(channel);
        await this.guildWrapper.setQuoteChannel(channel);
    }

    async setRoastSubmissionChannel(channel: string): Promise<void> {
        this.guildCache.setRoastSubmissionChannel(channel);
        await this.guildWrapper.setRoastSubmissionChannel(channel);
    }

    async setInsultSubmissionChannel(channel: string): Promise<void> {
        this.guildCache.setInsultSubmissionChannel(channel);
        await this.guildWrapper.setInsultSubmissionChannel(channel);
    }

    async setBigmanRole(role: string): Promise<void> {
        this.guildCache.setBigmanRole(role);
        await this.guildWrapper.setBigmanRole(role);
    }

    get bigmanRole(): string {
        return this.guildCache.guild.bigmanRole;
    }
}