import {ObjectId} from 'mongodb'
export default class BadMan{
    _id : ObjectId;
    readonly guildId : string;
    readonly user : string;
    readonly timestampStart : Date;
    timestampEnd : Date;
    forgiven : boolean;

    constructor(guildId : string, user: string, timestampStart: Date, timestampEnd: Date, forgiven: boolean) {
        this.user = user;
        this.guildId = guildId;
        this.timestampStart = timestampStart;
        this.timestampEnd = timestampEnd;
        this.forgiven = forgiven;
    }

    toString() : Object{
        return {
            _id : this._id,
            guildId : this.guildId,
            user : this.user,
            timestampStart : this.timestampStart,
            timestampEnd : this.timestampEnd,
            forgiven : this.forgiven
        }
    }

    static modelBuilder(object : any) : BadMan{
        let badMan = new BadMan(object.guildId, object.user, object.timestampStart, object.timestampEnd, object.forgiven);
        if(object._id !== undefined) badMan._id = object._id;
        else badMan._id = new ObjectId();
        return badMan;
    }
}