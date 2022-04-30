import {Message} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";
import Tools from "../../tools";

function main(message : Message, formattedMessage : FormattedMessage, middleware : CentralizedMiddleware) : void {
    let number = Tools.getRandomNumber(0, 2);
    let userSelection = formattedMessage.parameters[0];

    if(userSelection === undefined || (userSelection !== "rock" && userSelection !== "paper" && userSelection !== "scissors")){
        if(number === 0) message.reply({content: "rock"}).catch((error) => console.log(error));
        else if(number === 1) message.reply({content: "paper"}).catch((error) => console.log(error));
        else if(number === 2) message.reply({content: "scissors"}).catch((error) => console.log(error));
    }else if(userSelection === "rock"){
        if(number === 0) message.reply({content: "we both rock"}).catch((error) => console.log(error));
        else if(number === 1) message.reply({content: "i chose paper, get fucked"}).catch((error) => console.log(error));
        else if(number === 2) message.reply({content: "i chose scissors, you win"}).catch((error) => console.log(error));
    }else if(userSelection === "paper"){
        if(number === 0) message.reply({content: "i chose rock, you win"}).catch((error) => console.log(error));
        else if(number === 1) message.reply({content: "i chose paper, let's smash"}).catch((error) => console.log(error));
        else if(number === 2) message.reply({content: "scissors, get fucked"}).catch((error) => console.log(error));
    }else if(userSelection === "scissors"){
        if(number === 0) message.reply({content: "i chose rock, get fucked"}).catch((error) => console.log(error));
        else if(number === 1) message.reply({content: "i chose paper, you win"}).catch((error) => console.log(error));
        else if(number === 2) message.reply({content: "we both chose the same, let's scissor"}).catch((error) => console.log(error));
    }
}

export {main};