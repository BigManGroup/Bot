import * as properties from "../resources/config.json";
import Discord, {TextChannel} from "discord.js";
import Command from "../src/commands/model/Command";

const client = new Discord.Client({partials: ['MESSAGE', 'REACTION']});

client.on("ready", async () => {
    Command.prefixes = properties.bot.prefixes;
    let quotes : Object[] = [];

    client.user.setPresence({activity: {name: 'with Big People!'}, status: 'online'}).catch(console.error); //Setting the bot status

    let channel : TextChannel = <TextChannel> client.channels.cache.get("669245652664057867");
    channel = await channel.fetch();

    let messages = (await channel.messages.fetch({limit: 100})).array();

    console.log(messages.length)
    for (let i = 0; i !== messages.length ; i++) {
        let currentEmbed = messages[i].embeds[0];
        let split = currentEmbed.author.name.split(" ");

        split.splice (split.length-2, 1);
        let quoteYear = split[split.length-1];
        split.pop();
        let quoteUserText = split.join(" ");

        let quoteUser : string;
        let members = (await client.guilds.cache.get("264032838712688640").members.fetch()).array();
        for (let j = 0; j !== members.length ; j++) {
            if (members[j].nickname === quoteUserText) quoteUser = members[j].id;
            else if (quoteUserText === "not a real boy" || quoteUserText === "egirl not a real boy" || quoteUserText === "smol gei") quoteUser = "102059641529188352";
            else if (quoteUserText === "Mr. Boner") quoteUser = "344096086358753300";
            else if (quoteUserText === "debbie") quoteUser = "166942268962373641";
            else if (quoteUserText === "Big Man") quoteUser = "555795554232303626";
            else if (quoteUserText === "Lynx") quoteUser = "362632568836849664";
            else if (quoteUserText === "Kankru Kbir") quoteUser = "102715870417014784";
            else if (quoteUserText === "Keanu Wheeze") quoteUser = "222275158415638530";
            else if (quoteUserText === "Djolkica") quoteUser = "417747475361693699";
            else if (quoteUserText === "slick with input and outputaudio" || quoteUserText === "how are u yes im pro") quoteUser = "216493641982541824";
            else if (quoteUserText === "JanCHa") quoteUser = "231056637085876225";
            else if (quoteUserText === "LC") quoteUser = "428124425611640842";

        }

        if(quoteUser === undefined) console.log(quoteUserText)

        let splitSubmitted = currentEmbed.footer.text.split(" ");
        splitSubmitted.splice(0, 2)
        let submitted = splitSubmitted.join(" ");

        let user: string;
        for (let j = 0; j !== members.length ; j++) {
            if (members[j].nickname === submitted) user = members[j].id;
            else if (submitted === "not a real boy" || submitted === "egirl not a real boy" || submitted === "smol gei") user = "102059641529188352";
            else if (submitted === "Mr. Boner") user = "344096086358753300";
        }

        if(user === undefined) console.log(submitted);

        let object = {
            quoteText: currentEmbed.title,
            quoteYear : quoteYear,
            quoteUser: quoteUser,
            guild: "264032838712688640",
            message: messages[i].id,
            user: user,
            submittedTimestamp: messages[i].createdTimestamp,
            updatedTimestamp: messages[i].createdTimestamp,
            accepted: true,
            pending: false
        }

        quotes.push(object);

    }

    console.log(JSON.stringify(quotes));

    console.log("Bot has started");
});

function startBot() {
    client.login(properties.bot.token).catch(error => console.log("Error logging in; " + error));
}

startBot();
