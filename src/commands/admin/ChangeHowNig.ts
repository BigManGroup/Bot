import {Message, User} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import Tools from "../../tools";

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {
    if (!Tools.isBigMan(message.guild, message.author)) {
        message.reply(`nice try, unprivileged ${message.member.roles.highest.name}`).catch(error => console.log(error));
        return;
    }
    //Check parameters
    let amount = Number(formattedMessage.parameters[0]);

    if (isNaN(amount)) {
        message.reply("i need a number dumbass").catch((error) => console.log(error));
        return;
    } else if (amount > 100) {
        message.reply("max nig size is 100").catch((error) => console.log(error));
        return;
    }
    //Check parameters
    let user: User;

    if (message.mentions.users.size === 0) user = message.author;
    else user = message.mentions.users.first();


    middleware.nigMiddleware.updateNigAmount(user.id, true, amount);
    message.reply("nig updated").catch((error) => console.log(error));
}

export {main}