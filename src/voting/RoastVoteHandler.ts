import CentralizedMiddleware from "../middleware/CentralizedMiddleware";
import {Guild, Message} from "discord.js";
import BaseVoteHandler from "./BaseVoteHandler";

export default class RoastVoteHandler extends BaseVoteHandler {
    centralizedMiddleware: CentralizedMiddleware;

    constructor(centralizedMiddleware: CentralizedMiddleware) {
        super(centralizedMiddleware);
    }

    protected getPostAuthor(message: Message): string {
        return this.centralizedMiddleware.roastMiddleware.getPendingRoast(message.id).user;
    }

    protected async approve(message: Message, guild: Guild): Promise<void> {
        await this.centralizedMiddleware.roastMiddleware.approveRoast(message.id);
        await message.delete();
    }

    protected async decline(message: Message): Promise<void> {
        await this.centralizedMiddleware.roastMiddleware.declineRoast(message.id);
        await message.delete();
    }
}