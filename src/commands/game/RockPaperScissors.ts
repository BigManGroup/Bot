import {Message} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import Tools from "../../tools";

function main(message : Message, formattedMessage : FormattedMessage, middleware : CentralizedMiddleware) : void {
    let number = Tools.getRandomNumber(0, 2);
    let userSelection = formattedMessage.parameters[0];

    if(userSelection === undefined || (userSelection !== "rock" && userSelection !== "paper" && userSelection !== "scissors")){
        if(number === 0) message.reply("rock").catch((error) => console.log(error));
        else if(number === 1) message.reply("paper").catch((error) => console.log(error));
        else if(number === 2) message.reply("scissors").catch((error) => console.log(error));
    }else if(userSelection === "rock"){
        if(number === 0) message.reply("we both rock").catch((error) => console.log(error));
        else if(number === 1) message.reply("i chose paper, get fucked").catch((error) => console.log(error));
        else if(number === 2) message.reply("i chose scissors, you win").catch((error) => console.log(error));
    }else if(userSelection === "paper"){
        if(number === 0) message.reply("i chose rock, you win").catch((error) => console.log(error));
        else if(number === 1) message.reply("i chose paper, let's smash").catch((error) => console.log(error));
        else if(number === 2) message.reply("scissors, get fucked").catch((error) => console.log(error));
    }else if(userSelection === "scissors"){
        if(number === 0) message.reply("i chose rock, get fucked").catch((error) => console.log(error));
        else if(number === 1) message.reply("i chose paper, you win").catch((error) => console.log(error));
        else if(number === 2) message.reply("we both chose the same, let's scissor").catch((error) => console.log(error));
    }
}

export {main};