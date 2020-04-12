import {Message, MessageEmbed} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";

import * as Commands from '../../../resources/commands.json'
import Tools from "../../tools";

function main(message : Message, formattedMessage : FormattedMessage, middleware : CentralizedMiddleware) : void {
    let allCommands = Commands.commands;

    let adminCommands : string = "";
    let gameCommands : string = "";
    let generalCommands : string = "";
    let toolsCommands : string = "";

    let embed = new MessageEmbed()
        .setTitle("Help Command")
        .setDescription("do i really have to explain what this command is?");


    for (let i = 0; i !== allCommands.length ; i++) {
        let currentCommand = allCommands[i];

        if(currentCommand.folder === 'tools' && !currentCommand.hidden) toolsCommands += `**${currentCommand.command}**\n${currentCommand.description}\n\n`;
        else if(currentCommand.folder === 'general' && !currentCommand.hidden) generalCommands += `**${currentCommand.command}**\n${currentCommand.description}\n\n`;
        else if(currentCommand.folder === 'game' && !currentCommand.hidden) gameCommands += `**${currentCommand.command}**\n${currentCommand.description}\n\n`;
        else if(currentCommand.folder === 'admin' && !currentCommand.hidden) adminCommands += `**${currentCommand.command}**\n${currentCommand.description}\n\n`;
    }

    Tools.isBigMan(message.guild, message.author).then(isBigMan => {
        if(isBigMan) embed.addField("admin commands", adminCommands)

        embed.addField("general commands", generalCommands);
        embed.addField("tool commands", toolsCommands);
        embed.addField("game commands", gameCommands);

        message.channel.send(embed).catch();
    });
}

export {main}