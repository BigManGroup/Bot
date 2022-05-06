import Command from "./Command";

export default class CommandDefinition {
    id: string;
    filename: string;
    folder: string;
    command: string | RegExp;
    description: string;
    hidden: boolean;
    prefix : boolean;
    permissions: string[]

    get runner(): Command{
        return require(`../${this.folder}/${this.filename}`);
    }
}