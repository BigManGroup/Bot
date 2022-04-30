import * as properties from '../../resources/config.json'
import {MongoClient} from "mongodb";
import {startBot} from "../index";

export default class Saving {
    static clientPool : MongoClient;

    static async initPool() : Promise<void> {
        this.clientPool = await new MongoClient(properties.database, {minPoolSize:5, maxPoolSize: 15, keepAlive: true}).connect();
    }
}

Saving.initPool().catch(error => console.log("Error connecting to pool: " + error)).then(() => {
    startBot();
    console.log("Connected to database")
});