import {Message, User} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import Tools from "../../tools";

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {
    let user: User;
    let changed: boolean = false;

    if (message.mentions.users.size === 0) user = message.author;
    else {
        user = message.mentions.users.first();

        if (user.id === message.client.user.id) {
            message.reply({content: `ask ur dad`}).catch(error => console.log(error));
            return;
        }
        changed = true;
    }

    let big = middleware.bigMiddleware.getBig(user.id, message.guild.id, Tools.isBigMan(message.guild, middleware.guildMiddleware.bigmanRole, user.id));

    if (changed) message.channel.send({content: `here's ${user} big amount\n**${big.amount}%**`}).catch(error => console.log(error));
    else message.channel.send({content: `here's your big amount\n**${big.amount}%**`}).catch(error => console.log(error));
}


export {main};