import {ObjectId} from 'mongodb'

export default class Roast{
    _id : ObjectId;
    readonly roast : string;
    readonly submitted : string;
    readonly timestamp: Date;
    accepted : boolean;
    pending : boolean;

    constructor (roast: string, submitted: string, timestamp: Date, accepted: boolean, pending : boolean) {
        this.roast = roast;
        this.submitted = submitted;
        this.timestamp = timestamp;
        this.accepted = accepted;
        this.pending = pending;
    }

    toString() : object{
        return {
            _id: this._id,
            roast: this.roast,
            submitted: this.submitted,
            timestamp: this.timestamp,
            accepted: this.accepted,
            pending: this.pending
        }
    }

    static modelBuilder(object : any) : Roast{
        let roast = new Roast(object.roast, object.submitted, object.timestamp, object.accepted, object.pending);
        if(object._id !== undefined) roast._id = new ObjectId(object._id);
        else roast._id = new ObjectId();
        return roast;
    }
}