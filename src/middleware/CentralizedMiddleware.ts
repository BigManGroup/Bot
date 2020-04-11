import RoastMiddleware from "./RoastMiddleware";
import LennyMiddleware from "./LennyMiddleware";
import BadManMiddleware from "./BadManMiddleware";
import PeePeeMiddleware from "./PeePeeMiddleware";

export default class CentralizedMiddleware{
    readonly roastMiddleware : RoastMiddleware;
    readonly lennyMiddleware : LennyMiddleware;
    readonly badManMiddleware : BadManMiddleware;
    readonly peePeeMiddleware : PeePeeMiddleware;

    constructor() {
        this.roastMiddleware = new RoastMiddleware();
        this.lennyMiddleware = new LennyMiddleware();
        this.badManMiddleware = new BadManMiddleware();
        this.peePeeMiddleware = new PeePeeMiddleware();
    }

    async buildCache() : Promise <void> {
        await this.roastMiddleware.buildCache();
        await this.lennyMiddleware.buildCache();
        await this.badManMiddleware.buildCache();
        await this.peePeeMiddleware.buildCache();
    }

    cacheBuilt() : boolean {
        return this.roastMiddleware.cacheBuilt
            && this.lennyMiddleware.cacheBuilt
            && this.badManMiddleware.cacheBuilt
            && this.peePeeMiddleware.cacheBuilt;
    }
}