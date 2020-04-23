import BaseMiddleware from "./BaseMiddleware";
import Tools from "../tools";
import InsultCache from "../cache/InsultCache";
import InsultWrapper from "../database/wrapper/InsultWrapper";
import Insult from "../database/model/Insult";

export default class InsultMiddleware extends BaseMiddleware {
    readonly insultCache: InsultCache;
    readonly insultWrapper: InsultWrapper;
    cacheBuilt: boolean;

    constructor(guild: string) {
        super(guild);
        this.insultWrapper = new InsultWrapper(guild);
        this.insultCache = new InsultCache();
    }

    get randomInsult(): string {
        let insults = this.insultCache.acceptedInsult;
        return insults[Tools.getRandomNumber(0, insults.length - 1)].insult
    }

    async buildCache(): Promise<void> {
        let accepted = await this.insultWrapper.getApprovedInsult();
        let pending = await this.insultWrapper.getPendingInsults();
        let declined = await this.insultWrapper.getDeclinedInsults();
        this.insultCache.setCache(accepted, pending, declined);

        this.cacheBuilt = true;
    }

    async addInsult(insult: Insult): Promise<void> {
        if (insult.accepted) this.insultCache.acceptedInsult.push(insult);
        else this.insultCache.pendingInsult.set(insult.message, insult);

        await this.insultWrapper.submitInsult(insult);
    }

    async approveInsult(message: string): Promise<void> {
        let approvedInsult = this.getPendingInsult(message);

        //Update Cache
        approvedInsult.pending = false;
        approvedInsult.accepted = true;
        approvedInsult.updatedTimestamp = new Date();
        approvedInsult.message = undefined;
        this.insultCache.pendingInsult.delete(message);
        this.insultCache.acceptedInsult.push(approvedInsult);
        //Update Cache

        await this.insultWrapper.approveInsult(approvedInsult); //Update database
    }

    async deleteApprovedInsult(message: string): Promise<void> {
        let deletedInsult: Insult;
        let index: number;

        for (let i = 0; i !== this.insultCache.acceptedInsult.length; i++) {
            if (this.insultCache.acceptedInsult[i].message === message) {
                deletedInsult = this.insultCache.acceptedInsult[i];
                index = i;
                break;
            }
        }

        //Update Cache
        deletedInsult.pending = false;
        deletedInsult.accepted = false;
        deletedInsult.updatedTimestamp = new Date();
        deletedInsult.message = undefined;
        this.insultCache.acceptedInsult.splice(index, 1);
        this.insultCache.declinedInsult.push(deletedInsult);
        //Update Cache

        await this.insultWrapper.declineInsult(deletedInsult); //Update database
    }

    async declineInsult(message: string): Promise<void> {
        let declinedInsult = this.getPendingInsult(message);

        //Update Cache
        declinedInsult.pending = false;
        declinedInsult.accepted = false;
        declinedInsult.updatedTimestamp = new Date();
        declinedInsult.message = undefined;
        this.insultCache.pendingInsult.delete(message);
        this.insultCache.declinedInsult.push(declinedInsult);
        //Update Cache

        await this.insultWrapper.declineInsult(declinedInsult); //Update database
    }

    isInsultPending(message: string): boolean {
        return this.insultCache.pendingInsult.has(message);
    }

    isInsultApproved(message: string): boolean {
        return this.getApprovedInsult(message) !== undefined;
    }

    getPendingInsult(message: string): Insult {
        return this.insultCache.pendingInsult.get(message);
    }

    getApprovedInsult(message: string): Insult {
        for (let i = 0; i !== this.insultCache.acceptedInsult.length; i++) if (this.insultCache.acceptedInsult[i].message === message) return this.insultCache.acceptedInsult[i];
        return undefined;
    }
}