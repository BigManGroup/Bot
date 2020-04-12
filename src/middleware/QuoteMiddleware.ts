import BaseMiddleware from "./BaseMiddleware";
import QuoteCache from "../cache/QuoteCache";
import QuoteWrapper from "../database/wrapper/QuoteWrapper";
import Quote from "../database/model/Quote";

export default class QuoteMiddleware extends BaseMiddleware{
    quoteCache : QuoteCache;
    quoteWrapper : QuoteWrapper;
    cacheBuilt: boolean;

    constructor() {
        super();

        this.quoteCache = new QuoteCache();
        this.quoteWrapper = new QuoteWrapper();
    }

    async buildCache(): Promise<void> {
        let approvedQuotes = await this.quoteWrapper.getApprovedQuotes();
        let pendingQuotes = await this.quoteWrapper.getPendingQuotes();
        let declinedQuotes = await this.quoteWrapper.getDeclinedQuotes();
        this.quoteCache.setCache(approvedQuotes, pendingQuotes, declinedQuotes);

        this.cacheBuilt = true;
    }

    async addQuote(quote : Quote) : Promise <void>{
        if(quote.accepted) this.quoteCache.approvedQuotes.set(quote.message, quote);
        else this.quoteCache.pendingQuotes.set(quote.message, quote);

        await this.quoteWrapper.submitQuote(quote);
    }

    async approveQuote (message : string) : Promise <void>{
        let approvedQuote = this.quoteCache.pendingQuotes.get(message);

        //Update Cache
        approvedQuote.pending = false;
        approvedQuote.accepted = true;
        approvedQuote.updatedTimestamp = new Date();
        this.quoteCache.pendingQuotes.delete(message);
        this.quoteCache.approvedQuotes.set(message, approvedQuote);
        //Update Cache

        await this.quoteWrapper.approveQuote(approvedQuote); //Update database
    }

    async declineQuote (message : string) : Promise <void>{
        let declinedQuote = this.quoteCache.pendingQuotes.get(message);

        //Update Cache
        declinedQuote.pending = false;
        declinedQuote.accepted = false;
        declinedQuote.updatedTimestamp = new Date();
        this.quoteCache.pendingQuotes.delete(message);
        this.quoteCache.declinedQuotes.set(message, declinedQuote);
        //Update Cache

        await this.quoteWrapper.declineQuote(declinedQuote); //Update database
    }

    isMessagePending (message : string) : boolean{
        return this.quoteCache.pendingQuotes.has(message);
    }


}