export default abstract class BaseObject {
    cacheLoaded: Date;
    protected TIME_TO_EXPIRE = 28800; //8 Hour Default Cache

    protected constructor() {
        this.cacheLoaded = new Date();
    }

    get expired(): boolean {
        let currentEpochTime = Math.round((new Date()).getTime() / 1000);
        let generateEpochTime = Math.round((this.cacheLoaded).getTime() / 1000);

        let timePassed = currentEpochTime - generateEpochTime; //check the amount of time passed in seconds
        return timePassed > this.TIME_TO_EXPIRE; //If the cache has been there for (TIME TO EXPIRE)ms, expire the cache
    }
}