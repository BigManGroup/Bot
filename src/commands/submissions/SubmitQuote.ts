import {Message, MessageEmbed, TextChannel} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import Quote from "../../database/model/Quote";
import {ObjectId} from "mongodb";
import VotingHandler from "../../voting/VotingHandler";


async function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): Promise<void> {
    let roast = formattedMessage.parameters;

    //Make sure that the quote is in the correct template
    if (message.mentions.users.size === 0 || isNaN(Number(roast[roast.length - 2] || roast[roast.length - 3] !== '-'))) {
        message.reply({content: `Template: 'quote-text' - 'year' 'author'`})
            .then(messageReply => setTimeout(() => messageReply.delete(), 10000))
            .then(() => message.delete())
            .catch(error => console.log(error));
        return;
    }
    //Make sure that the quote is in the correct template

    let users = Array.from(message.mentions.users.values());
    let quoteUser = users[users.length - 1].id; //Gets the user that said the quote
    let quoteYear = Number(roast[roast.length - 2]); //Gets the year the quote was said

    //Remove the last 3 things in array (year, user, -)
    roast.length = roast.length - 3;
    let quoteText = roast.join(" ");
    //Remove the last 3 things in array (year, user, -)

    if (middleware.guildMiddleware.quoteSubmission === undefined || middleware.guildMiddleware.quoteSubmission === null) {
        message.reply({content: "Admins have not set the submission channel\nFeature is disabled"}).catch(error => console.log(error));
        return;
    }

    let author = await message.guild.members.fetch(quoteUser);
    let submitter = await message.guild.members.fetch(message.author.id)

    let embed = new MessageEmbed()
        .setAuthor({
            name: `${author.displayName} - ${quoteYear}`,
            iconURL: author.avatarURL()
        }) //`${message.guild.member(quoteUser).displayName} - ${quoteYear}`, message.guild.member(quoteUser).user.avatarURL()
        .setTitle(quoteText).setDescription("awaiting approval by bigman")
        .setFooter({text: `Submitted by ${submitter.displayName}`}); //`Submitted by ${message.guild.member(message.author.id).displayName}`


    message.reply({content: "your quote was submitted. bigman council will review it and accept/decline it"}) //Sends the message that the submission has been received
        .then(async (sentMessage) => {
            let submissionMessage = await (<TextChannel>message.guild.channels.resolve(middleware.guildMiddleware.quoteSubmission)).send({embeds: [embed]}) //Sends the message to submissions channel
            await submissionMessage.react(VotingHandler.approveReaction);
            await submissionMessage.react(VotingHandler.declineReaction);

            let quote = new Quote(quoteText, String(quoteYear), quoteUser, message.guild.id, submissionMessage.id, message.author.id, new Date(), false, true);
            quote._id = new ObjectId();
            await middleware.quoteMiddleware.addQuote(quote)

            await setTimeout(() => sentMessage.delete(), 10000) //Remove the message to avoid bot-spam
            await message.delete();
        })
        .catch(error => console.log(error));
}


export {main}