import {Message} from "discord.js";

export default class FormattedMessage {
    message: Message;
    prefix: string;
    contentNoPrefix: string;


    constructor(message: Message, prefix: string, contentNoPrefix: string) {
        this.message = message;
        this.prefix = prefix;
        this.contentNoPrefix = contentNoPrefix;
    }
}