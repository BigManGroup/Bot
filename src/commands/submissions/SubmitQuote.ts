import {Message} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import Tools from "../../tools";

let submissionChannel = '698923581832298617';

function main(message : Message, formattedMessage : FormattedMessage, middleware : CentralizedMiddleware) : void {
    let roast = formattedMessage.parameters;
    if(message.mentions.users.size === 0 || isNaN(Number(roast[roast.length - 2] || roast[roast.length - 3] !== '-'))) {
        message.delete().then(() =>
            message.reply(`Template: 'quote-text' - 'year' 'author'`)
                .then(messageReply => messageReply.delete({timeout: 10000}))
        ).catch(error => console.log(error));
        return;
    }

    let quoteUser = roast[roast.length - 1];
    let quoteYear = Number(roast[roast.length - 2]);

    //Remove the last 3 things in array (year, user, -)
    roast.length = roast.length - 3;
    let quoteText = roast.join(" ");
    //Remove the last 3 things in array (year, user, -)

    Tools.isBigMan(message.guild, message.author).then(isBigMan => {
        if(isBigMan){
            message.reply("your submission was automatically accepted because you are a bigman");
            //TODO Update cache and database
        }
    })
}

export {main}