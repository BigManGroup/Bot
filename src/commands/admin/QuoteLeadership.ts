import {Message, MessageEmbed} from "discord.js";
import FormattedMessage from "../model/FormattedMessage";
import CentralizedMiddleware from "../../middleware/CentralizedMiddleware";

function main(message: Message, formattedMessage: FormattedMessage, middleware: CentralizedMiddleware): void {
    let quotes = Array.from(middleware.quoteMiddleware.quoteCache.approvedQuotes.values());
    let leaderboard = new Map<string, number>();

    for (let i = 0; i !== quotes.length; i++) {
        let newAmount: number = leaderboard.get(quotes[i].quoteUser);
        if (isNaN(newAmount)) newAmount = 1;
        else newAmount++;

        leaderboard.set(quotes[i].quoteUser, newAmount);
    }

    let sortedLeaderboard = new Map([...leaderboard.entries()].sort((a, b) => b[1] - a[1]));
    let embed = new MessageEmbed().setTitle("BigMan Quote Leaderboard").setTimestamp();

    let counter = 0;
    sortedLeaderboard.forEach((value, key) => {
        if (counter === 24) return;
        embed.addField(message.guild.members.cache.get(key).displayName, value);
        counter++;
    })

    message.channel.send(embed).catch(error => console.log(error));
}

export {main}