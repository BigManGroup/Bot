import * as jsonCommands from './commands.json'
import CommandDefinition, {ICommandDefinition} from "./CommandDefinition";

export class CommandRunner{
    private commandDefinitions : CommandDefinition[];

    constructor() {
        this.commandDefinitions = CommandRunner.extractCommandDefinition();
    }

    private hasPrefix(content: string){

    }

    //Extracts the command by searching for it using recursion
    private extractCommand(messageContent: string): CommandDefinition | undefined {
        let validCommands = this.commandDefinitions.filter(value => value.commandRegex.test(messageContent));
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
}