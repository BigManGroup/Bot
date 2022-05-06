import {ObjectId} from "mongodb";

/**
 * Stores all the information about the guild
 * TODO Poll?
 */
export default class Guild{
    _id : ObjectId;
    readonly guildId: string;
    enableSlashCommands : boolean;

    minimumAdminRoleId: string; //The minimum admin role
    newMemberRoleId : string; //The default role (given to every new member)

    badWordInformation: BadWordInformation; //Information for when someone is "bad"
    submissionGroups : SubmissionGroup[]; //Stores the information of different types of submission
    prefixes: string[]; //Stores the prefixes the bot activates with

    readonly dateCreated : Date;
    lastAccessed : Date;

    constructor(guildId: string) {
        this.guildId = guildId;
        this.enableSlashCommands = false;
        this.submissionGroups = [];
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
    votingRequired: boolean;
    outputFormat? : string; //todo figure this one out!
}


export class BadWordInformation{
    _id : ObjectId;
    badRoleId: string;
    badWords: string[];
    wordExceptions: string[];
}