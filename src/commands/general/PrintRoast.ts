import {Message} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";

function main(message : Message, formattedMessage : FormattedMessage, middleware : CentralizedMiddleware) : void{
    if (!message.mentions.users.size)
        message.reply(middleware.roastMiddleware.randomRoast).catch(error => console.log(error));
    else {
        let taggedUser = message.mentions.users.first();

        if (taggedUser.id === taggedUser.client.user.id) {
            message.reply("nice try faggot").catch(error => console.log(error));
        }else {
            message.channel.send(`${taggedUser}, ${middleware.roastMiddleware.randomRoast}`).catch(error => console.log(error));
        }
    }
}

export {main};