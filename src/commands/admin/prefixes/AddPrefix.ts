import {Message} from "discord.js";
import FormattedMessage from "../../model/FormattedMessage";
import CentralizedMiddleware from "../../../middleware/CentralizedMiddleware";
import Tools from "../../../tools";

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {
    if (!Tools.isBigMan(message.guild, middleware.guildMiddleware.bigmanRole, message.author.id)) {
        message.reply(`nice try, unprivileged ${message.member.roles.highest.name}`).catch(error => console.log(error));
        return;
    }

    let prefix = formattedMessage.parameters[0];
    if (prefix === undefined) {
        message.reply(`i need a prefix ${middleware.insultMiddleware.randomInsult}`).catch((error) => console.log(error));
        return;
    }

    prefix = prefix + " "; //Add a space to the end of the prefix
    middleware.guildMiddleware.addPrefix(prefix).then(() => message.reply("Added prefix: " + prefix).catch(error => console.log(error)));
}

export {main};
