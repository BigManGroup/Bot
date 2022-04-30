import {Message} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";

function main(message : Message, formattedMessage : FormattedMessage, middleware : CentralizedMiddleware) : void{
    let timestamp = new Date();
    message.channel.send("Pong Motherfucker").then(message => {
        message.edit(`Pong Motherfucker *(${(new Date().getTime() - timestamp.getTime())}ms)*`).catch(error => console.log(error));
    });
}

export {main};