import {ObjectId} from 'mongodb'

export default class Roast{
    _id : ObjectId;
    readonly roast : string;
    readonly user : string;
    readonly createdTimestamp: Date;
    updatedTimestamp: Date;
    accepted : boolean;
    pending : boolean;

    constructor (roast: string, submitted: string, createdTimestamp: Date, accepted: boolean, pending : boolean) {
        this.roast = roast;
        this.user = submitted;
        this.createdTimestamp = createdTimestamp;
        this.accepted = accepted;
        this.pending = pending;
    }

    toString() : object{
        return {
            _id: this._id,
            roast: this.roast,
            submitted: this.user,
            createdTimestamp: this.createdTimestamp,
            updatedTimestamp : this.updatedTimestamp,
            accepted: this.accepted,
            pending: this.pending
        }
    }

    static modelBuilder(object : any) : Roast{
        let roast = new Roast(object.roast, object.user, object.createdTimestamp, object.accepted, object.pending);
        if(object._id !== undefined) roast._id = new ObjectId(object._id);
        else roast._id = new ObjectId();
        roast.updatedTimestamp = object.updatedTimestamp;
        return roast;
    }
}