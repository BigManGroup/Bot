import {Message} from "discord.js";
import FormattedMessage from "../tools/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";

function main(message : Message, formattedMessage : FormattedMessage, middleware : CentralizedMiddleware) : void{
    let lenny = middleware.lennyMiddleware.lennyCache.acceptedLennys;
    let randomLenny = lenny[Math.floor(Math.random()*lenny.length)].lenny;

    if (!message.mentions.users.size)
        message.reply(randomLenny).catch(error => console.log(error));
    else {
        message.channel.send(`${message.mentions.users.first()}, ` + randomLenny).catch(error => console.log(error));
    }
}

export {main};