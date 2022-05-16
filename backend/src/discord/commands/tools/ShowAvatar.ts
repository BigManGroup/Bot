import Command from "../definitions/Command";
import FormattedMessage from "../definitions/FormattedMessage";
import {Embed, EmbedData} from "discord.js";

class ShowAvatar extends Command{
    async run(formattedMessage: FormattedMessage): Promise<void> {
        let imageUrl: string;
        let username: string;

        if (formattedMessage.message.mentions.users.size !== 0) {
            username = formattedMessage.message.mentions.users.first().username;
            imageUrl = formattedMessage.message.mentions.users.first().avatarURL()
        } else {
            username = formattedMessage.message.author.username;
            imageUrl = formattedMessage.message.author.avatarURL();
        }

        const embed : EmbedData = {
            title: `${username}'s Avatar`,
            image: {
                url: imageUrl
            }
        }

        formattedMessage.message.channel.send({ embeds: [embed as any] });
    }
}

export default (new ShowAvatar())