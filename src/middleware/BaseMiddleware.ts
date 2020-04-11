export default abstract class BaseMiddleware{
    abstract async buildCache() : Promise<void>;
}