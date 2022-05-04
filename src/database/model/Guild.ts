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

    badmanRole: string; //The role given to people when they say a "bad" word
    badWords: string[]; //List of bad words that are to be intercepted

    submissionInformation : SubmissionInformation[];
    prefixes: string[]; //Stores the prefixes the bot activates with
}

/**
 * SubmissionInformation stores the information of a submission (including voting, showcase and embed format).
 *
 * Also stores an array of all the submissions of that type of submission.
 */
export class SubmissionInformation{
    _id : ObjectId;
    votingChannelId: string;
    showcaseChannelId: string;
    votingRequired: boolean;
    outputFormat? : string; //todo figure this one out!

    submissions : Submission[];
}

/**
 * Stores a submission
 */
export interface Submission{
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