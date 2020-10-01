import CentralizedMiddleware from "../middleware/CentralizedMiddleware";
import {Guild, Message, MessageReaction, User} from "discord.js";
import Tools from "../tools";
import VotingHandler from "./VotingHandler";

export default abstract class {
    centralizedMiddleware: CentralizedMiddleware;

    protected constructor(centralizedMiddleware: CentralizedMiddleware) {
        this.centralizedMiddleware = centralizedMiddleware;
    }

    async handleVote(messageReaction: MessageReaction, user: User): Promise<void> {
        let message: Message;
        if (messageReaction.message.partial) message = await messageReaction.message.fetch(); //if the message is not in cache load it
        else message = messageReaction.message; //if the message is in cache, just load the one in cache

        let likedUsers = (await message.reactions.resolve(VotingHandler.approveReaction).users.fetch()).array(); //Get the amount of liked users
        let dislikedUsers = (await message.reactions.resolve(VotingHandler.declineReaction).users.fetch()).array(); //Get the amount of disliked users

        let guild = message.guild;
        let postAuthor = this.getPostAuthor(message);

        let valid: number = 0;
        let authorDecline: boolean = false;

        for (let i = 0; i !== likedUsers.length; i++) if (Tools.isBigMan(guild, this.centralizedMiddleware.guildMiddleware.bigmanRole, likedUsers[i].id)) valid++; //If they are bigman, vote is valid
        for (let i = 0; i !== dislikedUsers.length; i++) {
            if (Tools.isBigMan(guild, this.centralizedMiddleware.guildMiddleware.bigmanRole, dislikedUsers[i].id)) valid--; //If they are bigman, vote is valid
            if (dislikedUsers[i].id === postAuthor) authorDecline = true; //If the user that submitted presses x, the quote is deleted
        }

        if (valid >= 3) await this.approve(message, guild);
        else if (valid <= -3 || authorDecline) await this.decline(message);
    }

    protected abstract getPostAuthor(message: Message): string;

    protected abstract async approve(message: Message, guild: Guild): Promise<void>;

    protected abstract async decline(message: Message): Promise<void>;
}