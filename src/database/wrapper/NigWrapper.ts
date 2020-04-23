import BaseWrapper from "./BaseWrapper";
import Nig from "../model/Nig";

export default class NigWrapper extends BaseWrapper {
    constructor(guild: string) {
        super("nig", guild);
    }

    async getNig(): Promise<Map<string, Nig>> {
        let results = await (this.collection.find({"guild": this.guild})).toArray(); //Search where accepted is true
        let formattedResults: Map<string, Nig> = new Map<string, Nig>();
        for (let i = 0; i !== results.length; i++) formattedResults.set(results[i].user, Nig.modelBuilder(results[i]));

        return formattedResults;
    }

    async addNig(nig : Nig) : Promise <void>{
        await (this.collection.insertOne(nig.toString()));
    }

    async modifyNig(nig : Nig) : Promise<void>{
        await (this.collection.updateOne({_id :  nig._id}, {$set: {"amount": nig.amount}}));
    }
}