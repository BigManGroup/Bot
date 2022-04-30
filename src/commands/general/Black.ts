import {Message, MessageAttachment, MessageEmbed} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import sharp from 'sharp';
import axios from 'axios';

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {
    if (!message.mentions.users.size) {
        getMonochromeEmbed(message.author.username, message.author.avatarURL()).then(embed => message.channel.send(embed)).catch(error => console.log(error))
        return;
    }

    let taggedUser = message.mentions.users.first();
    getMonochromeEmbed(taggedUser.username, taggedUser.avatarURL()).then(embed => message.channel.send(embed)).catch(error => console.log(error))
}

async function getMonochromeEmbed(username: string, url: string): Promise<MessageEmbed> {
    let imageInput = (await axios({url: url, responseType: "arraybuffer"})).data as Buffer;
    let sharpOutput = await sharp(imageInput).grayscale().toBuffer();
    return new MessageEmbed()
        .attachFiles([new MessageAttachment(sharpOutput, "blackedAvatar.webp")])
        .setImage(`attachment://blackedAvatar.webp`)
}

export {main};