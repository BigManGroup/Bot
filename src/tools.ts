import {Guild} from "discord.js";

export default class Tools {
    static isBigMan(guild: Guild, bigmanRole: string, user: string): boolean {
        if (guild.roles.cache.get(bigmanRole) === undefined || guild.roles.cache.get(bigmanRole) === null) return guild.ownerID === user;
        else return guild.ownerID === user || guild.roles.cache.get(bigmanRole).members.has(user);
    }

    static amountOfBigMan(guild: Guild, bigmanRole: string): number {
        if (!bigmanRole || guild.roles.cache.get(bigmanRole) === undefined || guild.roles.cache.get(bigmanRole) === null) return 1; //Just the owner
        else return guild.roles.cache.get(bigmanRole).members.size;
    }

    static getRandomNumber(minimum: number, maximum: number): number {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }

    static titleCase(string: string) {
        return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
    }
}