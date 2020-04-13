import {ObjectId} from 'mongodb'

export default class Quote{
    _id : ObjectId;
    readonly quoteText : string;
    readonly quoteYear : string;
    readonly quoteUser: string;
    message: string;
    readonly userSubmitted: string;
    readonly submittedTimestamp: Date;
    updatedTimestamp : Date;
    accepted : boolean;
    pending : boolean;

    constructor (quoteText: string, quoteYear : string, quoteUser: string, message:string, userSubmitted: string, timestamp: Date, accepted: boolean, pending : boolean) {
        this.quoteText = quoteText;
        this.quoteYear = quoteYear;
        this.quoteUser = quoteUser;
        this.message = message;
        this.userSubmitted = userSubmitted;
        this.submittedTimestamp = timestamp;
        this.accepted = accepted;
        this.pending = pending;
    }

    toString() : object{
        return {
            _id: this._id,
            quoteText: this.quoteText,
            quoteYear: this.quoteYear,
            quoteUser: this.quoteUser,
            message: this.message,
            userSubmitted: this.userSubmitted,
            submittedTimestamp: this.submittedTimestamp,
            updateTimestamp: this.updatedTimestamp,
            accepted: this.accepted,
            pending: this.pending
        }
    }

    static modelBuilder(object : any) : Quote{
        let quote = new Quote(object.quoteText, object.quoteYear, object.quoteUser, object.message, object.userSubmitted, object.submittedTimestamp, object.accepted, object.pending);
        if(object._id !== undefined) quote._id = new ObjectId(object._id);
        else quote._id = new ObjectId();
        return quote;
    }
}