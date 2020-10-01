import {Guild, Message} from "discord.js";
import BaseVoteHandler from "./BaseVoteHandler";
import CentralizedMiddleware from "../middleware/CentralizedMiddleware";

export default class InsultVoteHandler extends BaseVoteHandler {
    constructor(centralizedMiddleware: CentralizedMiddleware) {
        super(centralizedMiddleware);
    }

    protected getPostAuthor(message: Message): string {
        return this.centralizedMiddleware.insultMiddleware.getPendingInsult(message.id).user;
    }

    protected async approve(message: Message, guild: Guild): Promise<void> {
        await this.centralizedMiddleware.insultMiddleware.approveInsult(message.id);
        await message.delete();
    }

    protected async decline(message: Message): Promise<void> {
        await this.centralizedMiddleware.insultMiddleware.declineInsult(message.id);
        await message.delete();
    }
}