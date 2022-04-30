import {GuildMember, Message} from "discord.js";
import FormattedMessage from "../../model/FormattedMessage";
import CentralizedMiddleware from "../../../middleware/CentralizedMiddleware";
import Tools from "../../../tools";

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {
    if (!Tools.isBigMan(message.guild, middleware.guildMiddleware.bigmanRole, message.author.id)) {
        message.reply({content: `nice try, unprivileged ${message.member.roles.highest.name}`}).catch(error => console.log(error));
        return;
    }

    //Check parameters
    let role = formattedMessage.parameters[0];

    if (!message.guild.roles.cache.has(role)) {
        message.reply({content: `you entered an invalid role, ${middleware.insultMiddleware.randomInsult}`}).catch(error => console.log(error));
        return;
    }
    //Check parameters

    middleware.guildMiddleware.setGeneralRole(role).then(() => message.reply({content: "General role updated"})).catch(error => console.log(error));
    let guildMembers = Array.from(message.guild.members.cache.values());
    for (let i = 0; i !== guildMembers.length; i++) setGeneralRole(guildMembers[i], middleware).catch(error => console.error("Error setting new general role " + error));
}

async function setGeneralRole(member: GuildMember, centralizedMiddleware: CentralizedMiddleware): Promise<void> {
    if (member.roles.cache.size === 1 && centralizedMiddleware.guildMiddleware.generalRole !== undefined) await member.roles.add(member.guild.roles.cache.get(this.centralizedMiddleware.guildMiddleware.generalRole));
}

export {main};

