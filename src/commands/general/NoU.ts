import {Message} from "discord.js";
import FormattedMessage from "../tools/FormattedMessage";

 function main(message : Message, formattedMessage : FormattedMessage) : void{
    message.channel.send('no u').catch(error => console.log(error));
}

export {main};