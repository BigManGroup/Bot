import RoastMiddleware from "./RoastMiddleware";
import LennyMiddleware from "./LennyMiddleware";
import BadManMiddleware from "./BadManMiddleware";
import PeePeeMiddleware from "./PeePeeMiddleware";
import NigMiddleware from "./NigMiddleware";
import QuoteMiddleware from "./QuoteMiddleware";
import InsultMiddleware from "./InsultMiddleware";

export default class CentralizedMiddleware{
    readonly roastMiddleware : RoastMiddleware;
    readonly lennyMiddleware : LennyMiddleware;
    readonly badManMiddleware : BadManMiddleware;
    readonly peePeeMiddleware : PeePeeMiddleware;
    readonly nigMiddleware : NigMiddleware;
    readonly quoteMiddleware: QuoteMiddleware;
    readonly insultMiddleware: InsultMiddleware;

    constructor() {
        this.roastMiddleware = new RoastMiddleware();
        this.lennyMiddleware = new LennyMiddleware();
        this.badManMiddleware = new BadManMiddleware();
        this.peePeeMiddleware = new PeePeeMiddleware();
        this.nigMiddleware = new NigMiddleware();
        this.quoteMiddleware = new QuoteMiddleware();
        this.insultMiddleware = new InsultMiddleware();
    }

    async buildCache() : Promise <void> {
        await this.roastMiddleware.buildCache();
        await this.lennyMiddleware.buildCache();
        await this.badManMiddleware.buildCache();
        await this.peePeeMiddleware.buildCache();
        await this.nigMiddleware.buildCache();
        await this.quoteMiddleware.buildCache();
        await this.insultMiddleware.buildCache();
    }

    cacheBuilt() : boolean {
        return this.roastMiddleware.cacheBuilt
            && this.lennyMiddleware.cacheBuilt
            && this.badManMiddleware.cacheBuilt
            && this.peePeeMiddleware.cacheBuilt
            && this.nigMiddleware.cacheBuilt
            && this.quoteMiddleware.cacheBuilt
            && this.insultMiddleware.cacheBuilt;
    }
}