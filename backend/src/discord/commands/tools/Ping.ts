import Command from "../definitions/Command";
import {Message} from "discord.js";
import FormattedMessage from "../definitions/FormattedMessage";

class Ping extends Command{
    async run(formattedMessage: FormattedMessage): Promise<void> {
        let timestamp = new Date();
        formattedMessage.message.channel.send("Pong")
            .then(message => message.edit(`Pong *(${(new Date().getTime() - timestamp.getTime())}ms)*`))
    }
}

export default (new Ping());