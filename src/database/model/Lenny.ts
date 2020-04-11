import {ObjectId} from 'mongodb'

export default class Lenny{
    _id : ObjectId;
    readonly lenny : string;
    readonly submitted : string;
    readonly timestamp: Date;
    accepted : boolean;
    pending : boolean;

    constructor (lenny: string, submitted: string, timestamp: Date, accepted: boolean, pending : boolean) {
        this.lenny = lenny;
        this.submitted = submitted;
        this.timestamp = timestamp;
        this.accepted = accepted;
        this.pending = pending;
    }

    toString() : object{
        return {
            _id: this._id,
            lenny: this.lenny,
            submitted: this.submitted,
            timestamp: this.timestamp,
            accepted: this.accepted,
            pending: this.pending
        }
    }

    static modelBuilder(object : any) : Lenny{
        let lenny = new Lenny(object.lenny, object.submitted, object.timestamp, object.accepted, object.pending);
        if(object._id !== undefined) lenny._id = new ObjectId(object._id);
        else lenny._id = new ObjectId();
        return lenny;
    }
}