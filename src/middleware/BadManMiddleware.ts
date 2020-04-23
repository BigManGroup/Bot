import BaseMiddleware from "./BaseMiddleware";
import BadManCache from "../cache/BadManCache";
import BadManWrapper from "../database/wrapper/BadManWrapper";
import BadMan from "../database/model/BadMan";
import {ObjectId} from 'mongodb'

export default class BadManMiddleware extends BaseMiddleware {
    readonly badManCache: BadManCache;
    readonly badManWrapper: BadManWrapper;
    cacheBuilt: boolean;

    constructor(guild: string) {
        super(guild);
        this.badManCache = new BadManCache();
        this.badManWrapper = new BadManWrapper(guild);
    }

    async buildCache(): Promise<void> {
        let badMan = await this.badManWrapper.getBadMan();
        let forgivenBadMan = await this.badManWrapper.getForgivenBadMan();

        this.badManCache.setCache(badMan, forgivenBadMan);
        this.cacheBuilt = true;
    }

    get amountSinners(): number {
        return this.badManCache.badMan.size;
    }

    get sinners(): BadMan[] {
        return Array.from(this.badManCache.badMan.values());
    }

    async addBadMan(user: string, guild: string): Promise<void> {
        let badMan = new BadMan(user, guild, new Date(), undefined, false);
        badMan._id = new ObjectId();

        this.badManCache.addBadMan(badMan);
        await this.badManWrapper.addBadMan(badMan);
    }

    async forgiveBadMan(user: string): Promise<void> {
        let badMan = this.badManCache.badMan.get(user);
        this.badManCache.forgiveBadMan(badMan);
        await this.badManWrapper.forgiveBadMan(badMan); //Update DB
    }

    isBadMan(user: string): boolean {
        return this.badManCache.badMan.has(user);
    }
}