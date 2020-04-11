import RoastMiddleware from "./RoastMiddleware";
import LennyMiddleware from "./LennyMiddleware";

export default class CentralizedMiddleware{
    readonly roastMiddleware : RoastMiddleware;
    readonly lennyMiddleware : LennyMiddleware;

    constructor() {
        this.roastMiddleware = new RoastMiddleware();
        this.lennyMiddleware = new LennyMiddleware();
    }

    async buildCache() : Promise <void> {
        await this.roastMiddleware.buildCache();
        await this.lennyMiddleware.buildCache();
    }

    cacheBuilt() : boolean {
        return this.roastMiddleware.cacheBuilt && this.lennyMiddleware.cacheBuilt;
    }
}