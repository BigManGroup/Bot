import {Message, User} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import Tools from "../../tools";

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {
    if (!Tools.isBigMan(message.guild, middleware.guildMiddleware.bigmanRole, message.author.id)) {
        message.reply({content: `nice try, unprivileged ${message.member.roles.highest.name}`}).catch(error => console.log(error));
        return;
    }
    //Check parameters
    let amount = Number(formattedMessage.parameters[0]);

    if (isNaN(amount)) {
        message.reply({content: `i need a number ${middleware.insultMiddleware.randomInsult}`}).catch((error) => console.log(error));
        return;
    } else if (amount < 0 || amount > 100) {
        message.reply({content: "max big size is 100"}).catch((error) => console.log(error));
        return;
    }
    //Check parameters
    let user: User;

    if (message.mentions.users.size === 0) user = message.author;
    else user = message.mentions.users.first();


    middleware.bigMiddleware.updateBigAmount(user.id, message.guild.id, true, amount);
    message.reply({content: "big updated"}).catch((error) => console.log(error));
}

export {main}