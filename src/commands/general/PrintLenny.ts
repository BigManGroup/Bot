import {Message} from "discord.js";
import FormattedMessage from "../tools/FormattedMessage";
import * as Lenny from "../../../resources/lennys.json"

function main(message : Message, formattedMessage : FormattedMessage) : void{
    let lenny = Lenny.list;

    let randomLenny = lenny[Math.floor(Math.random()*lenny.length)];

    if (!message.mentions.users.size)
        message.reply(randomLenny).catch(error => console.log(error));
    else {
        let taggedUser = message.mentions.users.first();
        message.channel.send(`${message.mentions.users.first()}, ` + randomLenny).catch(error => console.log(error));
    }
}

export {main};