import {Message} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";

function main(message : Message, formattedMessage : FormattedMessage, middleware : CentralizedMiddleware) : void{
    if (!message.mentions.users.size)
        message.reply({content: middleware.lennyMiddleware.randomLenny}).catch(error => console.log(error));
    else {
        message.channel.send({content: `${message.mentions.users.first()}, ${middleware.lennyMiddleware.randomLenny}`}).catch(error => console.log(error));
    }
}

export {main};