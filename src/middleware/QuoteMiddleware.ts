import BaseMiddleware from "./BaseMiddleware";
import QuoteCache from "../cache/QuoteCache";
import QuoteWrapper from "../database/wrapper/QuoteWrapper";
import Quote from "../database/model/Quote";
import GuildHandler from "../GuildHandler";
import Tools from "../tools";

export default class QuoteMiddleware extends BaseMiddleware {
    quoteCache: QuoteCache;
    quoteWrapper: QuoteWrapper;
    cacheBuilt: boolean;

    constructor(guild: string) {
        super(guild)

        this.quoteCache = new QuoteCache();
        this.quoteWrapper = new QuoteWrapper(guild);
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
        approvedQuote.message = message;
        this.quoteCache.pendingQuotes.delete(message);
        this.quoteCache.approvedQuotes.set(message, approvedQuote);
        //Update Cache

        await this.quoteWrapper.approveQuote(approvedQuote); //Update database
    }

    async deleteApprovedQuote(message: string): Promise<void> {
        let deletedQuote = this.quoteCache.approvedQuotes.get(message);

        //Update Cache
        deletedQuote.pending = false;
        deletedQuote.accepted = false;
        deletedQuote.updatedTimestamp = new Date();
        deletedQuote.message = undefined;
        this.quoteCache.approvedQuotes.delete(message);
        this.quoteCache.declinedQuotes.push(deletedQuote);
        //Update Cache

        await this.quoteWrapper.declineQuote(deletedQuote); //Update database
    }

    async declineQuote(message: string): Promise<void> {
        let declinedQuote = this.quoteCache.pendingQuotes.get(message);

        //Update Cache
        declinedQuote.pending = false;
        declinedQuote.accepted = false;
        declinedQuote.updatedTimestamp = new Date();
        declinedQuote.message = undefined;
        this.quoteCache.pendingQuotes.delete(message);
        this.quoteCache.declinedQuotes.push(declinedQuote);
        //Update Cache

        await this.quoteWrapper.declineQuote(declinedQuote); //Update database
    }

    get randomQuote(): Quote {
        let quotes = this.quoteCache.approvedQuotes;
        if (quotes.size > 0) {
            //return quotes.[Tools.getRandomNumber(0, roasts.length - 1)].roast;
            let randomQuote = Array.from(quotes.values());
            return randomQuote[Tools.getRandomNumber(0, quotes.size - 1)];
        }
        return GuildHandler.defaultGuild.quoteMiddleware.randomQuote;
    }

    isQuotePending(message: string): boolean {
        return this.quoteCache.pendingQuotes.has(message);
    }

    isQuoteApproved(message: string): boolean {
        return this.quoteCache.approvedQuotes.has(message);
    }

    getPendingQuote(message: string): Quote {
        return this.quoteCache.pendingQuotes.get(message);
    }

    getApprovedQuote(message: string): Quote {
        return this.quoteCache.approvedQuotes.get(message);
    }
}