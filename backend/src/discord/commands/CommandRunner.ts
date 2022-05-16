import * as jsonCommands from './commands.json'
import CommandDefinition, {ICommandDefinition} from "./CommandDefinition";
import GuildCache from "../../database/cache/GuildCache";
import {Message} from "discord.js";

class CommandRunner{
    private commandDefinitions : CommandDefinition[];

    constructor() {
        this.commandDefinitions = CommandRunner.extractCommandDefinition();
    }

    private async extractPrefix(message: Message) : Promise <string|undefined>{
        let guild = await GuildCache.getGuild(message.guild.id);
        let guildPrefix = guild.additionalInformation.prefixes;

        let prefixFound = guildPrefix
            .filter(value => message.content.startsWith(value))
            .sort((a,b) => b.length - a.length)[0]; //Get the longest item in the array

        return prefixFound ?? undefined;
    }

    //Extracts the command by searching for it using recursion
    private extractCommand(messageContent: string, prefix: boolean): CommandDefinition | undefined {
        let validCommands = this.commandDefinitions
            .filter(value => (value.commandRegex.test(messageContent)) && (value.prefix === prefix));

        return validCommands[0];
    }

    private static extractCommandDefinition(): CommandDefinition[]{
        let commands : CommandDefinition[] = [];
        Object.keys(jsonCommands).forEach(key => {
            if(key === "default") return;
            let folder = key;

            // @ts-ignore
            let currentCommands : any[] = jsonCommands[key];
            let folderCommands = currentCommands.map((value: ICommandDefinition) => new CommandDefinition(value));
            folderCommands.forEach(value => value.folder = folder);

             commands.push(...folderCommands);
        });

        return commands;
    }

    public runCommand(message: Message) : Promise<void>{
        return new Promise<void>(async () => {
            let prefix = await this.extractPrefix(message);
            let content = prefix ? message.content.substring(prefix.length + 1, message.content.length) : message.content;
            let command = this.extractCommand(content, prefix !== undefined);

            if(!command) return; //no command was found


        });
        //Check if the command has a prefix right now
    }
}