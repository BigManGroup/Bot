import {ObjectId} from 'mongodb'

export default class PeePee{
    _id : ObjectId;
    readonly userId : string;
    size: number;
    readonly generatedDate : Date;

    constructor(userId: string, size: number, generatedDate: Date) {
        this.userId = userId;
        this.size = size;
        this.generatedDate = generatedDate;
    }

    toString() : object{
        return {
            _id : this._id,
            user : this.userId,
            size : this.size,
            generatedDate : this.generatedDate
        }
    }

    static modelBuilder(object : any) : PeePee{
        let peepee = new PeePee(object.userId, object.size, object.generatedDate);
        if(object._id !== undefined) peepee._id = new ObjectId(object._id);
        else peepee._id = new ObjectId();

        return peepee;
    }
}