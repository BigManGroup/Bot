import {Message} from "discord.js";
import FormattedMessage from "../tools/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";

 function main(message : Message, formattedMessage : FormattedMessage, middleware : CentralizedMiddleware) : void{
    message.channel.send('no u').catch(error => console.log(error));
}

export {main};