import {Guild} from "discord.js";

export default class Tools {
    static readonly originalGuild: string = "264032838712688640";

    static isBigMan(guild: Guild, bigmanRole: string, user: string): boolean {
        if (guild.roles.cache.get(bigmanRole) === undefined) return guild.ownerID === user;
        else return guild.ownerID === user || guild.roles.cache.get(bigmanRole).members.has(user);
    }

    static getRandomNumber(minimum: number, maximum: number): number {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }
}