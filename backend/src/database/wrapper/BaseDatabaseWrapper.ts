import {Collection, MongoClient} from "mongodb";

export default abstract class BaseDatabaseWrapper{
    static _client : MongoClient;
    protected readonly _collection : string;

    protected constructor(collection: string) {
        this._collection = collection;
    }

    get client() : MongoClient{
        return BaseDatabaseWrapper._client;
    }

    get collection(){
        return this.client.db().collection(this._collection);
    }

    private static async createDefaultIndex(){
        await BaseDatabaseWrapper._client.db().collection("guild").createIndex({guildId: 1}, {name: "Unique Guild", unique: true});
    }

    static async start(){
        BaseDatabaseWrapper._client = await (new MongoClient(process.env["MONGODB_URL"], {
            minPoolSize: 5,
            keepAlive: true
        })).connect();
        await this.createDefaultIndex();
        console.dir("Connected to MongoDB Instance and created default indexes.")
    }
}