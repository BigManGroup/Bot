import CentralizedMiddleware from "../middleware/CentralizedMiddleware";
import {Message} from "discord.js";

export default class MessageInterceptor{
    readonly centralizedMiddleware : CentralizedMiddleware;
    readonly insults : string[] = ["cunt","bitch","retard","you cock","you fucker","you slow clubfooted bastard","you retarded scythe main kid","stupid stuck in gold"];

    constructor(centralizedMiddleware: CentralizedMiddleware) {
        this.centralizedMiddleware = centralizedMiddleware;
    }

    usedPWord(message : Message) : UsedPWord{
        let intercepted : boolean = false;
        let usedWord : string;

        if(message.content.toLowerCase().includes("please")){
            intercepted = true;
            usedWord = "please";
        }else if(message.content.toLowerCase().includes("plz")){
            intercepted = true;
            usedWord = "plz";
        }else if(message.content.toLowerCase().includes("pleaze")){
            intercepted = true;
            usedWord = "pleaze";
        }else if(message.content.toLowerCase().includes("plox")){
            intercepted = true;
            usedWord = "plox";
        }else if(message.content.toLowerCase().includes("plx")){
            intercepted = true;
            usedWord = "plx";
        }else if(message.content.toLowerCase().includes("plis")){
            intercepted = true;
            usedWord = "plis";
        }else if(message.content.toLowerCase().includes("pliz")){
            intercepted = true;
            usedWord = "pliz";
        }else if(message.content.toLowerCase().includes("pls")){
            intercepted = true;
            usedWord = "pls";
        }

        return new UsedPWord(intercepted, usedWord);
    }



    private async plockInterception(message : Message) : Promise <boolean>{
        let hasUsedPWord = this.usedPWord(message);

        //If he is already a bad man
        if(this.centralizedMiddleware.badManMiddleware.isBadMan(message.author.id) && !message.content.toLowerCase().includes("plock")){
            message.delete().then(() => message.reply(`you still didn't correct yourself, ${this.insults[Math.floor(Math.random()*this.insults.length)]}`)).catch((error) => console.log(error));
            return true;
        }else if(this.centralizedMiddleware.badManMiddleware.isBadMan(message.author.id) && message.content.toLowerCase().includes("plock")){ //If he is forgiven
            await this.centralizedMiddleware.badManMiddleware.forgiveBadMan(message.author.id);
            message.reply("good job, don't say the p-word in the future... I'll be watching you").catch(error => console.log(error));
        }
        //If he is already a bad man

        //If he said p-word
        if(hasUsedPWord.intercepted){
            message.delete().then(() => message.reply(`It's not ${hasUsedPWord.usedWord}, it's plock, ${this.insults[Math.floor(Math.random()*this.insults.length)]}`)).catch(error => console.log(error));
            await this.centralizedMiddleware.badManMiddleware.addBadMan(message.author.id);

            return true;
        }
        //If he said p-word

        return false; //If it doesn't match, default to false
    }

    async intercepted(message : Message) : Promise <boolean>{
        return this.plockInterception(message);
    }
}

class UsedPWord{
    readonly intercepted : boolean;
    readonly usedWord : string;


    constructor(intercepted: boolean, usedWord: string) {
        this.intercepted = intercepted;
        this.usedWord = usedWord;
    }
}