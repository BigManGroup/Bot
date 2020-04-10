import * as properties from '../../resources/config.json'
import {MongoClient} from "mongodb";

export default class Saving {
    static clientPool : MongoClient;
    static initialized : boolean = false;

    static async initPool() : Promise<void> {
        this.clientPool = await new MongoClient(properties.database, {useUnifiedTopology:true, useNewUrlParser:true, poolSize: 15, keepAlive: true}).connect();
    }
}

Saving.initPool().catch(error => console.log("Error connecting to pool: " + error)).then(()=> {Saving.initialized = true;console.log("Connected to database")});