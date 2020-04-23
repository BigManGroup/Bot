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
}