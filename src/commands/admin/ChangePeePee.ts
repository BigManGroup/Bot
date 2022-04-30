import {Message, User} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import Tools from "../../tools";

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {
    if (!Tools.isBigMan(message.guild, middleware.guildMiddleware.bigmanRole, message.author.id)) {
        message.reply(`nice try, unprivileged ${message.member.roles.highest.name}`).catch(error => console.log(error));
        return;
    }
    //Check parameters
    let size = Number(formattedMessage.parameters[0]);

    if (isNaN(size)) {
        message.reply(`i need a number ${middleware.insultMiddleware.randomInsult}`).catch((error) => console.log(error));
        return;
    } else if (size < 0 || size > 10) {
        message.reply("max peepee size is 10").catch((error) => console.log(error));
        return;
    }
    //Check parameters
    size = Math.round(size);
    let user: User;

    if (message.mentions.users.size === 0) user = message.author;
    else user = message.mentions.users.first();


    middleware.peePeeMiddleware.updatePeePeeSize(user.id, message.guild.id, true, +size);
    message.reply("peepee updated").catch((error) => console.log(error));
}

export {main}