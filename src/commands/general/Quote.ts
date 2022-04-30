import {Message} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";

async function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): Promise<void> {
    let quote = middleware.quoteMiddleware.randomQuote;

    let guildMember = message.guild.members.cache.get(quote.quoteUser)
    if (guildMember === undefined || guildMember.partial) guildMember = await message.client.guilds.cache.get(this.guildId).members.fetch(quote.quoteUser)

    let nickname = "";
    if (guildMember === undefined) nickname = "GBNF";
    else if (guildMember.nickname === null || guildMember.nickname === undefined) nickname = guildMember.user.username;
    else if (guildMember.deleted) nickname = "Deleted User";
    else nickname = guildMember.nickname;

    let formattedQuote = "A wise " + nickname + " once said; " + quote.quoteText + " - " + quote.quoteYear;

    if (!message.mentions.users.size)
        message.channel.send(formattedQuote).catch(error => console.log(error));
    else {
        let taggedUser = message.mentions.users.first();

        if (taggedUser.id === taggedUser.client.user.id) {
            message.reply("nice try faggot").catch(error => console.log(error));
        } else {
            message.channel.send(`${taggedUser}, ${formattedQuote}`).catch(error => console.log(error));
        }
    }
}

export {main};