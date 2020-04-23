import {Message, MessageEmbed, TextChannel} from "discord.js";
import {ObjectId} from "mongodb";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import Tools from "../../tools";
import Roast from "../../database/model/Roast";
import RoastVoteHandler from "../../voting/RoastVoteHandler";
import VotingHandler from "../../voting/VotingHandler";

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {
    let roastText = formattedMessage.parameters.join(" ");

    let isBigMan = Tools.isBigMan(message.guild, message.author);

    if (isBigMan) {
        message.reply("your roast was automatically submitted because you are **BIGMAN**").then(async (sentMessage) => {
            let submittedRoast = new Roast(roastText, message.guild.id, undefined, message.author.id, new Date(), true, false);
            submittedRoast.updatedTimestamp = new Date();
            submittedRoast._id = new ObjectId();
            await middleware.roastMiddleware.addRoast(submittedRoast);

            await sentMessage.delete({timeout: 10000}) //Deletes the message to avoid bot spam
            await message.delete(); //Deletes the user message
        });
    } else {
        message.reply("your roast was submitted. bigman council will review it and accept/decline it").then(async (sentMessage) => {  //Sends the message that the submission has been received
            let embed = new MessageEmbed().setAuthor(`${message.member.displayName}`, message.member.user.avatarURL()).setTitle(roastText).setDescription("awaiting approval by bigman");
            let submissionMessage = await (<TextChannel>message.guild.channels.resolve(RoastVoteHandler.roastSubmissionChannel)).send(embed) //Sends the message to submissions channel
            await submissionMessage.react(VotingHandler.approveReaction);
            await submissionMessage.react(VotingHandler.declineReaction);

            let roast = new Roast(roastText, message.guild.id, submissionMessage.id, message.author.id, new Date(), false, true);
            roast._id = new ObjectId();
            await middleware.roastMiddleware.addRoast(roast)

            await sentMessage.delete({timeout: 10000}) //Remove the message to avoid bot-spam
            await message.delete();
        });
    }
}

export {main}