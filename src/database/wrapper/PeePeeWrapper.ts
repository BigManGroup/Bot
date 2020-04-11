import BaseWrapper from "./BaseWrapper";
import PeePee from "../model/PeePee";

export default class PeePeeWrapper extends BaseWrapper{
    constructor() {
        super("peepee");
    }

    async getPeePee() : Promise<Map<string, PeePee>>{
        let results = await (this.collection.find()).toArray(); //Search where accepted is true
        let formattedResults : Map <string, PeePee> = new Map<string, PeePee>();
        for (let i = 0; i !== results.length ; i++) formattedResults.set(results[i].user, PeePee.modelBuilder(results[i]));

        return formattedResults;
    }

    async addPeePee(peePee : PeePee) : Promise <void>{
        await (this.collection.insertOne(peePee.toString()));
    }

    async modifyPeePee(peePee : PeePee) : Promise<void>{
        await (this.collection.updateOne({_id :  peePee._id}, {$set: {"size": peePee.size}}));
    }
}