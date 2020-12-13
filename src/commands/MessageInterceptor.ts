import CentralizedMiddleware from "../middleware/CentralizedMiddleware";
import {Message} from "discord.js";
import * as PWords from '../../resources/pwords.json'
import WhitelistedWordsCache from "../cache/WhitelistedWordsCache";

export default class MessageInterceptor {
    readonly centralizedMiddleware: CentralizedMiddleware;
    static whitelistedWords : WhitelistedWordsCache = new WhitelistedWordsCache();

    constructor(centralizedMiddleware: CentralizedMiddleware) {
        this.centralizedMiddleware = centralizedMiddleware;
    }

    usedPWord(message: Message): UsedPWord {
        for (let i = 0; i !== PWords.list.length; i++) {
            let currentPWord = PWords.list[i];
            let splitMessage = message.content.toLowerCase().split(" ");
            for (let j = 0; j !== splitMessage.length ; j++) {
                let word = splitMessage[j];
                if(word.includes(currentPWord) && !MessageInterceptor.whitelistedWords.isWordException(word)) return new UsedPWord(true, currentPWord);
            }
        }

        return new UsedPWord(false, undefined);
    }

    async intercepted(message: Message, edited: boolean): Promise<boolean> {
        return this.plockInterception(message, edited);
    }

    private async plockInterception(message: Message, edited: boolean): Promise<boolean> {
        let hasUsedPWord = this.usedPWord(message);

        if (hasUsedPWord.intercepted && edited) {
            message.reply("nice try lmao")
                .then(sentMessage => sentMessage.delete({timeout: 2000}))
                .catch(error => console.log(error));
        }

        //If he is already a bad man
        if (this.centralizedMiddleware.badManMiddleware.isBadMan(message.author.id) && !message.content.toLowerCase().includes("plock")) {
            message.delete()
                .then(() => message.reply(`you still didn't correct yourself, ${this.centralizedMiddleware.insultMiddleware.randomInsult}`))
                .then(sentMessage => sentMessage.delete({timeout: 10000}))
                .catch((error) => console.log(error));
            return true;
        } else if (this.centralizedMiddleware.badManMiddleware.isBadMan(message.author.id) && message.content.toLowerCase().includes("plock")) { //If he is forgiven
            await this.centralizedMiddleware.badManMiddleware.forgiveBadMan(message.author.id);
            if (this.centralizedMiddleware.guildMiddleware.badmanRole !== undefined && this.centralizedMiddleware.guildMiddleware.badmanRole !== null) await message.member.roles.remove(this.centralizedMiddleware.guildMiddleware.badmanRole)
            message.reply("good job, don't say the p-word in the future... I'll be watching you").catch(error => console.log(error));
        }
        //If he is already a bad man

        //If he said p-word
        if (hasUsedPWord.intercepted) {
            if (this.centralizedMiddleware.guildMiddleware.badmanRole !== undefined) await message.member.roles.add(this.centralizedMiddleware.guildMiddleware.badmanRole);
            await this.centralizedMiddleware.badManMiddleware.addBadMan(message.author.id, message.guild.id);

            message.delete()
                .then(() => message.reply(`It's not ${hasUsedPWord.usedWord}, it's plock, ${this.centralizedMiddleware.insultMiddleware.randomInsult}`))
                .catch(error => console.log(error));

            return true;
        }
        //If he said p-word

        return false; //If it doesn't match, default to false
    }
}

class UsedPWord {
    readonly intercepted: boolean;
    readonly usedWord: string;


    constructor(intercepted: boolean, usedWord: string) {
        this.intercepted = intercepted;
        this.usedWord = usedWord;
    }
}
