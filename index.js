const Discord = require('discord.js');
const Attachment = require('discord.js');
const config = require('./config.json');
const roasts = require('./roasts.json');
const lennys = require('./lennys.json');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const fs = require('fs');

const admin = ["<@236541977863127041>", "<@119864531638812672>"];

const botId = "<@555795554232303626>";

const pWords = ["pls","plz","plox","plx","plis","pliz","please","pleaze"];

const pNo = ["cunt","bitch","retard","you cock","you fucker","you slow clubfooted bastard","you retarded scythe main kid","stupid stuck in gold"];


function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('Restarting...')
    .then(msg => client.destroy())
    .then(() => client.login(token));
}

Object.prototype.isEmpty = function() {
    for(var key in this) {
        if(this.hasOwnProperty(key))
            return false;
    }
    return true;
}

function removeElement(array, element) {
  const index = array.indexOf(element);

  if (index !== -1) {
    array.splice(index, 1);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


/*var dt = new Date();
var seconds = dt.getSeconds();
var minutes = dt.getMinutes();
var hours = dt.getHours();
var date = dt.getDate();
var month = dt.getMonth();
var year = dt.getFullYear();

minutes = (minutes < 10 ? "0" : "") + minutes;
seconds = (seconds < 10 ? "0" : "") + seconds;*/


client.once('ready', () => {
    console.log(` Ready!`);
});

client.login(token);

const saidPlock = [];



client.on('message', message => {

    /*dt = new Date();
    minutes = dt.getMinutes();
    hours = dt.getHours();
    date = dt.getDate();
    month = dt.getMonth();
    year = dt.getFullYear();

    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;*/

    /*for (var k = message.mentions.users.size - 1; k >= 0; k--) {
       message.mentions.members[0]
    }*/

    console.log(`${message.channel.name}// ${message.author.username}(${message.author})` + ": " + message.content.toString());
    /*const mentionsArray = Array.from(message.mentions.users);
    console.log(mentionsArray[0]);*/
    

    if(saidPlock.includes(message.author.username)){

        if(message.content.toLowerCase().includes("plock") && !message.content.startsWith(prefix)){
            removeElement(saidPlock, message.author.username);
            console.log(saidPlock);
            return message.reply("good job, don't say the p-word in the future... I'll be watching you");
        }
        console.log(saidPlock);



        message.reply("you still didn't correct yourself " + pNo[getRandomInt(pNo.length)]);
        return message.delete();
        
    }
    
    var isPls = message.content.toLowerCase().includes("please") || message.content.toLowerCase().includes("pls") || message.content.toLowerCase().includes("plz") || message.content.toLowerCase().includes("pleaze") || message.content.toLowerCase().includes("plox") || message.content.toLowerCase().includes("plx") || message.content.toLowerCase().includes("plis") || message.content.toLowerCase().includes("pliz");

    if (message.content == "urmomgay" && !message.author.bot) {
        message.channel.send('no u');
    }
    else if(message.content.toLowerCase() == "no u" && !message.author.bot){
        message.channel.send('no u');
    }
    else if (isPls && !message.author.bot) {
        message.channel.send(`It's not please, it's plock dumbass`);
        if(!saidPlock.includes(message.author.username)){
            saidPlock.push(message.author.username);
        }
        console.log(saidPlock);
    }





    /*// ECONOMY
    //    |
    //    |
    //    V

    // JSON Files
    let userData = JSON.parse(fs.readFileSync('storage/userData.json', 'utf8'));


    // Events
    if (!userData[message.author.id + message.guild.id]) userData[message.author.id + message.guild.id] = {}
    if (!userData[message.author.id + message.guild.id].money) userData[message.author.id + message.guild.id].money = 1000;

    fs.writeFile('storage/userData.json', JSON.stringify(userData), (err) => {
        if (err) console.error(err);
    });



















    //    A
    //    |
    //    |
    // ECONOMY




*/
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();






    


    /*command template:

      case (""):
            
            break;

    */



    switch (command){
        case ("ping"):
            
            message.channel.send('Pong motherfucker'); 
            
            break;

        case ("avatar"):
            
            if (!message.mentions.users.size) {
                var str = message.author.displayAvatarURL;
                if (str.includes("?")){
                    var iQ = str.indexOf("?");
                    var imgurl = str.slice(0, iQ);
                    attachment = new Discord.Attachment(imgurl);
                    return message.channel.send(attachment);
                }
                else {
                    attachment = new Discord.Attachment(message.author.displayAvatarURL);
                    return message.channel.send(attachment);
                }
            }
            else {

                const taggedUser = message.mentions.users.first();
                var str = taggedUser.displayAvatarURL;
                if (str.includes("?")){
                    var iQ = str.indexOf("?");
                    var imgurl = str.slice(0, iQ);
                    attachment = new Discord.Attachment(imgurl);
                    return message.channel.send(attachment);
                }
                else {
                    attachment = new Discord.Attachment(message.author.displayAvatarURL);
                    return message.channel.send(attachment);
                }
            }
            
            break;

        case ("args"):
            if (!args.length) {
                return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
            }

            else if (args[0] === 'urmomgay') {
                return message.channel.send('no u');
            }

            message.channel.send(`First argument: ${args[0]}`);
            
            break;

        case ("typeracer"):

            if (!message.mentions.users.size) {
                
            }

            const taggedUser = message.mentions.users.first();


            message.react("✅");
            message.react("❎");

            //message.channel.send()

            //message.channel.send(`You wanted to name: ${taggedUser.username}`);
            
            break;

        case ("roast"):
            var randomRoast = roasts[Math.floor(Math.random()*roasts.length)];
            if (!message.mentions.users.size){
                return message.reply(randomRoast);
            }
            else{
                const taggedUser = message.mentions.users.first();

                if(taggedUser == botId){
                    return message.channel.reply("nice try, faggot")
                }

                return message.channel.send(`${taggedUser}, ` + randomRoast);
            }

            break;

        case ("lenny"):

            var randomLenny = lennys[Math.floor(Math.random()*lennys.length)];

            return message.channel.send(randomLenny);

            break;

        case ("hownig"):

            var randomInt = getRandomInt(100);
            var randomIntBM = getRandomInt(1000);

            

            if (!message.mentions.users.size){

                return message.reply(`you are ${randomInt}% nigger, sorry 🤷`);

            }
            else{
                const taggedUser = message.mentions.users.first();

                if(taggedUser == botId){
                    return message.channel.send("I'm 100% nigga")
                }

                return message.channel.send(`${taggedUser}, you are ${randomInt}% nigger, sorry 🤷`);

            }

            break;

        case ("help"):

            message.channel.send("avatar - checccck your avatar or the person you mentioned \nroast - roast yourself or the person you mentioned \nlenny - gives you a random lenny ʕ ͡° ʖ̯ ͡°ʔ \nhownig - check how nig you are or the person you mentioned");

            break;

        case ("die"):

            if(message.author == admin[0] || message.author == admin[1]){

                resetBot(message.channel);
                break;

            }
            else{
                message.reply(`you don't have the permission to use this command`);
            }

            break;

        case ("sinners"):

            if(saidPlock.isEmpty()){
                return message.channel.send("Thanks to the ALMIGHTY GOD OF PLOCK, there are none");
            }

            message.channel.send(`Unredeemed nignogs who used the p-word:\n${saidPlock}`);
            
            break;

        /*case ("connect4"):

            if (!message.mentions.users.size){

                message.channel.send(`${message.author} offers anyone to play connect four.`).then(function(message){
                    message.react("✅");
                    message.react("❎");
                });

            }
            else{

                const taggedUser = message.mentions.users.first();

                var column1 = ["⚫","⚫","⚫","⚫","⚫","⚫"]
                var column2 = ["⚫","⚫","⚫","⚫","⚫","⚫"]
                var column3 = ["⚫","⚫","⚫","⚫","⚫","⚫"]
                var column4 = ["⚫","⚫","⚫","⚫","⚫","⚫"]
                var column5 = ["⚫","⚫","⚫","⚫","⚫","⚫"]
                var column6 = ["⚫","⚫","⚫","⚫","⚫","⚫"]
                var column7 = ["⚫","⚫","⚫","⚫","⚫","⚫"]

                message.channel.send(`${taggedUser}, ${message.author.username} challenged you to play connect four.`).then(function(message){
                        message.react("✅").then(function(){
                            message.react("❎");
                        });
                    });
                message.channel.send(`${column1[5]}${column2[5]}${column3[5]}${column4[5]}${column5[5]}${column6[5]}${column7[5]}\n${column1[4]}${column2[4]}${column3[4]}${column4[4]}${column5[4]}${column6[4]}${column7[4]}\n${column1[3]}${column2[3]}${column3[3]}${column4[3]}${column5[3]}${column6[3]}${column7[3]}\n${column1[2]}${column2[2]}${column3[2]}${column4[2]}${column5[2]}${column6[2]}${column7[2]}\n${column1[1]}${column2[1]}${column3[1]}${column4[1]}${column5[1]}${column6[1]}${column7[1]}\n${column1[0]}${column2[0]}${column3[0]}${column4[0]}${column5[0]}${column6[0]}${column7[0]}`).then(function(message){

                    message.react('1');

                });

                //var i;

                //for (i = 5; i >= 0; i--){

                //    if(column1[i])


                //}

            }

            break;*/

    }

});

