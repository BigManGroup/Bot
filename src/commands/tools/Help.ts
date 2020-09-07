import {Message, MessageEmbed, TextChannel} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";

import * as Commands from '../../../resources/commands.json'
import Tools from "../../tools";

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {

    if(formattedMessage.parameters[0] === undefined || !(formattedMessage.parameters[0].toLowerCase() === "general" || formattedMessage.parameters[0].toLowerCase() === "game" || formattedMessage.parameters[0].toLowerCase() === "tools" || formattedMessage.parameters[0].toLowerCase() === "submissions" || formattedMessage.parameters[0].toLowerCase() === "admin")) {
        let outputArray: String[] = [];
        let prefix = 0;
        if (Tools.isBigMan(message.guild, middleware.guildMiddleware.bigmanRole, message.author.id)) outputArray.push(++prefix + ". Admin");
        outputArray.push(++prefix + ". General")
        outputArray.push(++prefix + ". Game")
        outputArray.push(++prefix + ". Tools")
        outputArray.push(++prefix + ". Submissions")

        message.channel.send("```" + outputArray.join("\n") + "```").then(() => {
            message.channel.awaitMessages(m => message.author.id === m.author.id, {max: 1, time: 15000})
                .then(collected => {
                    let message = collected.first();

                    let category = (Number(message.content));
                    if(isNaN(category) || category > outputArray.length || category <= 0) {
                        message.channel.send("That's an invalid number " + middleware.insultMiddleware.randomInsult).catch(error => console.log(error));
                        return;
                    }

                    let categoryFormatted = outputArray[--category].substring(3);
                    message.channel.send(buildEmbed(categoryFormatted)).catch(error => console.log(error))
                });
        });
    }else if(formattedMessage.parameters[0].toLowerCase() === "general" || formattedMessage.parameters[0].toLowerCase() === "game" || formattedMessage.parameters[0].toLowerCase() === "tools" || formattedMessage.parameters[0].toLowerCase() === "submissions"){
        message.channel.send(buildEmbed(formattedMessage.parameters[0])).catch(error => console.log(error));
    }else if(formattedMessage.parameters[0].toLowerCase() === "admin" && Tools.isBigMan(message.guild, middleware.guildMiddleware.bigmanRole, message.author.id)){
        message.channel.send(buildEmbed(formattedMessage.parameters[0])).catch(error => console.log(error));
    }else if(formattedMessage.parameters[0].toLowerCase() === "admin" && !Tools.isBigMan(message.guild, middleware.guildMiddleware.bigmanRole, message.author.id)){
        message.reply(`nice try, unprivileged ${message.member.roles.highest.name}`).catch(error => console.log(error));
    }else {
        message.channel.send(`How the fuck did you end up in this part of the code ${middleware.insultMiddleware.randomInsult}`).catch(error => console.log(error));
    }
}

function buildEmbed(category : string) : MessageEmbed{
    let allCommands = Commands.commands;

    let embed = new MessageEmbed().setTitle(Tools.titleCase(category) + " Help")

    for (let i = 0; i !== allCommands.length; i++) {
        let currentCommand = allCommands [i];
        if(!currentCommand.hidden && currentCommand.folder.startsWith(category.toLowerCase())) {
            embed.addField(currentCommand.command, currentCommand.description);
        }
    }

    return embed;
}

export {main}