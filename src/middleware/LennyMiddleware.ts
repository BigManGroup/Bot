import BaseMiddleware from "./BaseMiddleware";
import LennyCache from "../cache/LennyCache";
import LennyWrapper from "../database/wrapper/LennyWrapper";
import Tools from "../tools";
import GuildHandler from "../GuildHandler";

export default class LennyMiddleware extends BaseMiddleware {
    readonly lennyCache: LennyCache;
    readonly lennyWrapper: LennyWrapper;
    cacheBuilt: boolean;

    constructor(guild: string) {
        super(guild)
        this.lennyWrapper = new LennyWrapper(guild);
        this.lennyCache = new LennyCache();
    }

    async buildCache(): Promise<void> {
        let accepted = await this.lennyWrapper.getApprovedLennys();
        let pending = await this.lennyWrapper.getPendingLennys();
        let declined = await this.lennyWrapper.getDeclinedLennys();
        this.lennyCache.setCache(accepted, pending, declined);

        this.cacheBuilt = true;
    }

    get randomLenny() : string {
        let lenny = this.lennyCache.acceptedLennys;
        if (lenny.length > 0) return lenny[Tools.getRandomNumber(0, lenny.length)].lenny;
        return GuildHandler.defaultGuild.lennyMiddleware.randomLenny;
    }
}