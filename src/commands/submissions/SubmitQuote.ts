import {Message, MessageEmbed, TextChannel} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import Tools from "../../tools";
import Quote from "../../database/model/Quote";
import { ObjectId } from "mongodb";

let submissionChannel = '698923581832298617';
let quotesChannel = "669245652664057867";

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
        if(isBigMan){
            let submittedQuote = new Quote(quoteText, String(quoteYear), quoteUser, undefined, message.author.id, new Date(), true, false);
            submittedQuote.updatedTimestamp = new Date();
            submittedQuote._id = new ObjectId();

            let embed = new MessageEmbed().setAuthor(`${message.guild.member(quoteUser).displayName} (${quoteYear})`, message.guild.member(quoteUser).user.avatarURL()).setTitle(quoteText).setFooter(`Submitted by ${message.guild.member(message.author.id).displayName}`);

            message.delete({timeout: 10000})
                .then(()=> message.reply("your submission was automatically accepted because you are a **BIGMAN**"))
                .then((sentMessage) => message.delete({timeout: 10000}))
                .then(() => middleware.quoteMiddleware.addQuote(submittedQuote))
                .then(() => (<TextChannel> message.guild.channels.resolve(quotesChannel)).send(embed))
                .catch(error => console.log(error));
        } else{
            message.reply("Feature in progress"); //TODO implement this
        }
    })

}


export {main}