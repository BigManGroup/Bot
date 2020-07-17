import CentralizedMiddleware from "./middleware/CentralizedMiddleware";
import CommandHandler from "./commands/CommandHandler";
import MessageInterceptor from "./commands/MessageInterceptor";
import VotingHandler from "./voting/VotingHandler";
import DefaultRoleHandler from "./role/DefaultRoleHandler";
import {Client} from "discord.js";

export default class GuildHandler {
    readonly client : Client;

    guildMiddleware: Map<string, CentralizedMiddleware>;
    guildCommandHandler: Map<string, CommandHandler>;
    guildMessageInterceptor: Map<string, MessageInterceptor>
    guildVotingHandler: Map<string, VotingHandler>;
    guildDefaultRoleHandler : Map<string, DefaultRoleHandler>;

    constructor(client : Client) {
        this.client = client;

        this.guildMiddleware = new Map<string, CentralizedMiddleware>();
        this.guildCommandHandler = new Map<string, CommandHandler>();
        this.guildMessageInterceptor = new Map<string, MessageInterceptor>();
        this.guildVotingHandler = new Map<string, VotingHandler>();
        this.guildDefaultRoleHandler = new Map<string, DefaultRoleHandler>();
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

    async unloadGuildMiddleware(guild: string) {
        if (this.guildMiddleware.has(guild)) this.guildMiddleware.delete(guild);
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
        await defaultRoleHandler.onServerStart(this.client.guilds.cache.get(guild));
        //Create the general role and make sure they are smol boi

        this.guildCommandHandler.set(guild, new CommandHandler(currentMiddleware));
        this.guildMessageInterceptor.set(guild, new MessageInterceptor(currentMiddleware));
        this.guildVotingHandler.set(guild, new VotingHandler(currentMiddleware));
        return currentMiddleware;
    }

    /*
    Maybe delete guild
     */
}