import BaseWrapper from "./BaseWrapper";
import BadMan from "../model/BadMan";

export default class BadManWrapper extends BaseWrapper{
    constructor() {
        super("badman");
    }

    async getBadMan() : Promise<Map <string, BadMan>>{
        let results = await (this.collection.find({"forgiven" : false})).toArray(); //Search where accepted is true
        let formattedResults : Map <string, BadMan> = new Map<string, BadMan>();

        for (let i = 0; i !== results.length ; i++) {
            let currentObject = BadMan.modelBuilder(results[i]);
            formattedResults.set(currentObject.user, currentObject)
        }

        return formattedResults;
    }

    async getForgivenBadMan() : Promise<Map <string, BadMan>> {
        let results = await (this.collection.find({"forgiven": true})).toArray();
        let formattedResults : Map <string, BadMan> = new Map<string, BadMan>();

        for (let i = 0; i !== results.length ; i++) {
            let currentObject = BadMan.modelBuilder(results[i]);
            formattedResults.set(currentObject.user, currentObject)
        }

        return formattedResults;
    }

    async addBadMan(badMan : BadMan) : Promise <void>{
        await (this.collection.insertOne(badMan.toString()));
    }

    async forgiveBadMan(badman : BadMan) : Promise<void>{
        await (this.collection.updateOne({_id :  badman._id}, {$set: {"forgiven": true}}));
    }
}

