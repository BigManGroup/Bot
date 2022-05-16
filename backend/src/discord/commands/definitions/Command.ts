import {Message} from "discord.js";
import FormattedMessage from "./FormattedMessage";

export default abstract class Command{
    abstract run(formattedMessage: FormattedMessage) : Promise<void>;
}