import BaseMiddleware from "./BaseMiddleware";
import LennyCache from "../cache/LennyCache";
import LennyWrapper from "../database/wrapper/LennyWrapper";

export default class LennyMiddleware extends BaseMiddleware{
    readonly lennyCache : LennyCache;
    readonly lennyWrapper : LennyWrapper;
    cacheBuilt : boolean;

    constructor() {
        super();
        this.lennyWrapper = new LennyWrapper();
        this.lennyCache = new LennyCache();
    }

    async buildCache() : Promise <void>{
        let accepted = await this.lennyWrapper.getApprovedLennys();
        let pending = await this.lennyWrapper.getPendingLennys();
        let declined = await this.lennyWrapper.getDeclinedLennys();
        this.lennyCache.setCache(accepted, pending, declined);

        this.cacheBuilt = true;
    }
}