import Command from "./Command";

export default class CommandDefinition {
    id: string;
    filename: string;
    folder: string;
    commands: string[];
    description: string;
    hidden: boolean;
    prefix : boolean;
    adminOnly: boolean;
    permissions: string[]

    constructor(commandDefinition : ICommandDefinition) {
        this.id = commandDefinition.id;
        this.filename = commandDefinition.filename;
        this.folder = commandDefinition.folder;
        this.commands = commandDefinition.commands;
        this.description = commandDefinition.description;
        this.hidden = commandDefinition.hidden;
        this.prefix = commandDefinition.prefix;
        this.adminOnly = commandDefinition.adminOnly;
        this.permissions = commandDefinition.permissions;
    }

    get commandRegex() : RegExp{
        let regexSpaces = this.commands.map(value => value.replace(" ", "\\s")); //Replace any spaces with /s
        let regex = `^(${regexSpaces.join("|")})`

        return new RegExp(regex, "gi")
    }

    get runner(): Command{
        return require(`../${this.folder}/${this.filename}`).default;
    }
}

export interface ICommandDefinition{
    id: string;
    filename: string;
    folder: string;
    commands: string[];
    description: string;
    hidden: boolean;
    prefix : boolean;
    adminOnly: boolean;
    permissions: string[]
}