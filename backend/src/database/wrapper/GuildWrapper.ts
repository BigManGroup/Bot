import BaseDatabaseWrapper from "./BaseDatabaseWrapper";
import Guild, {IDatabaseGuild} from "../model/guild/Guild";
import {MongoError, ObjectId} from "mongodb";
import DetailedResponse from "../../tools/response/DetailedResponse";
import DatabaseResponse from "../DatabaseResponse";

class GuildWrapper extends BaseDatabaseWrapper{
    constructor() {
        super("guild");
    }

    async getGuild(guildId: string) : Promise<DetailedResponse<Guild>>{
        let currentGuild = await this.collection.findOne<IDatabaseGuild>({"id": guildId});

        if(!currentGuild){
            let createdGuild = await this.createGuild(guildId);
            if(createdGuild.status !== 201) return createdGuild; //There was an error
            else currentGuild = createdGuild.additionalInformation;
        }

        return DatabaseResponse.fieldsFound<Guild>(new Guild(currentGuild));
    }

    private async createGuild(guildId: string) : Promise<DetailedResponse<Guild>>{
        let creatingGuild : Guild = new Guild({_id: undefined, id: guildId});
        try {
            let createdGuild = await this.collection.insertOne(creatingGuild);
            creatingGuild._id = createdGuild.insertedId;
            return DatabaseResponse.fieldAdded<Guild>(new Guild(createdGuild as unknown as IDatabaseGuild));
        }catch (error){
            if(error instanceof MongoError) return DatabaseResponse.errorMapper(error);
        }
    }
}

export default (new GuildWrapper());