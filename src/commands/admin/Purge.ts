import {Message, TextChannel} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import Tools from "../../tools";

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {
    if (!Tools.isBigMan(message.guild, middleware.guildMiddleware.bigmanRole, message.author.id)) {
        message.reply({content: `nice try, unprivileged ${message.member.roles.highest.name}`}).catch(error => console.log(error));
        return;
    }

    if (formattedMessage.parameters[0] === undefined){
        (message.channel as TextChannel).bulkDelete(5).catch(error => console.log(error));
        return;
    }

    let amount = Number(formattedMessage.parameters[0]);
    if (isNaN(amount)) {
        message.reply({content: `i need a number ${middleware.insultMiddleware.randomInsult}`}).catch((error) => console.log(error));
        return;
    }
    (message.channel as TextChannel).bulkDelete(++amount).catch(error => console.log(error));
}

export {main}