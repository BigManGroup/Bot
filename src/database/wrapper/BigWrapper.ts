import BaseWrapper from "./BaseWrapper";
import Big from "../model/Big";

export default class BigWrapper extends BaseWrapper {
    constructor(guild: string) {
        super("big", guild);
    }

    async getBig(): Promise<Map<string, Big>> {
        let results = await (this.collection.find({"guild": this.guild})).toArray(); //Search where accepted is true
        let formattedResults: Map<string, Big> = new Map<string, Big>();
        for (let i = 0; i !== results.length; i++) formattedResults.set(results[i].user, Big.modelBuilder(results[i]));

        return formattedResults;
    }

    async addBig(big : Big) : Promise <void>{
        await (this.collection.insertOne(big.toString()));
    }

    async modifyBig(big : Big) : Promise<void>{
        await (this.collection.updateOne({_id :  big._id}, {$set: {"amount": big.amount}}));
    }
}