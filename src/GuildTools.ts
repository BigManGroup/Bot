import {Client} from "discord.js";
import GuildWrapper from "./database/wrapper/GuildWrapper";
import GuildHandler from "./GuildHandler";

export default class GuildTools {
    static async deleteGuild(client: Client, guildHandler: GuildHandler) {
        let botGuilds = client.guilds.cache.keyArray();
        let databaseGuilds = await GuildWrapper.getAllGuilds();

        for (let i = 0; i !== databaseGuilds.length; i++) {
            let found: boolean = false;
            let currentDatabase: string = databaseGuilds[i];
            for (let j = 0; j !== botGuilds.length && !found; j++) {
                let currentBot = botGuilds[j];
                if (currentBot === currentBot) found = true;
            }

            if (!found) await guildHandler.deleteGuild(currentDatabase);
        }
    }
}