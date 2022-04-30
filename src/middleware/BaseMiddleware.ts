export default abstract class BaseMiddleware {
    readonly guild: string;
    cacheBuilt : boolean = false;

    protected constructor(guild: string) {
        this.guild = guild;
    }

    abstract buildCache(): Promise<void>;
}