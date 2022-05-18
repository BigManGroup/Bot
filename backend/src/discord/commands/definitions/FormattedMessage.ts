import {Message} from "discord.js";
import {CommandOptions} from "../../../database/model/guild/Guild";
import CommandDefinition from "./CommandDefinition";

export default class FormattedMessage {
    message: Message;
    prefix: string;
    contentNoPrefix: string;
    commandDefinition : CommandDefinition;


    constructor(message: Message, prefix: string, contentNoPrefix: string, commandDefinition : CommandDefinition) {
        this.message = message;
        this.prefix = prefix;
        this.contentNoPrefix = contentNoPrefix;
        this.commandDefinition = commandDefinition;
    }
}