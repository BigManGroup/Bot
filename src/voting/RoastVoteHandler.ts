import CentralizedMiddleware from "../middleware/CentralizedMiddleware";
import {Guild, Message, MessageReaction, User} from "discord.js";
import VotingHandler from "./VotingHandler";
import Tools from "../tools";

export default class RoastVoteHandler {
    static roastSubmissionChannel: string = "699630344604876871";

    centralizedMiddleware: CentralizedMiddleware;

    constructor(centralizedMiddleware: CentralizedMiddleware) {
        this.centralizedMiddleware = centralizedMiddleware;
    }

    async handle(messageReaction: MessageReaction, user: User): Promise<void> {
        let message: Message;
        if (messageReaction.message.partial) message = await messageReaction.message.fetch(); //if the message is not in cache load it
        else message = messageReaction.message; //if the message is in cache, just load the one in cache

        let likedUsers = (await message.reactions.resolve(VotingHandler.approveReaction).users.fetch()).array(); //Get the amount of liked users
        let dislikedUsers = (await message.reactions.resolve(VotingHandler.declineReaction).users.fetch()).array(); //Get the amount of disliked users

        let guild = await user.client.guilds.resolve(this.centralizedMiddleware.guildMiddleware.guildCache.guild.guild).fetch(); //Get the guild (load to cache)
        let currentRoast = this.centralizedMiddleware.roastMiddleware.getPendingRoast(message.id);

        let deleteRoast = false;
        let valid: number = 0;
        for (let i = 0; i !== likedUsers.length; i++) if (Tools.isBigMan(guild, this.centralizedMiddleware.guildMiddleware.guild, likedUsers[i].id)) valid++; //If they are bigman, vote is valid
        for (let i = 0; i !== dislikedUsers.length; i++) {
            if (Tools.isBigMan(guild, this.centralizedMiddleware.guildMiddleware.bigmanRole, dislikedUsers[i].id)) valid--; //If they are bigman, vote is valid
            if (dislikedUsers[i].id === currentRoast.user) deleteRoast = true; //If the user that submitted presses x, the quote is deleted
        }

        if (valid >= 3) await this.approve(message, guild);
        else if (valid <= -3 || deleteRoast) await this.decline(message);
    }

    private async approve(message: Message, guild: Guild): Promise<void> {
        await this.centralizedMiddleware.roastMiddleware.approveRoast(message.id);
        await message.delete();
    }

    private async decline(message: Message): Promise<void> {
        await this.centralizedMiddleware.roastMiddleware.declineRoast(message.id);
        await message.delete();
    }
}