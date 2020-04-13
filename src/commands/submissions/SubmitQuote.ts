import {Message, MessageEmbed, TextChannel} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import Tools from "../../tools";
import Quote from "../../database/model/Quote";
import { ObjectId } from "mongodb";


function main(message : Message, formattedMessage : FormattedMessage, middleware : CentralizedMiddleware) : void {
    let roast = formattedMessage.parameters;

    //Make sure that the quote is in the correct template
    if(message.mentions.users.size === 0 || isNaN(Number(roast[roast.length - 2] || roast[roast.length - 3] !== '-'))) {
        message.delete({timeout: 5000}).then(() =>
            message.reply(`Template: 'quote-text' - 'year' 'author'`)
                .then(messageReply => messageReply.delete({timeout: 10000}))
        ).catch(error => console.log(error));
        return;
    }
    //Make sure that the quote is in the correct template

    let users = message.mentions.users.array();
    let quoteUser = users[users.length - 1].id; //Gets the user that said the quote
    let quoteYear = Number(roast[roast.length - 2]); //Gets the year the quote was said

    //Remove the last 3 things in array (year, user, -)
    roast.length = roast.length - 3;
    let quoteText = roast.join(" ");
    //Remove the last 3 things in array (year, user, -)

    Tools.isBigMan(message.guild, message.author).then(isBigMan => {
        isBigMan = false;
        if(isBigMan){
            let submittedQuote = new Quote(quoteText, String(quoteYear), quoteUser, undefined, message.author.id, new Date(), true, false);
            submittedQuote.updatedTimestamp = new Date();
            submittedQuote._id = new ObjectId();

            let embed = new MessageEmbed().setAuthor(`${message.guild.member(quoteUser).displayName} - ${quoteYear}`, message.guild.member(quoteUser).user.avatarURL()).setTitle(quoteText).setFooter(`Submitted by ${message.guild.member(message.author.id).displayName}`);
             message.reply("your submission was automatically accepted because you are a **BIGMAN**") //sends the message that the quote has been added
                 .then((sentMessage) => sentMessage.delete({timeout: 10000})) //Deletes the message to avoid bot spam
                 .then(() => middleware.quoteMiddleware.addQuote(submittedQuote)) //Adds the quote to database and cache
                 .then(() => (<TextChannel> message.guild.channels.resolve(Tools.quoteChannel)).send(embed)) //Sends the embed in bot-council
                 .then(() => message.delete()) //Deletes the user message
                 .catch(error => console.log(error));
        } else{
            let embed = new MessageEmbed().setAuthor(`${message.guild.member(quoteUser).displayName} - ${quoteYear}`, message.guild.member(quoteUser).user.avatarURL()).setTitle(quoteText).setDescription("awaiting approval by bigman").setFooter(`Submitted by ${message.guild.member(message.author.id).displayName}`);
            message.reply("your quote was submitted. bigman council wil have review it and accept/decline it") //Sends the message that the submission has been received
                .then((sentMessage) => sentMessage.delete({timeout: 10000})) //Remove the message to avoid bot-spam
                .then(() => (<TextChannel> message.guild.channels.resolve(Tools.quoteSubmissionsChannel)).send(embed) //Sends the message to submissions channel
                    .then((submissionMessage) => submissionMessage.react("✅")) //Adds the reaction good
                    .then((reactResponse) => reactResponse.message.react("❎"))  //Adds the reaction bad
                    .then((reactResponse) => middleware.quoteMiddleware.addQuote(new Quote(quoteText, String(quoteYear), quoteUser, reactResponse.message.id, message.author.id, new Date(), false, true)))) //Saved to db
                .then(() => message.delete()) //Deletes the user's submission request original message
                .catch(error => console.log(error));
        }
    })
}


export {main}