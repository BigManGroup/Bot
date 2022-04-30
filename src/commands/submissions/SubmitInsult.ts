import {Message, MessageEmbed, TextChannel} from "discord.js";
import {ObjectId} from "mongodb";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import Tools from "../../tools";
import VotingHandler from "../../voting/VotingHandler";
import Insult from "../../database/model/Insult";

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {
    let insultText = formattedMessage.parameters.join(" ");
    if (!insultText.replace(/\s/g, '').length) {
        message.reply(`You have to actually enter the insult, ${middleware.insultMiddleware.randomInsult}`).catch(error => console.log(error));
        return;
    }

    let isBigMan = Tools.isBigMan(message.guild, middleware.guildMiddleware.bigmanRole, message.author.id);

    if (isBigMan) {
        message.reply("your insult was automatically submitted because you are **BIGMAN**").then(async (sentMessage) => {
            let submittedInsult = new Insult(insultText, message.guild.id, undefined, message.author.id, new Date(), true, false);
            submittedInsult.updatedTimestamp = new Date();
            submittedInsult._id = new ObjectId();
            await middleware.insultMiddleware.addInsult(submittedInsult)

            await sentMessage.delete({timeout: 10000}) //Deletes the message to avoid bot spam
            await message.delete(); //Deletes the user message
        });
    } else if (!isBigMan && middleware.guildMiddleware.insultSubmission !== undefined && middleware.guildMiddleware.insultSubmission !== null) {
        message.reply("your insult was submitted. bigman council will review it and accept/decline it").then(async (sentMessage) => {  //Sends the message that the submission has been received
            let embed = new MessageEmbed().setAuthor(`${message.member.displayName}`, message.member.user.avatarURL()).setTitle(insultText).setDescription("awaiting approval by bigman");
            let submissionMessage = await (<TextChannel>message.guild.channels.resolve(middleware.guildMiddleware.insultSubmission)).send(embed) //Sends the message to submissions channel
            await submissionMessage.react(VotingHandler.approveReaction);
            await submissionMessage.react(VotingHandler.declineReaction);

            let insult = new Insult(insultText, message.guild.id, submissionMessage.id, message.author.id, new Date(), false, true);
            insult._id = new ObjectId();
            await middleware.insultMiddleware.addInsult(insult)

            await sentMessage.delete({timeout: 10000}) //Remove the message to avoid bot-spam
            await message.delete();
        });
    } else if (!isBigMan && (middleware.guildMiddleware.insultSubmission === undefined || middleware.guildMiddleware.insultSubmission === null)) {
        message.reply("Admins have not set the submission channel\nFeature is disabled").catch(error => console.log(error));
    }
}

export {main}