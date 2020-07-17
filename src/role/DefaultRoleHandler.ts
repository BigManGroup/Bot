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

    async onServerStart (guild : Guild) : Promise <void> {
        let guildMembers = Array.from(guild.members.cache.values());
        for (let i = 0; i !== guildMembers.length; i++) await this.setGeneralRole(guildMembers[i])
    }

    private async setGeneralRole(member : GuildMember) : Promise <void>{
        if (member.roles.cache.size === 1) await member.roles.add(member.guild.roles.cache.get(this.centralizedMiddleware.guildMiddleware.generalRole));
    }
}
