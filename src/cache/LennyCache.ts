import Lenny from "../database/model/Lenny";

export default class RoastCache{
    acceptedLennys : Lenny[];
    pendingLennys : Lenny[];
    declinedLennys : Lenny[];

    setCache(acceptedLennys : Lenny[], pendingLennys : Lenny[], declinedLennys : Lenny[]) : void{
        this.acceptedLennys = acceptedLennys;
        this.pendingLennys = pendingLennys;
        this.declinedLennys = declinedLennys;
    }
}