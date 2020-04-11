import {Message} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";

function main(message : Message, formattedMessage : FormattedMessage, middleware : CentralizedMiddleware) : void{
    let roasts = middleware.roastMiddleware.roastCache.acceptedRoasts;
    let randomRoast = roasts[Math.floor(Math.random()*roasts.length)].roast;

    if (!message.mentions.users.size)
        message.reply(randomRoast).catch(error => console.log(error));
    else {
        let taggedUser = message.mentions.users.first();

        if (taggedUser.bot) {
            message.reply("nice try faggot").catch(error => console.log(error));
        }else {
            message.channel.send(`${taggedUser}, ` + randomRoast).catch(error => console.log(error));
        }
    }
}

export {main};