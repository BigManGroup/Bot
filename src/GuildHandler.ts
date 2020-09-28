import CentralizedMiddleware from "./middleware/CentralizedMiddleware";
import CommandHandler from "./commands/CommandHandler";
import MessageInterceptor from "./commands/MessageInterceptor";
import VotingHandler from "./voting/VotingHandler";
import DefaultRoleHandler from "./role/DefaultRoleHandler";
import {Client} from "discord.js";
import ChannelHandler from "./channel/ChannelHandler";
import BadManWrapper from "./database/wrapper/BadManWrapper";
import BigWrapper from "./database/wrapper/BigWrapper";
import GuildWrapper from "./database/wrapper/GuildWrapper";
import InsultWrapper from "./database/wrapper/InsultWrapper";
import LennyWrapper from "./database/wrapper/LennyWrapper";
import PeePeeWrapper from "./database/wrapper/PeePeeWrapper";
import QuoteWrapper from "./database/wrapper/QuoteWrapper";
import RoastWrapper from "./database/wrapper/RoastWrapper";
import RoleHandler from "./role/RoleHandler";

export default class GuildHandler {
    readonly client: Client;

    guildMiddleware: Map<string, CentralizedMiddleware>;
    guildCommandHandler: Map<string, CommandHandler>;
    guildMessageInterceptor: Map<string, MessageInterceptor>
    guildVotingHandler: Map<string, VotingHandler>;
    guildDefaultRoleHandler: Map<string, DefaultRoleHandler>;
    guildChannelHandler: Map<string, ChannelHandler>;
    guildRoleHandler: Map<string, RoleHandler>;

    static defaultGuild: CentralizedMiddleware;

    constructor(client: Client) {
        this.client = client;

        this.guildMiddleware = new Map<string, CentralizedMiddleware>();
        this.guildCommandHandler = new Map<string, CommandHandler>();
        this.guildMessageInterceptor = new Map<string, MessageInterceptor>();
        this.guildVotingHandler = new Map<string, VotingHandler>();
        this.guildDefaultRoleHandler = new Map<string, DefaultRoleHandler>();
        this.guildChannelHandler = new Map<string, ChannelHandler>()
        this.guildRoleHandler = new Map<string, RoleHandler>();
    }

    async getGuildMiddleware(guild: string): Promise<CentralizedMiddleware> {
        if (!this.guildMiddleware.has(guild)) await this.createGuild(guild);
        return this.guildMiddleware.get(guild);
    }

    async getGuildCommandHandler(guild: string): Promise<CommandHandler> {
        if (!this.guildCommandHandler.has(guild)) await this.createGuild(guild);
        return this.guildCommandHandler.get(guild);
    }

    async getGuildMessageInterceptor(guild: string): Promise<MessageInterceptor> {
        if (!this.guildMessageInterceptor.has(guild)) await this.createGuild(guild);
        return this.guildMessageInterceptor.get(guild);
    }

    async getGuildVotingHandler(guild: string): Promise<VotingHandler> {
        if (!this.guildVotingHandler.has(guild)) await this.createGuild(guild);
        return this.guildVotingHandler.get(guild);
    }

    async getDefaultRoleHandler(guild: string): Promise<DefaultRoleHandler> {
        if (!this.guildDefaultRoleHandler.has(guild)) await this.createGuild(guild);
        return this.guildDefaultRoleHandler.get(guild);
    }

    async getChannelHandler(guild: string): Promise<ChannelHandler> {
        if (this.guildChannelHandler.has(guild)) await this.createGuild(guild);
        return this.guildChannelHandler.get(guild);
    }

    async getRoleHandler(guild: string): Promise<RoleHandler> {
        if (this.guildRoleHandler.has(guild)) await this.createGuild(guild);
        return this.guildRoleHandler.get(guild);
    }

    private async createGuild(guild: string): Promise<CentralizedMiddleware> {
        //Create the middleware
        let currentMiddleware = new CentralizedMiddleware(guild);
        await currentMiddleware.buildCache();
        this.guildMiddleware.set(guild, currentMiddleware);
        //Create the middleware

        //Create the general role and make sure they are smol boi
        let defaultRoleHandler = new DefaultRoleHandler(currentMiddleware);
        this.guildDefaultRoleHandler.set(guild, defaultRoleHandler);
        await defaultRoleHandler.onCacheLoad(this.client.guilds.cache.get(guild));
        //Create the general role and make sure they are smol boi

        let guildRoleHandler = new RoleHandler(currentMiddleware);
        guildRoleHandler.onStart(guild);
        this.guildRoleHandler.set(guild, guildRoleHandler);

        //Create the channel handler and make sure the channels that are set to bot are not deleted
        let channelHandler = new ChannelHandler(currentMiddleware);
        this.guildChannelHandler.set(guild, channelHandler);
        await channelHandler.onCacheLoad(this.client.guilds.cache.get(guild));
        //Create the channel handler and make sure the channels that are set to bot are not deleted

        this.guildCommandHandler.set(guild, new CommandHandler(currentMiddleware));
        this.guildMessageInterceptor.set(guild, new MessageInterceptor(currentMiddleware));
        this.guildVotingHandler.set(guild, new VotingHandler(currentMiddleware));
        return currentMiddleware;
    }

    private unloadGuildMiddleware(guild: string) {
        if (this.guildMiddleware.has(guild)) this.guildMiddleware.delete(guild);
    }

    async setDefaultGuild(id: string): Promise<void> {
        GuildHandler.defaultGuild = await this.createGuild(id);
    }

    async deleteGuild(guild: string): Promise<void> {
        if (!this.guildMiddleware.has(guild)) {
            await new BadManWrapper(guild).delete();
            await new BigWrapper(guild).delete();
            await new GuildWrapper(guild).delete();
            await new InsultWrapper(guild).delete();
            await new LennyWrapper(guild).delete();
            await new PeePeeWrapper(guild).delete();
            await new QuoteWrapper(guild).delete();
            await new RoastWrapper(guild).delete();
        } else {
            this.guildMiddleware.get(guild).badManMiddleware.badManWrapper.delete().catch(error => console.log(error));
            this.guildMiddleware.get(guild).bigMiddleware.bigWrapper.delete().catch(error => console.log(error));
            this.guildMiddleware.get(guild).guildMiddleware.guildWrapper.delete().catch(error => console.log(error));
            this.guildMiddleware.get(guild).insultMiddleware.insultWrapper.delete().catch(error => console.log(error));
            this.guildMiddleware.get(guild).lennyMiddleware.lennyWrapper.delete().catch(error => console.log(error));
            this.guildMiddleware.get(guild).peePeeMiddleware.peePeeWrapper.delete().catch(error => console.log(error));
            this.guildMiddleware.get(guild).quoteMiddleware.quoteWrapper.delete().catch(error => console.log(error));
            this.guildMiddleware.get(guild).roastMiddleware.roastWrapper.delete().catch(error => console.log(error));

            this.unloadGuildMiddleware(guild);
        }
    }
}