import {Message, User} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import Tools from "../../tools";

function main(message : Message, formattedMessage : FormattedMessage, middleware : CentralizedMiddleware) : void{
    let user : User;
    let changed : boolean = false;

    if(message.mentions.users.size === 0) user = message.author;
    else {
        user = message.mentions.users.first();

        if (user.id === message.client.user.id) {
            message.reply(`ask ur mum`).catch(error => console.log(error));
            return;
        }
        changed = true;
    }

    let peePee = middleware.peePeeMiddleware.getPeePee(user.id, Tools.isBigMan(message.guild, user));

    let printPeePee: string = '8';
    for (let i = 0; i != peePee.size; i++) {
        printPeePee += '='
    }
    printPeePee += 'D';

    if (changed) message.channel.send(`here's ${user} peepee\n${printPeePee}`).catch(error => console.log(error));
    else message.channel.send(`here's your peepee\n${printPeePee}`).catch(error => console.log(error));
}


export {main};