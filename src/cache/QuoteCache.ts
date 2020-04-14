import Quote from "../database/model/Quote";

export default class QuoteCache{
    approvedQuotes : Map <string, Quote>;
    pendingQuotes: Map<string, Quote>;
    declinedQuotes: Quote[];

    setCache(approvedQuotes: Map<string, Quote>, pendingQuotes: Map<string, Quote>, declinedQuotes: Quote[]): void {
        this.approvedQuotes = approvedQuotes;
        this.pendingQuotes = pendingQuotes;
        this.declinedQuotes = declinedQuotes;
    }
}