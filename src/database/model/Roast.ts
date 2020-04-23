import {ObjectId} from 'mongodb'

export default class Roast {
    _id: ObjectId;
    readonly guild: string;
    readonly roast: string;
    readonly user: string;
    readonly submittedTimestamp: Date;
    updatedTimestamp: Date;
    message: string;
    accepted: boolean;
    pending: boolean;

    constructor(roast: string, guild: string, message: string, user: string, submittedTimestamp: Date, accepted: boolean, pending: boolean) {
        this.roast = roast;
        this.guild = guild;
        this.message = message;
        this.user = user;
        this.submittedTimestamp = submittedTimestamp;
        this.accepted = accepted;
        this.pending = pending;
    }

    static modelBuilder(object: any): Roast {
        let roast = new Roast(object.roast, object.guild, object.message, object.user, object.submittedTimestamp, object.accepted, object.pending);
        if (object._id !== undefined) roast._id = new ObjectId(object._id);
        else roast._id = new ObjectId();
        roast.updatedTimestamp = object.updatedTimestamp;
        return roast;
    }

    toString(): object {
        return {
            _id: this._id,
            roast: this.roast,
            guild: this.guild,
            message: this.message,
            user: this.user,
            submittedTimestamp: this.submittedTimestamp,
            updatedTimestamp: this.updatedTimestamp,
            accepted: this.accepted,
            pending: this.pending
        }
    }
}