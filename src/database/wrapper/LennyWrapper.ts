import Lenny from "../model/Lenny";
import BaseWrapper from "./BaseWrapper";

export default class LennyWrapper extends BaseWrapper {
    constructor(guild: string) {
        super("lennys", guild);
    }

    async getApprovedLennys(): Promise<Lenny[]> {
        let results = await (this.collection.find({$and: [{"accepted": true}, {"guild": this.guild}]})).toArray(); //Search where accepted is true
        let formattedResults: Lenny[] = [];
        for (let i = 0; i !== results.length; i++) formattedResults.push(Lenny.modelBuilder(results[i]));

        return formattedResults;
    }

    async getPendingLennys() : Promise<Lenny[]> {
        let results = await (this.collection.find({$and: [{"accepted": false}, {"pending": true}, {"guild": this.guild}]})).toArray();
        let formattedResults: Lenny[] = [];
        for (let i = 0; i !== results.length; i++) formattedResults.push(Lenny.modelBuilder(results[i]));

        return formattedResults;
    }

    async getDeclinedLennys() : Promise<Lenny[]>{
        let results = await (this.collection.find({$and: [{"accepted": false}, {"pending": false}, {"guild": this.guild}]})).toArray();
        let formattedResults: Lenny[] = [];
        for (let i = 0; i !== results.length; i++) formattedResults.push(Lenny.modelBuilder(results[i]));

        return formattedResults;
    }

    async addLenny(lenny : Lenny) : Promise <void>{
        await (this.collection.insertOne(lenny.toString()));
    }

    async approveLenny(lenny : Lenny) : Promise<void>{
        await (this.collection.updateOne({_id :  lenny._id}, {$set: {"accepted": true, "pending": false, "updatedTimestamp": lenny.updatedTimestamp}}));
    }

    async declineLenny(lenny : Lenny) : Promise<void>{
        await (this.collection.updateOne({_id :  lenny._id}, {$set: {"accepted": false, "pending": false, "updatedTimestamp" : lenny.updatedTimestamp}}));
    }

}