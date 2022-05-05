import BaseDatabaseWrapper from "./BaseDatabaseWrapper";

export default class GuildWrapper extends BaseDatabaseWrapper{
    constructor() {
        super("guild");
    }
}