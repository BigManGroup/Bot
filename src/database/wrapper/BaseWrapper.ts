import Saving from "../DatabaseHandler";
import {Collection, MongoClient} from "mongodb";

export default abstract class BaseWrapper{
    readonly session : MongoClient;
    readonly collection: Collection;
    readonly guild: string;

    protected constructor(collection: string, guild: string) {
        this.session = Saving.clientPool;
        this.collection = this.session.db().collection(collection);
        this.guild = guild;
    }

    async delete() : Promise <void>{
        await this.collection.deleteMany({guild : this.guild});
    }
}