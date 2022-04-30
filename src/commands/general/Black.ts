import {Message, MessageAttachment, MessageEmbed} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import sharp from 'sharp';
import axios from 'axios';

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {
    if (!message.mentions.users.size) {
        getMonochromeEmbed(message.author.username, message.author.avatarURL()).then(embed => message.channel.send({embeds: [embed[0]], files: [embed[1]]})).catch(error => console.log(error))
        return;
    }

    let taggedUser = message.mentions.users.first();
    getMonochromeEmbed(taggedUser.username, taggedUser.avatarURL()).then(embed => message.channel.send({embeds: [embed[0]], files: [embed[1]]})).catch(error => console.log(error))
}

async function getMonochromeEmbed(username: string, url: string): Promise<[MessageEmbed, MessageAttachment]> {
    let imageInput = (await axios({url: url, responseType: "arraybuffer"})).data as Buffer;
    let sharpOutput = await sharp(imageInput).grayscale().toBuffer();
    return [new MessageEmbed().setImage(`attachment://blackedAvatar.webp`), new MessageAttachment(sharpOutput, "blackedAvatar.webp")]
}

export {main};