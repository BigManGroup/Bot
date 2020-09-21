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

    setBigmanRole(role: string) {
        this.guild.bigmanRole = role;
    }

    setGeneralRole(role: string){
        this.guild.generalRole = role;
    }

    setBadmanRole(role: string) {
        this.guild.badmanRole = role;
    }

    setMusicChannel(channel: string) {
        this.guild.musicChannel = channel;
    }

    setPrefixes(prefixes: string[]) {
        this.guild.prefixes = prefixes;
    }
}