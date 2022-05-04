import {ObjectId} from "mongodb";

export default class Submission{
    _id : ObjectId;
    _submissionGroupId: ObjectId;

    readonly messageId: string;
    readonly text : string;
    readonly submissionUser: string;
    state : SubmissionState;

    readonly dateCreated : Date;
    readonly lastAccessed : Date;
}

/**
 * Stores the state of the submission
 */
export enum SubmissionState{
    ACCEPTED,
    PENDING,
    DENIED
}