import BaseMiddleware from "./BaseMiddleware";
import BadManCache from "../cache/BadManCache";
import BadManWrapper from "../database/wrapper/BadManWrapper";

export default class BadManMiddleware extends BaseMiddleware{
    readonly badManCache : BadManCache;
    readonly badManWrapper : BadManWrapper;
    cacheBuilt : boolean;

    constructor() {
        super();
        this.badManCache = new BadManCache();
        this.badManWrapper = new BadManWrapper();
    }

    async buildCache(): Promise<void> {
        let badMan = await this.badManWrapper.getBadMan();
        let forgivenBadMan = await this.badManWrapper.getForgivenBadMan();

        this.badManCache.setCache(badMan, forgivenBadMan);
        this.cacheBuilt = true;
    }
}