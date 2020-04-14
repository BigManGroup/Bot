import {ObjectId} from 'mongodb'

export default class Quote {
    _id: ObjectId;
    readonly insult: string;
    message: string;
    readonly userSubmitted: string;
    readonly submittedTimestamp: Date;
    updatedTimestamp: Date;
    accepted: boolean;
    pending: boolean;

    constructor(insult: string, message: string, userSubmitted: string, timestamp: Date, accepted: boolean, pending: boolean) {
        this.insult = insult;
        this.message = message;
        this.userSubmitted = userSubmitted;
        this.submittedTimestamp = timestamp;
        this.accepted = accepted;
        this.pending = pending;
    }

    static modelBuilder(object: any): Quote {
        let quote = new Quote(object.insult, object.message, object.userSubmitted, object.submittedTimestamp, object.accepted, object.pending);
        if (object._id !== undefined) quote._id = new ObjectId(object._id);
        else quote._id = new ObjectId();
        return quote;
    }

    toString(): object {
        return {
            _id: this._id,
            insult: this.insult,
            message: this.message,
            userSubmitted: this.userSubmitted,
            submittedTimestamp: this.submittedTimestamp,
            updateTimestamp: this.updatedTimestamp,
            accepted: this.accepted,
            pending: this.pending
        }
    }
}