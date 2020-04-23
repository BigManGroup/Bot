import BaseWrapper from "./BaseWrapper";
import PeePee from "../model/PeePee";

export default class PeePeeWrapper extends BaseWrapper {
    constructor(guild: string) {
        super("peepee", guild);
    }

    async getPeePee(): Promise<Map<string, PeePee>> {
        let results = await (this.collection.find({"guild": this.guild})).toArray(); //Search where accepted is true
        let formattedResults: Map<string, PeePee> = new Map<string, PeePee>();
        for (let i = 0; i !== results.length; i++) formattedResults.set(results[i].user, PeePee.modelBuilder(results[i]));

        return formattedResults;
    }

    async addPeePee(peePee : PeePee) : Promise <void>{
        await (this.collection.insertOne(peePee.toString()));
    }

    async modifyPeePee(peePee : PeePee) : Promise<void>{
        await (this.collection.updateOne({_id :  peePee._id}, {$set: {"size": peePee.size}}));
    }
}