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
        let message: Message = await messageReaction.message.fetch();

        let likedUsers = Array.from((await message.reactions.resolve(VotingHandler.approveReaction).users.fetch()).values()); //Get the amount of liked users
        let dislikedUsers = Array.from((await message.reactions.resolve(VotingHandler.declineReaction).users.fetch()).values()); //Get the amount of disliked users

        let guild = message.guild;
        let postAuthor = this.getPostAuthor(message);

        let valid: number = 0; //the number of valid votes
        let totalValidVotes: number = 0; //the raw number of valid votes
        let authorDecline: boolean = false; //If the author declined the vote
        let amountOfBigMan: number = Tools.amountOfBigMan(guild, this.centralizedMiddleware.guildMiddleware.bigmanRole); //The amount of bigman
        let amountOfVotesNeeded = Math.round(amountOfBigMan / 3); //Amount of voted needed for the vote to be added or removed

        for (let i = 0; i !== likedUsers.length; i++) {
            if (Tools.isBigMan(guild, this.centralizedMiddleware.guildMiddleware.bigmanRole, likedUsers[i].id)) {
                valid++; //If they are bigman, vote is valid
                totalValidVotes++;
            }
        }

        for (let i = 0; i !== dislikedUsers.length; i++) {
            if (Tools.isBigMan(guild, this.centralizedMiddleware.guildMiddleware.bigmanRole, dislikedUsers[i].id)) {
                valid--; //If they are bigman, vote is valid
                totalValidVotes++;
            }
            if (dislikedUsers[i].id === postAuthor) authorDecline = true; //If the user that submitted presses x, the quote is deleted
        }

        let validSign = Math.sign(valid);
        if ((valid >= amountOfVotesNeeded) || (totalValidVotes === amountOfBigMan && validSign === 1)) await this.approve(message, guild);
        else if ((valid <= -Math.abs(amountOfVotesNeeded) || authorDecline) || (totalValidVotes === amountOfBigMan && (validSign === -1 || validSign === 0))) await this.decline(message);
    }

    protected abstract getPostAuthor(message: Message): string;

    protected abstract approve(message: Message, guild: Guild): Promise<void>;

    protected abstract decline(message: Message): Promise<void>;
}