import {Message} from "discord.js";
import FormattedMessage from "../tools/FormattedMessage";
import * as Roasts from "../../../resources/roasts.json"

function main(message : Message, formattedMessage : FormattedMessage) : void{
    let roasts = Roasts.accepted;

    let randomRoast = roasts[Math.floor(Math.random()*roasts.length)];

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