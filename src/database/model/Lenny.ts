import {ObjectId} from 'mongodb'

export default class Lenny{
    _id : ObjectId;
    readonly lenny : string;
    readonly user : string;
    readonly createdTimestamp: Date;
    message: string;
    updatedTimestamp: Date;
    accepted : boolean;
    pending : boolean;

    constructor(lenny: string, message: string, user: string, createdTimestamp: Date, accepted: boolean, pending: boolean) {
        this.lenny = lenny;
        this.message = message;
        this.user = user;
        this.createdTimestamp = createdTimestamp;
        this.accepted = accepted;
        this.pending = pending;
    }

    static modelBuilder(object: any): Lenny {
        let lenny = new Lenny(object.lenny, object.message, object.user, object.createdTimestamp, object.accepted, object.pending);
        if (object._id !== undefined) lenny._id = new ObjectId(object._id);
        else lenny._id = new ObjectId();
        lenny.updatedTimestamp = object.updatedTimestamp;
        return lenny;
    }

    toString(): object {
        return {
            _id: this._id,
            lenny: this.lenny,
            message: this.message,
            user: this.user,
            createdTimestamp: this.createdTimestamp,
            updatedTimestamp: this.updatedTimestamp,
            accepted: this.accepted,
            pending: this.pending
        }
    }
}