import {Message} from "discord.js";
import FormattedMessage from "../../model/FormattedMessage";
import CentralizedMiddleware from "../../../middleware/CentralizedMiddleware";
import Tools from "../../../tools";

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {
    if (!Tools.isBigMan(message.guild, middleware.guildMiddleware.bigmanRole, message.author.id)) {
        message.reply({content: `nice try, unprivileged ${message.member.roles.highest.name}`}).catch(error => console.log(error));
        return;
    }

    let channel = formattedMessage.parameters[0];

    if (!message.guild.channels.cache.has(channel)) {
        message.reply({content: `you entered an invalid channel, ${middleware.insultMiddleware.randomInsult}`}).catch(error => console.log(error));
        return;
    }

    middleware.guildMiddleware.setMusicChannel(channel).then(() => message.reply({content: "Music channel updated"})).catch(error => console.log(error));
}

export {main}