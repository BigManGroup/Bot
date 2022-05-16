import {ObjectId} from "mongodb";

/**
 * Stores shared information between guilds about a specific user
 */
export default class User{
    _id : ObjectId;
    userId: string;
    bigAmount: number;
    peepeeAmount: number;
}