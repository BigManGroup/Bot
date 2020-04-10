import RoastMiddleware from "./RoastMiddleware";

export default class CentralizedMiddleware{
    readonly roastMiddleware : RoastMiddleware;

    constructor() {
        this.roastMiddleware = new RoastMiddleware();
    }

    async buildCache() : Promise <void> {
        await this.roastMiddleware.buildCache();
    }
}