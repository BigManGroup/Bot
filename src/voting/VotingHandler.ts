import CentralizedMiddleware from "../middleware/CentralizedMiddleware";
import {MessageReaction, User} from "discord.js";
import QuoteVoteHandler from "./QuoteVoteHandler";

export default class VotingHandler {
    static approveReaction: string = "✅";
    static declineReaction: string = "❎";

    centralizedMiddleware: CentralizedMiddleware;

    quoteVoteHandler: QuoteVoteHandler;

    constructor(centralizedMiddleware: CentralizedMiddleware) {
        this.centralizedMiddleware = centralizedMiddleware;

        this.quoteVoteHandler = new QuoteVoteHandler(centralizedMiddleware);
    }

    async handleVote(messageReaction: MessageReaction, user: User): Promise<void> {
        let isReactionPending = this.isReactionPending(messageReaction.message.id);
        if (!isReactionPending.pending) return;

        if (isReactionPending.type === "quote") await this.quoteVoteHandler.handle(messageReaction, user)
    }

    private isReactionPending(messageId: string): PendingReaction {
        if (this.centralizedMiddleware.quoteMiddleware.isQuotePending(messageId)) return new PendingReaction(true, "quote");
        return new PendingReaction(false, undefined);
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