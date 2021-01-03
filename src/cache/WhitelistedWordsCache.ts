import {readFileSync} from "fs";
import * as badWords from '../../resources/pwords.json';

export default class WhitelistedWordsCache{
    private readonly wordList: string[];

    constructor() {
        this.wordList = [];
        this.buildCache();
    }

    buildCache() {
        this.extractWords(WhitelistedWordsCache.readFile("maltesewords.txt"))
        this.extractWords(WhitelistedWordsCache.readFile("englishwords.txt"))
    }

    private extractWords(words : string[]){
        for (let i = 0; i !== words.length ; i++) {
            let currentWord = words[i].toLowerCase();
            for (let j = 0; j !== badWords.list.length ; j++) {
                if(currentWord.includes(badWords.list[j])) this.addCache(currentWord);
            }
        }
    }

    private static readFile(fileName: string): string[] {
        return readFileSync(__dirname + `/../../resources/words/${fileName}`, {encoding: 'utf-8'}).split("\n");
    }

    isWordException(word: string): boolean {
        for (let i = 0; i !== this.wordList.length; i++) {
            if (word.includes(this.wordList[i])) return true;
        }
        return false;
    }

    private addCache(word: string) {
        this.wordList.push(word.trimEnd());
    }
}