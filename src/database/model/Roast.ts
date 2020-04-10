export default class Roast{
    roast : string;
    submitted : string;
    timestamp: Date;
    accepted : boolean;

    constructor(roast: string, submitted: string, timestamp: Date, accepted: boolean) {
        this.roast = roast;
        this.submitted = submitted;
        this.timestamp = timestamp;
        this.accepted = accepted;
    }

    static modelBuilder(object : any) : Roast{
        return new Roast(object.roast, object.submitted, object.timestamp, object.accepted);
    }
}