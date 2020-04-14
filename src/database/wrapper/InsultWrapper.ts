import BaseWrapper from "./BaseWrapper";
import Insult from "../model/Insult";

export default class InsultWrapper extends BaseWrapper {
    constructor() {
        super("insults");
    }

    async getApprovedInsult(): Promise<Insult[]> {
        let results = await (this.collection.find({"accepted": true})).toArray(); //Search where accepted is true

        let formattedResults: Insult [] = [];
        for (let i = 0; i !== results.length; i++) formattedResults.push(Insult.modelBuilder(results[i]));

        return formattedResults;
    }

    async getPendingInsults(): Promise<Map<string, Insult>> {
        let results = await (this.collection.find({$and: [{"accepted": false}, {"pending": true}]})).toArray();

        let formattedResults: Map<string, Insult> = new Map<string, Insult>();
        for (let i = 0; i !== results.length; i++) {
            let currentInsult = Insult.modelBuilder(results[i]);
            formattedResults.set(currentInsult.message, currentInsult);
        }

        return formattedResults;
    }

    async getDeclinedInsults(): Promise<Insult[]> {
        let results = await (this.collection.find({$and: [{"accepted": false}, {"pending": false}]})).toArray();

        let formattedResults: Insult[] = [];
        for (let i = 0; i !== results.length; i++) formattedResults.push(Insult.modelBuilder(results[i]));


        return formattedResults;
    }

    async submitInsult(insult: Insult): Promise<void> {
        await (this.collection.insertOne(insult.toString()));
    }

    async approveInsult(insult: Insult): Promise<void> {
        await (this.collection.updateOne({_id: insult._id}, {
            $set: {
                "accepted": true,
                "pending": false,
                "updateTimestamp": insult.updatedTimestamp,
                "message": undefined
            }
        }));
    }

    async declineInsult(insult: Insult): Promise<void> {
        await (this.collection.updateOne({_id: insult._id}, {
            $set: {
                "accepted": false,
                "pending": false,
                "updateTimestamp": insult.updatedTimestamp,
                "message": undefined
            }
        }));
    }
}