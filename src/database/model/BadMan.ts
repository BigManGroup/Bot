import {ObjectId} from 'mongodb'

export default class BadMan {
    _id: ObjectId;
    readonly guild: string;
    readonly user: string;
    readonly timestampStart: Date;
    timestampEnd: Date;
    forgiven: boolean;

    constructor(user: string, guild: string, timestampStart: Date, timestampEnd: Date, forgiven: boolean) {
        this.user = user;
        this.guild = guild;
        this.timestampStart = timestampStart;
        this.timestampEnd = timestampEnd;
        this.forgiven = forgiven;
    }

    toString(): Object {
        return {
            _id : this._id,
            user : this.user,
            timestampStart : this.timestampStart,
            timestampEnd : this.timestampEnd,
            forgiven : this.forgiven
        }
    }

    static modelBuilder(object : any) : BadMan{
        let badMan = new BadMan(object.user, object.guild, object.timestampStart, object.timestampEnd, object.forgiven);
        if(object._id !== undefined) badMan._id = object._id;
        else badMan._id = new ObjectId();
        return badMan;
    }
}