import BaseMiddleware from "./BaseMiddleware";
import {ObjectId} from "mongodb";
import Tools from "../tools";
import BigCache from "../cache/BigCache";
import BigWrapper from "../database/wrapper/BigWrapper";
import Big from "../database/model/Big";

export default class BigMiddleware extends BaseMiddleware {
    readonly bigCache: BigCache;
    readonly bigWrapper: BigWrapper;
    cacheBuilt: boolean;

    constructor(guild: string) {
        super(guild)
        this.bigCache = new BigCache();
        this.bigWrapper = new BigWrapper(guild);
    }

    async buildCache(): Promise<void> {
        this.bigCache.setCache(await this.bigWrapper.getBig());
        this.cacheBuilt = true
    }

    getBig(user: string, guild: string, isBigMan: boolean): Big {
        if (this.bigCache.generatedBig.has(user)) return this.bigCache.generatedBig.get(user);

        //Generate the big
        let randomNumber: number;
        if (isBigMan) randomNumber = Tools.getRandomNumber(80, 101);
        else randomNumber = Tools.getRandomNumber(0, 80);

        let newBig = new Big(user, guild, randomNumber, new Date());
        newBig._id = new ObjectId();
        //Generate the big

        this.bigCache.generatedBig.set(user, newBig);
        this.bigWrapper.addBig(newBig).catch(error => console.log(error));

        return newBig;
    }

    updateBigAmount(user: string, guild: string, isBigMan: boolean, newAmount: number): void {
        let big = this.getBig(user, guild, isBigMan); //Get the PeePee

        //New PeePee size
        big.amount = newAmount;
        this.bigWrapper.modifyBig(big).catch((error) => console.log(error));
        //New PeePee size
    }
}