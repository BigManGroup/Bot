import {ObjectId} from 'mongodb'

export default class PeePee {
    _id: ObjectId;
    readonly guild: string;
    readonly user: string;
    size: number;
    readonly generatedDate: Date;

    constructor(user: string, guild: string, size: number, generatedDate: Date) {
        this.user = user;
        this.size = size;
        this.generatedDate = generatedDate;
    }

    static modelBuilder(object: any): PeePee {
        let peepee = new PeePee(object.user, object.guild, object.size, object.generatedDate);
        if (object._id !== undefined) peepee._id = new ObjectId(object._id);
        else peepee._id = new ObjectId();

        return peepee;
    }

    toString(): object {
        return {
            _id: this._id,
            user: this.user,
            guild: this.guild,
            size: this.size,
            generatedDate: this.generatedDate
        }
    }
}