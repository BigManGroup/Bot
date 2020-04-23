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
        await this.setChannel("quoteSubmission", channel);
    }

    async setQuoteChannel(channel: string) {
        await this.setChannel("quoteChannel", channel);
    }

    async setRoastSubmissionChannel(channel: string) {
        await this.setChannel("roastSubmission", channel);
    }

    async setInsultSubmissionChannel(channel: string) {
        await this.setChannel("insultSubmission", channel);
    }

    private async setChannel(varName: string, channel: string) {
        await (this.collection.updateOne({"guild": this.guild}, {[varName]: channel}))
    }
}