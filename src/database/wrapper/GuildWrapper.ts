import BaseWrapper from "./BaseWrapper";
import Guild from "../model/Guild";

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
        return currentGuild;
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

    async setBadmanRole (role : string) {
        await this.setVariable("bigmanRole", role);
    }

    async setMusicChannel (channel : string){
        await this.setVariable("musicChannel", channel);
    }

    //todo publicize this and use this for general queries and name it performQuery with (filter, query) and use also pre-made queries
    private async setVariable(varName: string, channel: string) {
        await (this.collection.updateOne({"guild": this.guild}, {$set: {[varName]: channel}}))
    }
}