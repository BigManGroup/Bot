import * as jsonCommands from './commands.json'
import CommandDefinition, {ICommandDefinition} from "./definitions/CommandDefinition";
import GuildCache from "../../database/cache/GuildCache";
import {Message, PermissionResolvable, PermissionsBitField} from "discord.js";
import FormattedMessage from "./definitions/FormattedMessage";
import GuildCommandDefinition from "./definitions/GuildCommandDefinition";
import isAdminMember from "../helpers/IsAdminMember";

class CommandRunner{
    private readonly defaultCommandDefinitions : CommandDefinition[];

    constructor() {
        this.defaultCommandDefinitions = CommandRunner.extractCommandDefinition();
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
    private extractCommand(messageContent: string, prefix: boolean, commandDefinitions? : CommandDefinition[]): CommandDefinition | undefined {
        let query = commandDefinitions ?? this.defaultCommandDefinitions;

        let validCommands = query
            .filter(value => (value.commandRegex.test(messageContent)) && (value.prefix === prefix))
            .filter(value => (!(value instanceof GuildCommandDefinition)) || (value instanceof GuildCommandDefinition && !value.disabled));

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
            //Check if the command has a prefix or not
            let prefix = await this.extractPrefix(message);
            let content = prefix ? message.content.substring(prefix.length + 1, message.content.length) : message.content;
            //Check if the command has a prefix or not

            //Get the guild command definitions
            let guild = await GuildCache.getGuild(message.guildId);
            let customCommandDefinitions = guild.additionalInformation.getFormattedCommandOptions(this.defaultCommandDefinitions);
            //Get the guild command definitions

            //Extract the command (checking for prefix) and custom command definitions
            let command = this.extractCommand(content, prefix !== undefined, customCommandDefinitions);
            if(!command) return; //no command was found
            //Extract the command (checking for prefix)

            if(command.adminOnly && !(await isAdminMember(message.member, message.guild))) return; //If command admin only and the command does not exist, return

            //If the bot does not have permission to run the command, return
            let permissionResolvable = PermissionsBitField.resolve(command.permissions as PermissionResolvable);
            if(!(message.guild.me.permissions.has(permissionResolvable))) return;
            //If the bot does not have permission to run the command, return

            //Run the command
            let formattedMessage = new FormattedMessage(message, prefix, content, command);
            command.runner.run(formattedMessage).catch(error => {
                console.error("Error thrown during running of command: ", formattedMessage);
                console.error(error);
            });
            //Run the command
        });
    }
}

export default (new CommandRunner());