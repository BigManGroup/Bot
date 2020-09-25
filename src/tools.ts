import {Guild} from "discord.js";

export default class Tools {
    static isBigMan(guild: Guild, bigmanRole: string, user: string): boolean {
        if (guild.roles.cache.get(bigmanRole) === undefined) return guild.ownerID === user;
        else return guild.ownerID === user || guild.roles.cache.get(bigmanRole).members.has(user);
    }

    static getRandomNumber(minimum: number, maximum: number): number {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }

    static titleCase(string : string) {
        return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
    }
}