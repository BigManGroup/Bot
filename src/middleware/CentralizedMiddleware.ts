import RoastMiddleware from "./RoastMiddleware";
import LennyMiddleware from "./LennyMiddleware";
import BadManMiddleware from "./BadManMiddleware";
import PeePeeMiddleware from "./PeePeeMiddleware";
import NigMiddleware from "./NigMiddleware";
import QuoteMiddleware from "./QuoteMiddleware";
import InsultMiddleware from "./InsultMiddleware";
import GuildMiddleware from "./GuildMiddleware";

export default class CentralizedMiddleware {
    readonly guildMiddleware: GuildMiddleware;
    readonly roastMiddleware: RoastMiddleware;
    readonly lennyMiddleware: LennyMiddleware;
    readonly badManMiddleware: BadManMiddleware;
    readonly peePeeMiddleware: PeePeeMiddleware;
    readonly nigMiddleware: NigMiddleware;
    readonly quoteMiddleware: QuoteMiddleware;
    readonly insultMiddleware: InsultMiddleware;

    constructor(guild: string) {
        this.guildMiddleware = new GuildMiddleware(guild);
        this.roastMiddleware = new RoastMiddleware(guild);
        this.lennyMiddleware = new LennyMiddleware(guild);
        this.badManMiddleware = new BadManMiddleware(guild);
        this.peePeeMiddleware = new PeePeeMiddleware(guild);
        this.nigMiddleware = new NigMiddleware(guild);
        this.quoteMiddleware = new QuoteMiddleware(guild);
        this.insultMiddleware = new InsultMiddleware(guild);
    }

    async buildCache(): Promise<void> {
        await this.guildMiddleware.buildCache();
        await this.roastMiddleware.buildCache();
        await this.lennyMiddleware.buildCache();
        await this.badManMiddleware.buildCache();
        await this.peePeeMiddleware.buildCache();
        await this.nigMiddleware.buildCache();
        await this.quoteMiddleware.buildCache();
        await this.insultMiddleware.buildCache();
    }
}