import Guild from "../database/model/Guild";

export default class GuildCache {
    guild: Guild;

    setCache(guild: Guild) {
        this.guild = guild;
    }

    setQuoteSubmissionChannel(channel: string) {
        this.guild.quoteSubmission = channel;
    }

    setQuoteChannel(channel: string) {
        this.guild.quoteChannel = channel;
    }

    setRoastSubmissionChannel(channel: string) {
        this.guild.roastSubmission = channel;
    }

    setInsultSubmissionChannel(channel: string) {
        this.guild.insultSubmission = channel;
    }
}