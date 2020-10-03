import CentralizedMiddleware from "../middleware/CentralizedMiddleware";
import {Role} from "discord.js";
import {client} from "../index";

export default class RoleHandler {
    centralizedMiddleware: CentralizedMiddleware;

    constructor(centralizedMiddleware: CentralizedMiddleware) {
        this.centralizedMiddleware = centralizedMiddleware;
    }

    async onRoleDelete(deletedRole: Role): Promise<void> {
        if (deletedRole.id === this.centralizedMiddleware.guildMiddleware.badmanRole) await this.centralizedMiddleware.guildMiddleware.setBadmanRole(undefined);
        else if (deletedRole.id === this.centralizedMiddleware.guildMiddleware.generalRole) await this.centralizedMiddleware.guildMiddleware.setGeneralRole(undefined);
        else if (deletedRole.id === this.centralizedMiddleware.guildMiddleware.bigmanRole) await this.centralizedMiddleware.guildMiddleware.setBigmanRole(undefined);
    }

    async onStart(guild: string): Promise<void> {
        let objectGuild = client.guilds.cache.get(guild);
        let roles = Array.from(objectGuild.roles.cache.values());

        let generalRoleFound = false;
        let badManFound = false;
        let bigmanRoleFound = false;

        for (let i = 0; i !== roles.length && (badManFound == false || generalRoleFound == false); i++) {
            if (roles[i].id === this.centralizedMiddleware.guildMiddleware.generalRole) generalRoleFound = true;
            else if (roles[i].id === this.centralizedMiddleware.guildMiddleware.badmanRole) badManFound = true;
            else if (roles[i].id === this.centralizedMiddleware.guildMiddleware.bigmanRole) bigmanRoleFound = true;
        }

        if (!generalRoleFound) await this.centralizedMiddleware.guildMiddleware.setGeneralRole(undefined);
        if (!badManFound) await this.centralizedMiddleware.guildMiddleware.setBadmanRole(undefined);
        if (!bigmanRoleFound) await this.centralizedMiddleware.guildMiddleware.setBigmanRole(undefined);
    }
}