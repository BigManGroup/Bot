import {Message} from "discord.js";
import FormattedMessage from "../../model/FormattedMessage";
import CentralizedMiddleware from "../../../middleware/CentralizedMiddleware";
import Tools from "../../../tools";
import {guildHandler} from "../../../index";

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {
    if (!Tools.isBigMan(message.guild, middleware.guildMiddleware.bigmanRole, message.author.id)) {
        message.reply(`nice try, unprivileged ${message.member.roles.highest.name}`).catch(error => console.log(error));
        return;
    }

    //Check parameters
    let role = formattedMessage.parameters[0];

    if (!message.guild.roles.cache.has(role)) {
        message.reply(`you entered an invalid role, ${middleware.insultMiddleware.randomInsult}`).catch(error => console.log(error));
        return;
    }
    //Check parameters

    middleware.guildMiddleware.setGeneralRole(role).then(() => message.reply("General role updated")).catch(error => console.log(error));
    guildHandler.getDefaultRoleHandler(message.guild.id).then(defaultRoleHandler => {
        defaultRoleHandler.onCacheLoad(message.guild).catch(error => console.error("Error reloading cache general role change " + error));
    })
}

export {main};

