import Command from "../Command";
import {Message} from "discord.js";

export default class Ping extends Command{
    run(message: Message): Promise<void> {
        return Promise.resolve(undefined);
    }

}