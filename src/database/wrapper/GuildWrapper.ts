import BaseWrapper from "./BaseWrapper";
import Guild from "../model/Guild";
import Saving from "../DatabaseHandler";

export default class GuildWrapper extends BaseWrapper {
    constructor(guild: string) {
        super("guild", guild);
    }

    async getGuild(): Promise<Guild> {
        let currentGuild = await this.collection.findOne({"guild": this.guild});
        if (currentGuild === null) {
            currentGuild = new Guild(this.guild);
            await this.createGuild(currentGuild);
        }
        return Guild.modelBuilder(currentGuild);
    }

    async createGuild(guild: Guild): Promise<void> {
        await this.collection.insertOne(guild.toString());
    }

    async setQuoteSubmissionChannel(channel: string) {
        await this.setVariable("quoteSubmission", channel);
    }

    async setQuoteChannel(channel: string) {
        await this.setVariable("quoteChannel", channel);
    }

    async setRoastSubmissionChannel(channel: string) {
        await this.setVariable("roastSubmission", channel);
    }

    async setInsultSubmissionChannel(channel: string) {
        await this.setVariable("insultSubmission", channel);
    }

    async setBigmanRole(role: string) {
        await this.setVariable("bigmanRole", role);
    }

    async setGeneralRole (role: string){
        await this.setVariable("generalRole", role);
    }

    async setBadmanRole(role: string) {
        await this.setVariable("badmanRole", role);
    }

    async setMusicChannel(channel: string) {
        await this.setVariable("musicChannel", channel);
    }

    async setPrefixes(prefixes: string[]) {
        await this.setVariable("prefixes", prefixes)
    }

    private async setVariable(varName: string, value: string | string[]) {
        await (this.collection.updateOne({"guild": this.guild}, {$set: {[varName]: value}}))
    }


    static async getAllGuilds(): Promise<string[]> {
        return await Saving.clientPool.db().collection("guild").find({}, {projection: {guild: 1, _id: 0}}).toArray();
    }
}