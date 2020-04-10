import Roast from "../model/Roast";
import BaseModel from "./BaseWrapper";

export default class RoastWrapper extends BaseModel{
    constructor() {
        super("roasts");
    }

    async getApprovedRoasts() : Promise<Roast[]>{
        let results = await (this.collection.find({"accepted" : true})).toArray(); //Search where accepted is true
        let formattedResults : Roast[] = [];
        for (let i = 0; i !== results.length ; i++) formattedResults.push(Roast.modelBuilder(results[i]));

        return formattedResults;
    }

    async getPendingRoasts() : Promise<Roast[]> {
        let results = await (this.collection.find({$and: [{"accepted": false}, {"pending": true}]})).toArray();
        let formattedResults: Roast[] = [];
        for (let i = 0; i !== results.length; i++) formattedResults.push(Roast.modelBuilder(results[i]));

        return formattedResults;
    }

    async getDeclinedRoasts() : Promise<Roast[]>{
        let results = await (this.collection.find({$and: [{"accepted": false}, {"pending": false}]})).toArray();
        let formattedResults : Roast[] = [];
        for (let i = 0; i !== results.length; i++) formattedResults.push(Roast.modelBuilder(results[i]));

        return formattedResults;
    }

    async addRoast(roast : Roast) : Promise <void>{
        await (this.collection.insertOne(roast.toString()));
    }

    async approveRoast(roast : Roast) : Promise<Roast>{
        await (this.collection.updateOne({_id :  roast._id}, {$set: {"accepted": true, "pending": false}}));

        roast.pending = false;
        roast.accepted = true;

        return roast;
    }

    async declineRoast(roast : Roast) : Promise<Roast>{
        await (this.collection.updateOne({_id :  roast._id}, {$set: {"accepted": false, "pending": false}}));

        roast.pending = false;
        roast.accepted = false;

        return roast;
    }

}