import {ObjectId} from "mongodb";
import BaseObject from "../../../tools/BaseObject";
import CommandDefinition from "../../../discord/commands/definitions/CommandDefinition";
import GuildCommandDefinition from "../../../discord/commands/definitions/GuildCommandDefinition";

/**
 * Stores all the information about the guild
 * TODO Poll?
 */
export default class Guild extends BaseObject implements IDatabaseGuild{
    _id : ObjectId;
    readonly id: string;
    enableSlashCommands : boolean;

    minimumAdminRoleId: string; //The minimum admin role
    newMemberRoleId : string; //The default role (given to every new member)

    badWordInformation: BadWordInformation; //Information for when someone is "bad"
    submissionGroups : SubmissionGroup[]; //Stores the information of different types of submission
    commandOptions : CommandOptions[]; //Stores command options such as if a command is disabled, custom command string, etc

    prefixes: string[]; //Stores the prefixes the bot activates with

    readonly dateCreated : Date;
    lastAccessed : Date;

    constructor(guild: IDatabaseGuild) {
        super();
        this._id = guild._id;
        this.id = guild.id;

        this.enableSlashCommands = guild.enableSlashCommands ?? defaultValues.enableSlashCommands;

        this.minimumAdminRoleId = guild.minimumAdminRoleId ?? defaultValues.minimumAdminRoleId;
        this.newMemberRoleId = guild.newMemberRoleId ?? defaultValues.newMemberRoleId;

        this.badWordInformation = guild.badWordInformation ?? defaultValues.badWordInformation;
        this.submissionGroups = guild.submissionGroups ?? defaultValues.submissionGroups;
        this.commandOptions = guild.commandOptions ?? defaultValues.commandOptions;

        this.prefixes = guild.prefixes ?? defaultValues.prefixes;

        this.dateCreated = guild.dateCreated ?? new Date();
        this.lastAccessed = guild.lastAccessed ?? new Date();
    }

    /**
     * Returns the command definition modified for the guild
     * NOT IN PLACE
     * @param currentCommandDefinitions The current loaded command definitions
     */
    public getFormattedCommandOptions(currentCommandDefinitions: CommandDefinition[]) : CommandDefinition[]{
        let formattedDefinition : CommandDefinition[]= [];

        currentCommandDefinitions.forEach(currentCommandDefinition => {
            let filteredOptions = this.commandOptions.find(value => currentCommandDefinition.id === value.commandId);
            if(!filteredOptions) return formattedDefinition.push(new CommandDefinition(currentCommandDefinition)); //If not found copy the object and return
             //If not found restart loop

            let guildCommandDefinition = new GuildCommandDefinition(currentCommandDefinition);
            guildCommandDefinition.commands.push(...filteredOptions.customCommands);
            guildCommandDefinition.description = filteredOptions.description;
            guildCommandDefinition.disabled = filteredOptions.disabled;
        });

        return formattedDefinition;
    }
}

/**
 * SubmissionGroup stores the information of a submission (including voting, showcase and embed format).
 *
 * Also stores an array of all the submissions of that type of submission.
 */
export class SubmissionGroup{
    _id : ObjectId;
    submissionGroupName: string;

    votingChannelId: string;
    showcaseChannelId: string;

    //todo custom emojis
    randomPrintCommand: RegExp | string;
    canBeDirected: boolean;

    type: SubmissionType;

    outputFormat? : string; //todo figure this one out!
}

enum SubmissionType{
    VOTING,
    VOTING_BYPASS_ADMIN,
    NO_VOTE
}

export class BadWordInformation{
    _id : ObjectId;
    badRoleId: string;
    badWords: string[];
    wordExceptions: string[];
}

export class CommandOptions{
    commandId: string;
    customCommands: string[];
    description: string;
    disabled: boolean;
}

export interface IDatabaseGuild{
    _id : ObjectId;
    readonly id: string;
    enableSlashCommands? : boolean;

    minimumAdminRoleId?: string; //The minimum admin role
    newMemberRoleId? : string; //The default role (given to every new member)

    badWordInformation?: BadWordInformation; //Information for when someone is "bad"
    submissionGroups? : SubmissionGroup[]; //Stores the information of different types of submission
    commandOptions? : CommandOptions[]; //Stores command options such as if a command is disabled, custom command string, etc

    prefixes?: string[]; //Stores the prefixes the bot activates with

    readonly dateCreated? : Date;
    lastAccessed? : Date;
}

let defaultValues : IDatabaseGuild = {
    _id: undefined,
    id: undefined,
    enableSlashCommands: false,

    minimumAdminRoleId: undefined,
    newMemberRoleId: undefined,

    badWordInformation: undefined,
    submissionGroups: [],
    commandOptions: [],

    prefixes: process.env["BOT_DEFAULT_PREFIXES"].split(" ")
}