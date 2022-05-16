import Guild from "../model/guild/Guild";
import GuildWrapper from "../wrapper/GuildWrapper";
import DetailedResponse from "../../tools/response/DetailedResponse";
import DatabaseResponse from "../DatabaseResponse";

class GuildCache{
    private guilds : Map<string, Guild> = new Map<string, Guild>();

    public async getGuild(id: string) : Promise<DetailedResponse<Guild>>{
        let cachedGuild = this.guilds.get(id);
        if(cachedGuild && !cachedGuild.expired) return DatabaseResponse.fieldsFound(cachedGuild);

        let gottenGuild = await GuildWrapper.getGuild(id);
        if(gottenGuild.status !== 200) return gottenGuild; //There was an error getting the guild
        this.cacheGuild(gottenGuild.additionalInformation);

        return DatabaseResponse.fieldsFound(gottenGuild.additionalInformation)
    }

    private cacheGuild(guild: Guild){
        this.guilds.set(guild.id, guild);
    }
}

export default (new GuildCache());