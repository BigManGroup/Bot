import Command from "../definitions/Command";
import {Message} from "discord.js";
import FormattedMessage from "../definitions/FormattedMessage";

class Ping extends Command{
    async run(formattedMessage: FormattedMessage): Promise<void> {
        console.log("waw!")
    }
}

export default (new Ping());