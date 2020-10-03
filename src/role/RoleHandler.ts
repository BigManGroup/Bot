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

    onStart(guild: string): void {
        let objectGuild = client.guilds.cache.get(guild);
        let roles = Array.from(objectGuild.roles.cache.values());

        for (let i = 0; i !== roles.length; i++) {
            this.onRoleDelete(roles[i]).catch(error => console.error("Error deleting from database " + error));
        }
    }
}