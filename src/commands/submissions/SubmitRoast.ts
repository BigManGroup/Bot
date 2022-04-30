import {Message, MessageEmbed, TextChannel} from "discord.js";
import {ObjectId} from "mongodb";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import Tools from "../../tools";
import Roast from "../../database/model/Roast";
import VotingHandler from "../../voting/VotingHandler";

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {
    let roastText = formattedMessage.parameters.join(" ");
    if (!roastText.replace(/\s/g, '').length) {
        message.reply(`You have to actually enter the roast, ${middleware.insultMiddleware.randomInsult}`).catch(error => console.log(error));
        return;
    }

    let isBigMan = Tools.isBigMan(message.guild, middleware.guildMiddleware.bigmanRole, message.author.id);

    if (isBigMan) {
        message.reply("your roast was automatically submitted because you are **BIGMAN**").then(async (sentMessage) => {
            let submittedRoast = new Roast(roastText, message.guild.id, undefined, message.author.id, new Date(), true, false);
            submittedRoast.updatedTimestamp = new Date();
            submittedRoast._id = new ObjectId();
            await middleware.roastMiddleware.addRoast(submittedRoast);

            await setTimeout(() => sentMessage.delete(), 10000) //Deletes the message to avoid bot spam
            await message.delete(); //Deletes the user message
        });
    } else if (!isBigMan && middleware.guildMiddleware.quoteSubmission !== undefined && middleware.guildMiddleware.quoteSubmission !== null) {
        message.reply("your roast was submitted. bigman council will review it and accept/decline it").then(async (sentMessage) => {  //Sends the message that the submission has been received
            let embed = new MessageEmbed()
                .setAuthor({name: `${message.member.displayName}`, iconURL: message.member.user.avatarURL()})
                .setTitle(roastText)
                .setDescription("awaiting approval by bigman");

            let submissionMessage = await (<TextChannel>message.guild.channels.resolve(middleware.guildMiddleware.roastSubmission)).send({embeds: [embed]}) //Sends the message to submissions channel
            await submissionMessage.react(VotingHandler.approveReaction);
            await submissionMessage.react(VotingHandler.declineReaction);

            let roast = new Roast(roastText, message.guild.id, submissionMessage.id, message.author.id, new Date(), false, true);
            roast._id = new ObjectId();
            await middleware.roastMiddleware.addRoast(roast)

            await setTimeout(() => sentMessage.delete(), 10000) //Remove the message to avoid bot-spam
            await message.delete();
        });
    } else if (!isBigMan && (middleware.guildMiddleware.insultSubmission === undefined || middleware.guildMiddleware.insultSubmission === null)) {
        message.reply("Admins have not set the submission channel\nFeature is disabled").catch(error => console.log(error));
    }
}

export {main}