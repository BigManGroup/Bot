import Insult from "../database/model/Insult";

export default class RoastCache {
    acceptedInsult: Insult[];
    pendingInsult: Map<string, Insult>;
    declinedInsult: Insult[];

    setCache(acceptedInsult: Insult[], pendingInsult: Map<string, Insult>, declinedInsult: Insult[]): void {
        this.acceptedInsult = acceptedInsult;
        this.pendingInsult = pendingInsult;
        this.declinedInsult = declinedInsult;
    }
}