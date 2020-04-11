import BadMan from "../database/model/BadMan";

export default class BadManCache{
    badMan : Map <string, BadMan>;
    forgivenBadMan : Map <string, BadMan>

    setCache(badMan : Map <string, BadMan>, forgivenBadMan : Map <string, BadMan>) : void{
        this.badMan = badMan;
        this.forgivenBadMan = forgivenBadMan;
    }

    forgiveBadMan(badMan : BadMan) : void {
        badMan.forgiven = true
        badMan.timestampEnd = new Date();

        this.badMan.delete(badMan.user); //Delete badman
        this.forgivenBadMan.set(badMan.user, badMan); //Add to forgiven
    }

    addBadMan(badMan : BadMan) : void {
        this.badMan.set(badMan.user, badMan);
    }
}