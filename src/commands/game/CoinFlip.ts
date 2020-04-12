import {Message} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import Tools from "../../tools";

function main(message : Message, formattedMessage : FormattedMessage, middleware : CentralizedMiddleware) : void {
    let number = Tools.getRandomNumber(0, 1);

    if(number === 0) message.reply("heads").catch((error) => console.log(error));
    if(number === 1) message.reply("tails").catch((error) => console.log(error));
}

export {main};