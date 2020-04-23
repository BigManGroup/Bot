import {ObjectId} from 'mongodb'

export default class Lenny {
    _id: ObjectId;
    readonly guild: string;
    readonly lenny: string;
    readonly user: string;
    readonly submittedTimestamp: Date;
    updatedTimestamp: Date;
    message: string;
    accepted: boolean;
    pending: boolean;

    constructor(lenny: string, guild: string, message: string, user: string, submittedTimestamp: Date, accepted: boolean, pending: boolean) {
        this.lenny = lenny;
        this.guild = guild;
        this.message = message;
        this.user = user;
        this.submittedTimestamp = submittedTimestamp;
        this.accepted = accepted;
        this.pending = pending;
    }

    static modelBuilder(object: any): Lenny {
        let lenny = new Lenny(object.lenny, object.guild, object.message, object.user, object.submittedTimestamp, object.accepted, object.pending);
        if (object._id !== undefined) lenny._id = new ObjectId(object._id);
        else lenny._id = new ObjectId();
        lenny.updatedTimestamp = object.updatedTimestamp;
        return lenny;
    }

    toString(): object {
        return {
            _id: this._id,
            lenny: this.lenny,
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