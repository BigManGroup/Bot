import {Message} from "discord.js";
import {MessageEmbed} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";

function main(message : Message, formattedMessage : FormattedMessage, middleware : CentralizedMiddleware) : void {
    if (!message.mentions.users.size){
        const embed = new MessageEmbed()
            .setTitle(`${message.author.username}'s avatar`)
            .setImage(message.author.avatarURL());

        message.channel.send(embed).catch(error => console.log(error));
        return;
    }

    let taggedUser = message.mentions.users.first();

    const embed = new MessageEmbed()
        .setTitle(`${taggedUser.username}'s avatar`)
        .setImage(taggedUser.avatarURL());

    message.channel.send(embed).catch(error => console.log(error));
}

export {main};