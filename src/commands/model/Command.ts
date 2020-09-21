//A general object that will store data about all the commands
export default class Command{
    readonly fileName: string;
    readonly command : string;
    readonly description : string;
    readonly folder : string;
    readonly hidden : boolean;
    readonly prefix: boolean;
    readonly run: any;

    constructor(fileName : string, command : string, description : string, folder : string, hidden : boolean, prefix : boolean) {
        this.fileName = fileName;
        this.command = command;
        this.description = description;
        this.folder = folder;
        this.hidden = hidden;
        this.prefix = prefix;

        this.run = require(`../${folder}/${fileName}`).main;
    }
}
//A general object that will store data about all the commands