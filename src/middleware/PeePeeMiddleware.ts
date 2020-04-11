import PeePeeCache from "../cache/PeePeeCache";
import BaseMiddleware from "./BaseMiddleware";
import PeePeeWrapper from "../database/wrapper/PeePeeWrapper";
import PeePee from "../database/model/PeePee";
import {ObjectId} from "mongodb";
import Tools from "../tools";

export default class PeePeeMiddleware extends BaseMiddleware{
    readonly peePeeCache : PeePeeCache;
    readonly peePeeWrapper : PeePeeWrapper;
    cacheBuilt : boolean;

    constructor() {
        super();
        this.peePeeCache = new PeePeeCache();
        this.peePeeWrapper = new PeePeeWrapper();
    }

    async buildCache(): Promise<void> {
        this.peePeeCache.setCache(await this.peePeeWrapper.getPeePee());
        this.cacheBuilt = true
    }

    getPeePee(userId : string, isBigMan : boolean) : PeePee {
        if (this.peePeeCache.generatedPeePee.has(userId)) return this.peePeeCache.generatedPeePee.get(userId);

        //Generate the peepee
        let randomNumber: number;
        if (isBigMan) randomNumber = Tools.getRandomNumber(1, 10);
        else randomNumber = Tools.getRandomNumber(1, 5);

        let peePee = new PeePee(userId, randomNumber, new Date());
        peePee._id = new ObjectId();
        //Generate the peepee

        this.peePeeCache.generatedPeePee.set(userId, peePee);
        this.peePeeWrapper.addPeePee(peePee).catch(error => error);

        return peePee;
    }
}