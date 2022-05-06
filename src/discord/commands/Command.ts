import {Message} from "discord.js";

export default abstract class Command{
    abstract run(message: Message) : Promise<void>;
}