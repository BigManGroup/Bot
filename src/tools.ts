import {User, Guild} from "discord.js";

export default class Tools {
    static async isBigMan(guild: Guild, user: User): Promise<boolean> {
        return (await guild.roles.fetch("296754695295205376")).members.has(user.id);
    }
}