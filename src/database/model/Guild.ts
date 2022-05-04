import {ObjectId} from "mongodb";

/**
 * Stores all the information about the guild
 * TODO Poll?
 */
export default class Guild{
    _id : ObjectId;
    readonly guildId: string;

    minimumAdminRoleId: string; //The minimum admin role
    defaultRole : string; //The default role (given to every new member)

    badWordInformation: BadWordInformation; //Information for when someone is "bad"
    submissionGroups : SubmissionGroup[]; //Stores the information of different types of submission
    prefixes: string[]; //Stores the prefixes the bot activates with
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

    submissions : Submission[];
}

/**
 * Stores a submission
 */
export class Submission{
    _id : ObjectId;
    readonly messageId: string;
    readonly text : string;
    readonly submissionUser: string;
    readonly submittedTimestamp: Date;
    updatedTimestamp: Date;
    state : SubmissionState;
}

/**
 * Stores the state of the submission
 */
export enum SubmissionState{
    ACCEPTED,
    PENDING,
    DENIED
}

export class BadWordInformation{
    _id : ObjectId;
    badRoleId: string;
    badWords: string[];
    wordExceptions: string[];
}