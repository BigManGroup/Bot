import RoastMiddleware from "./RoastMiddleware";
import LennyMiddleware from "./LennyMiddleware";
import BadManMiddleware from "./BadManMiddleware";
import PeePeeMiddleware from "./PeePeeMiddleware";
import NigMiddleware from "./NigMiddleware";

export default class CentralizedMiddleware{
    readonly roastMiddleware : RoastMiddleware;
    readonly lennyMiddleware : LennyMiddleware;
    readonly badManMiddleware : BadManMiddleware;
    readonly peePeeMiddleware : PeePeeMiddleware;
    readonly nigMiddleware : NigMiddleware;

    constructor() {
        this.roastMiddleware = new RoastMiddleware();
        this.lennyMiddleware = new LennyMiddleware();
        this.badManMiddleware = new BadManMiddleware();
        this.peePeeMiddleware = new PeePeeMiddleware();
        this.nigMiddleware = new NigMiddleware();
    }

    async buildCache() : Promise <void> {
        await this.roastMiddleware.buildCache();
        await this.lennyMiddleware.buildCache();
        await this.badManMiddleware.buildCache();
        await this.peePeeMiddleware.buildCache();
        await this.nigMiddleware.buildCache();
    }

    cacheBuilt() : boolean {
        return this.roastMiddleware.cacheBuilt
            && this.lennyMiddleware.cacheBuilt
            && this.badManMiddleware.cacheBuilt
            && this.peePeeMiddleware.cacheBuilt
            && this.nigMiddleware.cacheBuilt;
    }
}