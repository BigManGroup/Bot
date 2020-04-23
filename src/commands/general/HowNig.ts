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
            message.reply(`ask ur dad`).catch(error => console.log(error));
            return;
        }
        changed = true;
    }

    let nig = middleware.nigMiddleware.getNig(user.id, message.guild.id, Tools.isBigMan(message.guild, user));

    if (changed) message.channel.send(`here's ${user} nig amount\n**${nig.amount}%**`).catch(error => console.log(error));
    else message.channel.send(`here's your nig amount\n**${nig.amount}%**`).catch(error => console.log(error));
}


export {main};