import BaseMiddleware from "./BaseMiddleware";
import BadManCache from "../cache/BadManCache";
import BadManWrapper from "../database/wrapper/BadManWrapper";
import BadMan from "../database/model/BadMan";
import {ObjectId} from 'mongodb'

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

    async addBadMan(guildId : string, userId : string) : Promise <void>{
        let badMan = new BadMan(guildId, userId, new Date(), undefined, false);
        badMan._id = new ObjectId();

        this.badManCache.addBadMan(badMan);
        await this.badManWrapper.addBadMan(badMan);
    }

    async forgiveBadMan(userId : string) : Promise <void>{
        let badMan = this.badManCache.badMan.get(userId);
        this.badManCache.forgiveBadMan(badMan);
        await this.badManWrapper.forgiveBadMan(badMan); //Update DB
    }

     isBadMan(guildId : string, userId : string) : boolean{
        if(this.badManCache.badMan.has(userId)){
            return  this.badManCache.badMan.get(userId).guildId === guildId;
        }
        return false;
    }
}