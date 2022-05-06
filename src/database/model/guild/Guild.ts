import {ObjectId} from "mongodb";
import BaseObject from "../../../tools/BaseObject";

/**
 * Stores all the information about the guild
 * TODO Poll?
 */
export default class Guild extends BaseObject{
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

    constructor(id: string) {
        super();
        this.id = id;
        this.enableSlashCommands = false;
        this.submissionGroups = [];
        this.commandOptions = [];
        this.prefixes = ["p", "plock"];
        this.dateCreated = new Date();
        this.lastAccessed = new Date();
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
    _id : ObjectId;
    _guildReference: ObjectId;

    commandId: string;
    customCommand: RegExp | string;
    description: string;
    disabled: boolean;
}