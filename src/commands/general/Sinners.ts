import {Message} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";

function main(message : Message, formattedMessage : FormattedMessage, middleware : CentralizedMiddleware) : void {
    let amount = middleware.badManMiddleware.amountSinners;
    if(amount === 0){
        message.channel.send({content: `Thanks to the ***ALMIGHTY GOD OF PLOCK***, there are none`}).catch((error) => console.log(error));
    }else if(amount === 1){
        message.channel.send({content: `There is only one sinner: <@${middleware.badManMiddleware.sinners[0].user}>`}).catch((error) => console.log(error));
    }else{
        let sinners = middleware.badManMiddleware.sinners;

        let output = "people who used the p word:\n"
        for (let i = 0; i !== sinners.length ; i++) {
            output += `<@${sinners[i].user}>\n`
        }
        output += "shame on you";

        message.channel.send({content: output}).catch((error) => console.log(error));
    }
}

export {main}