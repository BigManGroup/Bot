import BaseDatabaseWrapper from "./BaseDatabaseWrapper";
import Guild from "../model/guild/Guild";
import {MongoError, ObjectId} from "mongodb";
import DetailedResponse from "../../tools/response/DetailedResponse";
import DatabaseResponse from "../DatabaseResponse";

class GuildWrapper extends BaseDatabaseWrapper{
    constructor() {
        super("guild");
    }

    async getGuild(guildId: string) : Promise<DetailedResponse<Guild>>{
        let currentGuild = await this.collection.findOne<Guild>({"id": guildId});

        if(!currentGuild){
            let createdGuild = await this.createGuild(guildId);
            if(createdGuild.status !== 201) return createdGuild; //There was an error
            else currentGuild = createdGuild.additionalInformation;
        }

        return DatabaseResponse.fieldsFound<Guild>(currentGuild);
    }

    private async createGuild(guildId: string) : Promise<DetailedResponse<Guild>>{
        let creatingGuild : Guild = new Guild(guildId);
        try {
            let createdGuild = await this.collection.insertOne(creatingGuild);
            creatingGuild._id = createdGuild.insertedId;
            return DatabaseResponse.fieldAdded<Guild>(creatingGuild);
        }catch (error){
            if(error instanceof MongoError) return DatabaseResponse.errorMapper(error);
        }
    }
}

export default (new GuildWrapper());