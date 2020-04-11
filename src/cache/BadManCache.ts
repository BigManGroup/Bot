import BadMan from "../database/model/BadMan";

export default class BadManCache{
    badMan : Map <string, BadMan>;
    forgivenBadMan : Map <string, BadMan>

    setCache(badMan : Map <string, BadMan>, forgivenBadMan : Map <string, BadMan>){
        this.badMan = badMan;
        this.forgivenBadMan = forgivenBadMan;
    }
}