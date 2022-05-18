import {Guild, GuildMember, PermissionFlagsBits} from "discord.js";
import GuildCache from "../../database/cache/GuildCache";

export default async function isAdminMember(guildMember: GuildMember, guild: Guild): Promise<boolean> {
    let databaseGuild = await GuildCache.getGuild(guild.id);

    if(databaseGuild.additionalInformation.minimumAdminRoleId !== undefined){
        let minimumAdminRole = await guild.roles.fetch(databaseGuild.additionalInformation.minimumAdminRoleId); //Get the minimum admin role
        if(minimumAdminRole) {
            let adminRolePosition = minimumAdminRole.position;
            return guildMember.roles.highest.position > adminRolePosition;
        }
    }

    return guildMember.permissions.has(PermissionFlagsBits.Administrator);
}