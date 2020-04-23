import RoastCache from "../cache/RoastCache";
import RoastWrapper from "../database/wrapper/RoastWrapper";
import BaseMiddleware from "./BaseMiddleware";
import Tools from "../tools";
import Roast from "../database/model/Roast";

export default class RoastMiddleware extends BaseMiddleware {
    readonly roastCache: RoastCache;
    readonly roastWrapper: RoastWrapper;
    cacheBuilt: boolean;

    constructor(guild: string) {
        super(guild)
        this.roastWrapper = new RoastWrapper(guild);
        this.roastCache = new RoastCache();
    }

    async buildCache(): Promise<void> {
        let accepted = await this.roastWrapper.getApprovedRoasts();
        let pending = await this.roastWrapper.getPendingRoasts();
        let declined = await this.roastWrapper.getDeclinedRoasts();
        this.roastCache.setCache(accepted, pending, declined);

        this.cacheBuilt = true;
    }

    get randomRoast(): string {
        let roasts = this.roastCache.acceptedRoasts;
        return roasts[Tools.getRandomNumber(0, roasts.length - 1)].roast
    }

    async addRoast(roast: Roast): Promise<void> {
        if (roast.accepted) this.roastCache.acceptedRoasts.push(roast);
        else this.roastCache.pendingRoasts.set(roast.message, roast);

        await this.roastWrapper.submitRoast(roast);
    }

    async approveRoast(message: string): Promise<void> {
        let approvedRoast = this.getPendingRoast(message);

        //Update Cache
        approvedRoast.pending = false;
        approvedRoast.accepted = true;
        approvedRoast.updatedTimestamp = new Date();
        approvedRoast.message = undefined;
        this.roastCache.pendingRoasts.delete(message);
        this.roastCache.acceptedRoasts.push(approvedRoast);
        //Update Cache

        await this.roastWrapper.approveRoast(approvedRoast); //Update database
    }

    async declineRoast(message: string): Promise<void> {
        let declinedRoast = this.getPendingRoast(message);

        //Update Cache
        declinedRoast.pending = false;
        declinedRoast.accepted = false;
        declinedRoast.updatedTimestamp = new Date();
        declinedRoast.message = undefined;
        this.roastCache.pendingRoasts.delete(message);
        this.roastCache.declinedRoasts.push(declinedRoast);
        //Update Cache

        await this.roastWrapper.declineRoast(declinedRoast); //Update database
    }

    isRoastPending(message: string): boolean {
        return this.roastCache.pendingRoasts.has(message);
    }

    isRoastApproved(message: string): boolean {
        return this.getApprovedRoast(message) !== undefined;
    }

    getPendingRoast(message: string): Roast {
        return this.roastCache.pendingRoasts.get(message);
    }

    getApprovedRoast(message: string): Roast {
        for (let i = 0; i !== this.roastCache.acceptedRoasts.length; i++) if (this.roastCache.acceptedRoasts[i].message === message) return this.roastCache.acceptedRoasts[i];
        return undefined;
    }
}