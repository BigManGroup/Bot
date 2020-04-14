import Roast from "../model/Roast";
import BaseModel from "./BaseWrapper";

export default class RoastWrapper extends BaseModel {
    constructor() {
        super("roasts");
    }

    async getApprovedRoasts(): Promise<Roast[]> {
        let results = await (this.collection.find({"accepted": true})).toArray(); //Search where accepted is true
        let formattedResults: Roast[] = [];
        for (let i = 0; i !== results.length; i++) formattedResults.push(Roast.modelBuilder(results[i]));

        return formattedResults;
    }

    async getPendingRoasts(): Promise<Map<string, Roast>> {
        let results = await (this.collection.find({$and: [{"accepted": false}, {"pending": true}]})).toArray();
        let formattedResults: Map<string, Roast> = new Map<string, Roast>();
        for (let i = 0; i !== results.length; i++) {
            let currentRoast = Roast.modelBuilder(results[i]);
            formattedResults.set(currentRoast.message, currentRoast);
        }

        return formattedResults;
    }

    async getDeclinedRoasts(): Promise<Roast[]> {
        let results = await (this.collection.find({$and: [{"accepted": false}, {"pending": false}]})).toArray();
        let formattedResults: Roast[] = [];
        for (let i = 0; i !== results.length; i++) formattedResults.push(Roast.modelBuilder(results[i]));

        return formattedResults;
    }

    async submitRoast(roast: Roast): Promise<void> {
        await (this.collection.insertOne(roast.toString()));
    }

    async approveRoast(roast: Roast): Promise<void> {
        await (this.collection.updateOne({_id: roast._id}, {
            $set: {
                "accepted": true,
                "pending": false,
                "updatedTimestamp": roast.updatedTimestamp,
                "message": undefined
            }
        }));
    }

    async declineRoast(roast: Roast): Promise<void> {
        await (this.collection.updateOne({_id: roast._id}, {
            $set: {
                "accepted": false,
                "pending": false,
                "updatedTimestamp": roast.updatedTimestamp,
                "message": undefined
            }
        }));
    }

}