import CentralizedMiddleware from "../middleware/CentralizedMiddleware";
import {MessageReaction, User} from "discord.js";
import QuoteVoteHandler from "./QuoteVoteHandler";
import RoastVoteHandler from "./RoastVoteHandler";
import InsultVoteHandler from "./InsultVoteHandler";
import {CronJob} from "cron";

export default class VotingHandler {
    static approveReaction: string = "✅";
    static declineReaction: string = "❎";

    centralizedMiddleware: CentralizedMiddleware;

    quoteVoteHandler: QuoteVoteHandler;
    roastVoteHandler: RoastVoteHandler;
    insultVoteHandler: InsultVoteHandler;

    constructor(centralizedMiddleware: CentralizedMiddleware) {
        this.centralizedMiddleware = centralizedMiddleware;

        this.quoteVoteHandler = new QuoteVoteHandler(centralizedMiddleware);
        this.roastVoteHandler = new RoastVoteHandler(centralizedMiddleware);
        this.insultVoteHandler = new InsultVoteHandler(centralizedMiddleware);
        new CronJob('0 0 * * *', this.submissionTimeout).start();
    }

    async handleVote(messageReaction: MessageReaction, user: User): Promise<void> {
        let isReactionPending = this.isReactionPending(messageReaction.message.id);
        if (!isReactionPending.pending) return;

        if (isReactionPending.type === "quote") await this.quoteVoteHandler.handleVote(messageReaction, user);
        else if (isReactionPending.type === "roast") await this.roastVoteHandler.handleVote(messageReaction, user);
        else if (isReactionPending.type === "insult") await this.insultVoteHandler.handleVote(messageReaction, user);
    }

    private isReactionPending(messageId: string): PendingReaction {
        if (this.centralizedMiddleware.quoteMiddleware.isQuotePending(messageId)) return new PendingReaction(true, "quote");
        else if (this.centralizedMiddleware.roastMiddleware.isRoastPending(messageId)) return new PendingReaction(true, "roast")
        else if (this.centralizedMiddleware.insultMiddleware.isInsultPending(messageId)) return new PendingReaction(true, "insult")
        return new PendingReaction(false, undefined);
    }

    async handleMessageDelete(centralizedMiddleware: CentralizedMiddleware, message: string) {
        if (centralizedMiddleware.quoteMiddleware.isQuoteApproved(message)) await centralizedMiddleware.quoteMiddleware.deleteApprovedQuote(message);
        else if (centralizedMiddleware.quoteMiddleware.isQuotePending(message)) await centralizedMiddleware.quoteMiddleware.declineQuote(message);
        else if (centralizedMiddleware.roastMiddleware.isRoastPending(message)) await centralizedMiddleware.roastMiddleware.declineRoast(message);
        else if (centralizedMiddleware.insultMiddleware.isInsultPending(message)) await centralizedMiddleware.insultMiddleware.declineInsult(message);
    }

    static isDateOneWeekOld(currentDate: Date): boolean {
        let oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return currentDate.getTime() - oneWeekAgo.getTime() <= 0;
    }

    submissionTimeout() {
        console.info("Running Submission Timeout");
        this.centralizedMiddleware.quoteMiddleware.quoteCache.pendingQuotes.forEach(async quote => {
            if (VotingHandler.isDateOneWeekOld(quote.submittedTimestamp)) await this.centralizedMiddleware.quoteMiddleware.declineQuote(quote.message);
        });

        this.centralizedMiddleware.roastMiddleware.roastCache.pendingRoasts.forEach(async roast => {
            if (VotingHandler.isDateOneWeekOld(roast.submittedTimestamp)) await this.centralizedMiddleware.roastMiddleware.declineRoast(roast.message);
        });

        this.centralizedMiddleware.insultMiddleware.insultCache.pendingInsult.forEach(async insult => {
            if (VotingHandler.isDateOneWeekOld(insult.submittedTimestamp)) await this.centralizedMiddleware.insultMiddleware.declineInsult(insult.message);
        });
    }
}

class PendingReaction {
    readonly pending: boolean;
    readonly type: string;


    constructor(pending: boolean, type: string) {
        this.pending = pending;
        this.type = type;
    }
}