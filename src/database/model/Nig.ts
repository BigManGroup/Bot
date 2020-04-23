import {ObjectId} from 'mongodb'

export default class Nig {
    _id: ObjectId;
    readonly guild: string;
    readonly user: string;
    amount: number;
    readonly generatedDate: Date;

    constructor(user: string, guild: string, amount: number, generatedDate: Date) {
        this.user = user;
        this.amount = amount;
        this.guild = guild;
        this.generatedDate = generatedDate;
    }

    static modelBuilder(object: any): Nig {
        let peepee = new Nig(object.user, object.guild, object.amount, object.generatedDate);
        if (object._id !== undefined) peepee._id = new ObjectId(object._id);
        else peepee._id = new ObjectId();

        return peepee;
    }

    toString(): object {
        return {
            _id: this._id,
            user: this.user,
            guild: this.guild,
            amount: this.amount,
            generatedDate: this.generatedDate
        }
    }
}