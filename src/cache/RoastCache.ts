import Roast from "../database/model/Roast";

export default class RoastCache{
    acceptedRoasts : Roast[];
    pendingRoasts : Roast[];
    declinedRoasts : Roast[];

    setCache(acceptedRoasts : Roast[], pendingRoasts : Roast[], declinedRoasts : Roast[]) {
        this.acceptedRoasts = acceptedRoasts;
        this.pendingRoasts = pendingRoasts;
        this.declinedRoasts = declinedRoasts;
    }
}