import Saving from "../DatabaseHandler";
import {Collection, MongoClient} from "mongodb";

export default abstract class BaseWrapper{
    readonly session : MongoClient;
    readonly collection : Collection;

    protected constructor(collection : string) {
        this.session = Saving.clientPool;
        this.collection = this.session.db().collection(collection);
    }
}