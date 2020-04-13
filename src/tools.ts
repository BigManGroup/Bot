import {Guild, User} from "discord.js";

export default class Tools {
    static bigmanRole: string = "296754695295205376";
    static bigmanGuild: string = "264032838712688640";

    static isBigMan(guild: Guild, user: User): boolean {
        return guild.roles.cache.get(this.bigmanRole).members.has(user.id);
    }

    static getRandomNumber(minimum: number, maximum: number): number {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }
}