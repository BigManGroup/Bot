import Quote from "../model/Quote";
import BaseWrapper from "./BaseWrapper";

export default class QuoteWrapper extends BaseWrapper{
    constructor() {
        super("quotes");
    }

    async getApprovedQuotes() : Promise<Map <string, Quote>>{
        let results = await (this.collection.find({"accepted" : true})).toArray(); //Search where accepted is true

        let formattedResults : Map<string, Quote> = new Map<string, Quote>();
        for (let i = 0; i !== results.length ; i++){
            let currentQuote = Quote.modelBuilder(results[i]);
            formattedResults.set(currentQuote.message, currentQuote);
        }

        return formattedResults;
    }

    async getPendingQuotes() : Promise<Map <string, Quote>> {
        let results = await (this.collection.find({$and: [{"accepted": false}, {"pending": true}]})).toArray();

        let formattedResults : Map<string, Quote> = new Map<string, Quote>();
        for (let i = 0; i !== results.length ; i++){
            let currentQuote = Quote.modelBuilder(results[i]);
            formattedResults.set(currentQuote.message, currentQuote);
        }

        return formattedResults;
    }

    async getDeclinedQuotes(): Promise<Quote[]> {
        let results = await (this.collection.find({$and: [{"accepted": false}, {"pending": false}]})).toArray();

        let formattedResults: Quote[] = [];
        for (let i = 0; i !== results.length; i++) formattedResults.push(Quote.modelBuilder(results[i]));


        return formattedResults;
    }

    async submitQuote(quote : Quote) : Promise <void>{
        await (this.collection.insertOne(quote.toString()));
    }

    async approveQuote(quote : Quote) : Promise<void>{
        await (this.collection.updateOne({_id: quote._id}, {
            $set: {
                "accepted": true,
                "pending": false,
                "updateTimestamp": quote.updatedTimestamp,
                "message": quote.message
            }
        }));
    }

    async declineQuote(quote : Quote) : Promise<void>{
        await (this.collection.updateOne({_id: quote._id}, {
            $set: {
                "accepted": false,
                "pending": false,
                "updateTimestamp": quote.updatedTimestamp,
                "message": undefined
            }
        }));
    }
}