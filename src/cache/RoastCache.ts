import Roast from "../database/model/Roast";

export default class RoastCache{
    acceptedRoasts: Roast[];
    pendingRoasts: Map<string, Roast>;
    declinedRoasts: Roast[];

    setCache(acceptedRoasts: Roast[], pendingRoasts: Map<string, Roast>, declinedRoasts: Roast[]): void {
        this.acceptedRoasts = acceptedRoasts;
        this.pendingRoasts = pendingRoasts;
        this.declinedRoasts = declinedRoasts;
    }
}