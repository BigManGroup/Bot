import {ObjectId} from 'mongodb'

export default class Lenny{
    _id : ObjectId;
    readonly lenny : string;
    readonly user : string;
    readonly createdTimestamp: Date;
    updatedTimestamp: Date;
    accepted : boolean;
    pending : boolean;

    //todo update db entry

    constructor (lenny: string, submitted: string, createdTimestamp: Date, accepted: boolean, pending : boolean) {
        this.lenny = lenny;
        this.user = submitted;
        this.createdTimestamp = createdTimestamp;
        this.accepted = accepted;
        this.pending = pending;
    }

    toString() : object{
        return {
            _id: this._id,
            lenny: this.lenny,
            submitted: this.user,
            createdTimestamp: this.createdTimestamp,
            updatedTimestamp : this.updatedTimestamp,
            accepted: this.accepted,
            pending: this.pending
        }
    }

    static modelBuilder(object : any) : Lenny{
        let lenny = new Lenny(object.lenny, object.user, object.createdTimestamp, object.accepted, object.pending);
        if(object._id !== undefined) lenny._id = new ObjectId(object._id);
        else lenny._id = new ObjectId();
        lenny.updatedTimestamp = object.updatedTimestamp;
        return lenny;
    }
}