import {Message, MessageEmbed, TextChannel} from "discord.js";
import {ObjectId} from "mongodb";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import Tools from "../../tools";
import VotingHandler from "../../voting/VotingHandler";
import Insult from "../../database/model/Insult";
import InsultVoteHandler from "../../voting/InsultVoteHandler";

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {
    let insultText = formattedMessage.parameters.join(" ");

    let isBigMan = Tools.isBigMan(message.guild, message.author);

    if (isBigMan) {
        message.reply("your insult was automatically submitted because you are **BIGMAN**").then(async (sentMessage) => {
            let submittedInsult = new Insult(insultText, undefined, message.author.id, new Date(), true, false);
            submittedInsult.updatedTimestamp = new Date();
            submittedInsult._id = new ObjectId();
            await middleware.insultMiddleware.addInsult(submittedInsult);
        });
    } else {
        message.reply("your insult was submitted. bigman council will review it and accept/decline it").then(async (sentMessage) => {  //Sends the message that the submission has been received
            let embed = new MessageEmbed().setAuthor(`${message.member.displayName}`, message.member.user.avatarURL()).setTitle(insultText).setDescription("awaiting approval by bigman");
            let submissionMessage = await (<TextChannel>message.guild.channels.resolve(InsultVoteHandler.insultSubmissionsChannel)).send(embed) //Sends the message to submissions channel
            await submissionMessage.react(VotingHandler.approveReaction);
            await submissionMessage.react(VotingHandler.declineReaction);

            let insult = new Insult(insultText, submissionMessage.id, message.author.id, new Date(), false, true);
            insult._id = new ObjectId();
            await middleware.insultMiddleware.addInsult(insult)

            await sentMessage.delete({timeout: 10000}) //Remove the message to avoid bot-spam
            await message.delete();
        });
    }
}

export {main}