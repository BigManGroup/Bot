import {ObjectId} from 'mongodb'

export default class Nig{
    _id : ObjectId;
    readonly userId : string;
    amount: number;
    readonly generatedDate : Date;

    constructor(userId: string, amount: number, generatedDate: Date) {
        this.userId = userId;
        this.amount = amount;
        this.generatedDate = generatedDate;
    }

    toString() : object{
        return {
            _id : this._id,
            user : this.userId,
            amount : this.amount,
            generatedDate : this.generatedDate
        }
    }

    static modelBuilder(object : any) : Nig{
        let peepee = new Nig(object.userId, object.amount, object.generatedDate);
        if(object._id !== undefined) peepee._id = new ObjectId(object._id);
        else peepee._id = new ObjectId();

        return peepee;
    }
}