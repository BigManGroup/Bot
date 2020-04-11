import BaseModel from "./BaseWrapper";
import Lenny from "../model/Lenny";

export default class LennyWrapper extends BaseModel{
    constructor() {
        super("lennys");
    }

    async getApprovedLennys() : Promise<Lenny[]>{
        let results = await (this.collection.find({"accepted" : true})).toArray(); //Search where accepted is true
        let formattedResults : Lenny[] = [];
        for (let i = 0; i !== results.length ; i++) formattedResults.push(Lenny.modelBuilder(results[i]));

        return formattedResults;
    }

    async getPendingLennys() : Promise<Lenny[]> {
        let results = await (this.collection.find({$and: [{"accepted": false}, {"pending": true}]})).toArray();
        let formattedResults: Lenny[] = [];
        for (let i = 0; i !== results.length; i++) formattedResults.push(Lenny.modelBuilder(results[i]));

        return formattedResults;
    }

    async getDeclinedLennys() : Promise<Lenny[]>{
        let results = await (this.collection.find({$and: [{"accepted": false}, {"pending": false}]})).toArray();
        let formattedResults : Lenny[] = [];
        for (let i = 0; i !== results.length; i++) formattedResults.push(Lenny.modelBuilder(results[i]));

        return formattedResults;
    }

    async addLenny(lenny : Lenny) : Promise <void>{
        await (this.collection.insertOne(lenny.toString()));
    }

    async approveLenny(lenny : Lenny) : Promise<Lenny>{
        await (this.collection.updateOne({_id :  lenny._id}, {$set: {"accepted": true, "pending": false}}));

        lenny.pending = false;
        lenny.accepted = true;

        return lenny;
    }

    async declineLenny(lenny : Lenny) : Promise<Lenny>{
        await (this.collection.updateOne({_id :  lenny._id}, {$set: {"accepted": false, "pending": false}}));

        lenny.pending = false;
        lenny.accepted = false;

        return lenny;
    }

}