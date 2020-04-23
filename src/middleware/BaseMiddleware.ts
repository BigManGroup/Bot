export default abstract class BaseMiddleware {
    readonly guild: string;
    abstract cacheBuilt: boolean = false;

    protected constructor(guild: string) {
        this.guild = guild;
    }

    abstract async buildCache(): Promise<void>;
}