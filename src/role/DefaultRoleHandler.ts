import CentralizedMiddleware from "../middleware/CentralizedMiddleware";
import {Guild, GuildMember} from "discord.js";

export default class DefaultRoleHandler{
    readonly centralizedMiddleware: CentralizedMiddleware;

    constructor(centralizedMiddleware : CentralizedMiddleware) {
        this.centralizedMiddleware = centralizedMiddleware;
    }

    async onChannelJoin(member : GuildMember) : Promise <void> {
        await this.setGeneralRole(member);
    }

    async onCacheLoad (guild : Guild) : Promise <void> {
        if (this.centralizedMiddleware.guildMiddleware.generalRole === undefined || this.centralizedMiddleware.guildMiddleware.generalRole === null) return;
        let guildMembers = Array.from(guild.members.cache.values());
        for (let i = 0; i !== guildMembers.length; i++) await this.setGeneralRole(guildMembers[i])
    }

    private async setGeneralRole(member : GuildMember) : Promise <void>{
        if (member.roles.cache.size === 1 && this.centralizedMiddleware.guildMiddleware.generalRole !== null && this.centralizedMiddleware.guildMiddleware.generalRole !== undefined) await member.roles.add(member.guild.roles.cache.get(this.centralizedMiddleware.guildMiddleware.generalRole));
    }
}
