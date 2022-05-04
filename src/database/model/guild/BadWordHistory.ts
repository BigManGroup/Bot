import {ObjectId} from "mongodb";

export default class BadWordHistory{
    _id : ObjectId;
    _badWordInformationId: ObjectId;

    userId: string;
    flaggedWord: string;

    readonly dateCreated : Date;
    readonly lastAccessed : Date;

}