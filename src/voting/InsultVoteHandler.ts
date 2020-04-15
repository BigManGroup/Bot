import CentralizedMiddleware from "../middleware/CentralizedMiddleware";
import {Guild, Message, MessageReaction, User} from "discord.js";
import VotingHandler from "./VotingHandler";
import Tools from "../tools";

export default class InsultVoteHandler {
    static insultSubmissionsChannel: string = "699754217853943811";
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

        let guild = await user.client.guilds.resolve(Tools.bigmanGuild).fetch(); //Get the guild (load to cache)
        let currentInsult = this.centralizedMiddleware.insultMiddleware.getPendingInsult(message.id);

        let deleteInsult = false;
        let valid: number = 0;
        for (let i = 0; i !== likedUsers.length; i++) if (Tools.isBigMan(guild, likedUsers[i])) valid++; //If they are bigman, vote is valid
        for (let i = 0; i !== dislikedUsers.length; i++) {
            if (Tools.isBigMan(guild, dislikedUsers[i])) valid--; //If they are bigman, vote is valid
            if (dislikedUsers[i].id === currentInsult.userSubmitted) deleteInsult = true; //If the user that submitted presses x, the quote is deleted
        }

        if (valid >= 3) await this.approve(message, guild);
        else if (valid <= -3 || deleteInsult) await this.decline(message);
    }

    private async approve(message: Message, guild: Guild): Promise<void> {
        await this.centralizedMiddleware.insultMiddleware.approveInsult(message.id);
        await message.delete();
    }

    private async decline(message: Message): Promise<void> {
        await this.centralizedMiddleware.insultMiddleware.declineInsult(message.id);
        await message.delete();
    }
}