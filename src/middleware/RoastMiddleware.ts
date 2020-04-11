import RoastCache from "../cache/RoastCache";
import RoastWrapper from "../database/wrapper/RoastWrapper";
import BaseMiddleware from "./BaseMiddleware";

export default class RoastMiddleware extends BaseMiddleware{
    readonly roastCache : RoastCache;
    readonly roastWrapper : RoastWrapper;
    static cacheBuild : Boolean;

    constructor() {
        super();
        this.roastWrapper = new RoastWrapper();
        this.roastCache = new RoastCache();
    }

    async buildCache() : Promise <void>{
        let accepted = await this.roastWrapper.getApprovedRoasts();
        let pending = await this.roastWrapper.getPendingRoasts();
        let declined = await this.roastWrapper.getDeclinedRoasts();
        this.roastCache.setCache(accepted, pending, declined);

        RoastMiddleware.cacheBuild = true;
    }
}