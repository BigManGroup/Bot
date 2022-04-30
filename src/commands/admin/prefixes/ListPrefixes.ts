import {Message} from "discord.js";
import FormattedMessage from "../../model/FormattedMessage";
import CentralizedMiddleware from "../../../middleware/CentralizedMiddleware";
import Tools from "../../../tools";

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {
    if (!Tools.isBigMan(message.guild, middleware.guildMiddleware.bigmanRole, message.author.id)) {
        message.reply(`nice try, unprivileged ${message.member.roles.highest.name}`).catch(error => console.log(error));
        return;
    }

    message.reply("Bot prefixes are: " + middleware.guildMiddleware.prefixes).catch(error => console.error(error))
}

export {main};