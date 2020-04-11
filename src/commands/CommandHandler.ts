import {Message} from "discord.js";
import * as LoadedCommands from '../../resources/commands.json';
import Command from "./tools/Command";
import FormattedMessage from "./tools/FormattedMessage";
import CentralizedMiddleware from "../middleware/CentralizedMiddleware";

export default class CommandHandler{
    readonly nonPrefixCommands: Map<string, Command>;
    readonly prefixCommands : Map<string, Command>;
    allCommands : Map <string, Command>;

    readonly prefixRegex : RegExp;
    readonly centralizedMiddleware : CentralizedMiddleware;


    constructor(prefix : string, centralizedMiddleware : CentralizedMiddleware) {
        Command.prefix = prefix; //Set the general prefix
        this.prefixRegex = new RegExp("^(["+prefix+"])"); //Set the regex

        this.nonPrefixCommands = new Map<string, Command>();
        this.prefixCommands = new Map<string, Command>();
        this.centralizedMiddleware = centralizedMiddleware;

        this.loadCommands();
    }

    loadCommands() : void{
        let loadedCommands = LoadedCommands.commands;

        for (let i = 0; i !== loadedCommands.length; i++) {
            let current = loadedCommands[i];
            let command = new Command(current.filename, current.command, current.description, current.folder, current.hidden, current.prefix);

            if(command.prefix) this.prefixCommands.set(current.command, command);
            else this.nonPrefixCommands.set(current.command, command);
        }
        this.allCommands = new Map <string, Command> ([... this.prefixCommands, ... this.nonPrefixCommands]);
    }

    //Extracts the command by searching for it using recursion
    extractCommand(currentlyApplicable: String[], command: string[], currentLocation: number, prefix : boolean): string | undefined {
        if (command.length + 1 === currentLocation) return undefined; //Command not found

        //First time running the recursion, set the keys of the command
        if (currentLocation === 0) {
            if(prefix) currentlyApplicable = Array.from(this.prefixCommands.keys());
            else currentlyApplicable = Array.from(this.nonPrefixCommands.keys());
        }
        //First time running the recursion, set the keys of the command


        let newApplicable = [];
        for (let i = 0; i !== currentlyApplicable.length ; i++) {
            let currentCommand = currentlyApplicable[i].split(" ");
            if(command.length >= currentCommand.length && currentCommand[currentLocation] === command[currentLocation]){
                newApplicable.push(currentCommand.join(" "));
            }
        }

        if (newApplicable.length === 1 && this.allCommands.has(newApplicable[0])){
            //Make sure that the commands exists
            let onlyApplicableLength = (newApplicable[0].split(" ")).length;

            let formattedCommand = command;
            formattedCommand.length = onlyApplicableLength;

            if(this.allCommands.has(formattedCommand.join(" "))) return newApplicable[0];
            //Make sure that the commands exists
        }
        else this.extractCommand(newApplicable, command, ++currentLocation, prefix);
    }
    //Extracts the command by searching for it using recursion

    formatMessage(message : Message) : FormattedMessage {
        if(message.author.bot) return; //If bot cancel

        let content:string[];
        let command:string;

        //Check if commands exists, and if it doesn't cancel
        if(this.prefixRegex.exec(message.content) !== null){
            content = (message.content.split(" ")).splice(1);
            command = this.extractCommand(undefined, content.slice(), 0, true); //Slice to pass by reference
        }else{
            content = message.content.split(" ");
            command = this.extractCommand(undefined, content.slice(), 0, false); //Slice to pass by reference
        }

        if (command === undefined) return; //If no command is found, cancel
        //Check if commands exists, and if it doesn't cancel

        let parameters = content.splice((command.toString()).split(" ").length); //Get the parameters of a string
        return new FormattedMessage(command, parameters);
    }

    private executeCommand(message : Message, formattedMessage : FormattedMessage) : void{
        if(formattedMessage === undefined || !this.allCommands.has(formattedMessage.command)) return; //Command does not exist
        this.allCommands.get(formattedMessage.command).run(message, formattedMessage, this.centralizedMiddleware);
    }

    execute(message: Message) : void{
        message.content = message.content.toLowerCase();
        this.executeCommand(message, this.formatMessage(message));
    }
}
