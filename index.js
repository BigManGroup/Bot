const Discord = require('discord.js');
const Attachment = require('discord.js');
const config = require('./config.json');
const mysql = require('mysql');
const async = require('async');
const roasts = require('./roasts.json');
const lennys = require('./lennys.json');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const fs = require('fs');

const admin = ["<@236541977863127041>", "<@119864531638812672>"];
const admin_id = ["236541977863127041", "119864531638812672"];

const botId = "<@555795554232303626>";
const botIdd = "555795554232303626";

const pWords = ["plz","plox","plx","plis","pliz","please","pleaze"];

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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



//					|
// SQL functions    |
//					V



const mysqlConfig = {
  host: "remotemysql.com",
  user: "EdKkBxI0w1",
  password: "2eaNt36gNS",
  database: "EdKkBxI0w1"
};


class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}


/*function countRows()
{	
	var queryResult;
	database = new Database(mysqlConfig);

  	return database.query("SELECT COUNT(*) FROM userData").then(result => {
  		queryResult = result;
  		return database.close();
  	}).then(() => {
  		console.log(queryResult);
  	});
};

async function getNewId()
{
	var x = await countRows();
	console.log(x);
	
	
  	con.query("SELECT COUNT(*) FROM userData", function (err, result, fields) 
  	{
  		if(err) {
	    	throw err;
	  	} else {
	    	console.log(result);
	  	}
  	});
  	
  	
};*/












//					A
// SQL functions    |
//					|



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
    console.log(`Ready!`);
});

client.login(token);








const saidPlock = [];

const wereChecked = [];



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
    
    var isPls = message.content.toLowerCase().includes("please") || message.content.toLowerCase().includes("plz") || message.content.toLowerCase().includes("pleaze") || message.content.toLowerCase().includes("plox") || message.content.toLowerCase().includes("plx") || message.content.toLowerCase().includes("plis") || message.content.toLowerCase().includes("pliz");

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





    

	



    if (!message.content.startsWith(prefix) || message.author.bot/* || message.author.id != admin_id[0]*/) return;
    

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();



    // Inserting:
	// "INSERT INTO `userData` (`id`, `username`, `cash`) VALUES ('236541977863127041', 'Raven', '1000')";
	// Creating table:
	// "CREATE TABLE userData (id BIGINT, username VARCHAR(255), cash INT)";
	// INSERT INTO `userData`(`id`, `discord_id`, `username`, `cash`, `is_admin`, `peepee`, `hownig`, `is_bm`) VALUES ('1','236541977863127041','Raven','1000','1','7','24','1')

    

    //}




    //SQL HANDLING
    //  |
    //  |
    //  V



    	
    	

    	//
    	//   Creating an entry, if one doesn't exist
    	//
    	//
    	//   Updating the entry's `username`, `is_bm`
    	//
    	//
    	//   create peepee, hownig, if 0
    	//

		var is_bm;
    	var is_bm_bool;
    	if(message.member.roles.find(r => r.name === "big man") || message.member.roles.find(r => r.name === "big boi"))
    	{
    		is_bm = 1;
    		is_bm_bool = true;
    	}else
    	{
    		is_bm = 0;
    		is_bm_bool = false;
    	}
    	var database = new Database(mysqlConfig);
    	var newId;
    	database.query(
    		"SELECT COUNT(*) FROM `userData`"
    	).then(result => {
    		newId = result[0]['COUNT(*)'] + 1;
    	}).then(() => {
    		database.query("INSERT IGNORE INTO `userData` (`id`, `discord_id`, `cash`) VALUES " + "(" + "'" + `${newId}` + "'" + "," + "'" + `${message.author.id}` + "'" + ", '1000'" + ")");
    	}).then(() => {
    		database.query(
    		"UPDATE IGNORE userData SET username='" + `${message.author.username}` + "'" + " WHERE discord_id='" + `${message.author.id}` + "'"
	    	).then(result => {
	    		database.query("UPDATE IGNORE userData SET is_bm='" + `${is_bm}` + "'" + " WHERE discord_id='" + `${message.author.id}` + "'");
	    	}).then(() => {
	    		database.query(
    				"SELECT peepee,hownig FROM userData WHERE discord_id='" + `${message.author.id}` + "'"
		    	).then(result => {
		    		if(result[0].peepee == 0){
		    			var newPeepee = getRandomInt(3, 15);
		    			database.query(
		    				"UPDATE IGNORE userData SET peepee='" + `${newPeepee}` + "'" + " WHERE discord_id='" + `${message.author.id}` + "'"
		    			);
		    		}

		    		if(result[0].hownig == 0){
		    			var newHownig = getRandomInt(1, 100);
		    			database.query(
		    				"UPDATE IGNORE userData SET hownig='" + `${newHownig}` + "'" + " WHERE discord_id='" + `${message.author.id}` + "'"
		    			);
		    		}
		    	}).then(() => {
		    		database.close();
		    	});
	    	});
    	});

    	/*if(message.guild.member(databaseTaggedUser).roles.find(r => r.name === "big boi")){
    		console.log("Mentioned user is a Big Man");
    	}
    	else{
    		console.log("Mentioned user is not a Big Man");
    	}*/

    	//
    	//   Generate if someone is mentioned
    	//

    	if (!message.mentions.users.size){

    	}else{
    		var databaseTaggedUser = message.mentions.users.first();

	    	//
	    	//   Creating an entry, if one doesn't exist
	    	//
	    	//
	    	//   Updating the entry's `username`, `is_bm`
	    	//
	    	//
	    	//   create peepee, hownig, if 0
	    	//
	    		var is_bm1;
		    	var is_bm_bool1;
		    	if(message.guild.member(databaseTaggedUser).roles.find(r => r.name === "big man") || message.guild.member(databaseTaggedUser).roles.find(r => r.name === "big boi"))
		    	{
		    		is_bm1 = 1;
		    		is_bm_bool1 = true;
		    	}else
		    	{
		    		is_bm1 = 0;
		    		is_bm_bool1 = false;
		    	}

	    	if(databaseTaggedUser.id == botIdd){

	    	}else{

		    	var database7 = new Database(mysqlConfig);
		    	database7.query(
		    		"SELECT COUNT(*) FROM `userData`"
		    	).then(result => {
		    		newId = result[0]['COUNT(*)'] + 1;
		    	}).then(() => {
		    		database7.query("INSERT IGNORE INTO `userData` (`id`, `discord_id`, `cash`) VALUES " + "(" + "'" + `${newId}` + "'" + "," + "'" + `${databaseTaggedUser.id}` + "'" + ", '1000'" + ")");
		    	}).then(() => {
		    		database7.query(
		    		"UPDATE IGNORE userData SET username='" + `${databaseTaggedUser.username}` + "'" + " WHERE discord_id='" + `${databaseTaggedUser.id}` + "'"
			    	).then(result => {
			    		database7.query("UPDATE IGNORE userData SET is_bm='" + `${is_bm1}` + "'" + " WHERE discord_id='" + `${databaseTaggedUser.id}` + "'");
			    	}).then(() => {
			    		database7.query(
		    				"SELECT peepee,hownig FROM userData WHERE discord_id='" + `${databaseTaggedUser.id}` + "'"
		    			).then(result => {
		    				if(result[0].peepee == 0){
			    				var newPeepee = getRandomInt(3, 15);
			    				database7.query(
			    					"UPDATE IGNORE userData SET peepee='" + `${newPeepee}` + "'" + " WHERE discord_id='" + `${databaseTaggedUser.id}` + "'"
			    				);
		    				}

				    		if(result[0].hownig == 0){
				    			var newHownig = getRandomInt(1, 100);
				    			database7.query(
				    				"UPDATE IGNORE userData SET hownig='" + `${newHownig}` + "'" + " WHERE discord_id='" + `${databaseTaggedUser.id}` + "'"
				    			);
				    		}
				    	}).then(() => {
				    		database7.close();
				    	});
			    	});
		    	});		    	
		    	
		    	
		    	
	    	}
    	};

    //  A
    //  |
    //  |
    //SQL HANDLING






    


    /*command template:

	case (""):

		break;

    */



    switch (command){
        case ("ping"):
            
            message.channel.send('Pong motherfucker'); 
            
            break;

        case ("bank"):

        	var database3 = new Database(mysqlConfig);
        	database3.query(
        		"SELECT cash FROM userData WHERE discord_id='" + `${message.author.id}` + "'"
        	).then(result => {
        		var currentCash = result[0].cash;
        		message.channel.send(`${currentCash} Big Coins are present on your bank account`)
        	}).then(() => {
        		database3.close();
        	});

		break;

		case ("peepee"):

			var database4 = new Database(mysqlConfig);

			if (!message.mentions.users.size){
				database4.query(
					"SELECT peepee FROM userData WHERE discord_id='" + `${message.author.id}` + "'"
				).then(result => {
					var yourPeepee = result[0].peepee;
					var peepeeString = "8";
					for (var ii = 0; ii < yourPeepee; ii++) { 
	  				peepeeString += "="
					}
					peepeeString += "D";
					message.reply(`here's your peepee \n${peepeeString}`)
				}).then(() => {
					database4.close();
				});
			}else{
				const taggedUser = message.mentions.users.first();

                if(taggedUser == botId){
                    return message.reply("ask your mom")
                }

                database4.query(
					"SELECT peepee FROM userData WHERE discord_id='" + `${taggedUser.id}` + "'"
				).then(result => {
					var yourPeepee = result[0].peepee;
					var peepeeString = "8";
					for (var ii = 0; ii < yourPeepee; ii++) { 
	  				peepeeString += "="
					}
					peepeeString += "D";
					message.reply(`here's ${taggedUser}'s peepee \n${peepeeString}`)
				}).then(() => {
					database4.close();
				});

			}

		break;

		case ("hownig"):

            var database6 = new Database(mysqlConfig);

            

            if (!message.mentions.users.size){

            	database6.query(
            		"SELECT hownig FROM userData WHERE discord_id='" + `${message.author.id}` + "'"
            	).then(result => {
            		var response;
            		if(result[0].hownig <= 40){
            			response = "good job! :thumbsup:"
            		}else{
            			response = "sorry 🤷"
            		}
            		message.reply(`you are ${result[0].hownig}% nigger, ${response}`);
            	}).then(() => {
            		database6.close();
            	});
                

            }
            else{
                const taggedUser = message.mentions.users.first();

                if(taggedUser == botId){
                    return message.channel.send("I'm 100% nigga")
                }

                database6.query(
            		"SELECT hownig FROM userData WHERE discord_id='" + `${taggedUser.id}` + "'"
            	).then(result => {
            		var response;
            		if(result[0].hownig <= 40){
            			response = "good job! :thumbsup:"
            		}else{
            			response = "sorry 🤷"
            		}
            		message.channel.send(`${taggedUser}, you are ${result[0].hownig}% nigger, ${response}`);
            	}).then(() => {
            		database6.close();
            	});

                

            }

            break;

		case ("changepeepee"):

			if(message.member.roles.find(r => r.name === "big man")){
				if (!args.length) {
                	return message.reply("you didn't provide any arguments");
            	}

				var database5 = new Database(mysqlConfig);
				if(!message.mentions.users.size){
					if(typeof args[0] == 'integer'){
						return message.reply("that's not a number dumbass")
					}
					if(args[0] < 1 || args[0] > 15){
						return message.reply("wrong peepee size, minimum is 1, maximum is 15");
					}
					database5.query(
						"UPDATE IGNORE userData SET peepee='" + `${args[0]}` + "'" + " WHERE discord_id='" + `${message.author.id}` + "'"
					).then(() => {
						message.reply(`successfuly changed your peepee size :wink:`);
						database5.close();
					});
				}else{
					if(typeof args[0] == 'integer'){
						return message.reply("that's not a number dumbass")
					}
					if(args[1] < 1 || args[1] > 15){
						return message.reply("wrong peepee size, minimum is 1, maximum is 15");
					}
					
					const taggedUser = message.mentions.users.first();
					database5.query(
						"UPDATE IGNORE userData SET peepee='" + `${args[1]}` + "'" + " WHERE discord_id='" + `${taggedUser.id}` + "'"
					).then(() => {
						message.reply(`successfuly changed ${taggedUser}'s peepee size :wink:`);
						database5.close();
					});

				}
			}else{
				message.reply("you are not a Big Man")
			}

		break;

		case ("changenig"):

			if(message.member.roles.find(r => r.name === "big man")){
				if (!args.length) {
                	return message.reply("you didn't provide any arguments");
            	}

				var database5 = new Database(mysqlConfig);
				if(!message.mentions.users.size){
					if(typeof args[0] == 'integer'){
						return message.reply("that's not a number dumbass")
					}
					if(args[0] < 1 || args[0] > 100){
						return message.reply("wrong number, minimum is 1, maximum is 100");
					}
					database5.query(
						"UPDATE IGNORE userData SET hownig='" + `${args[0]}` + "'" + " WHERE discord_id='" + `${message.author.id}` + "'"
					).then(() => {
						message.reply(`successfuly changed your nigrate :monkey:`);
						database5.close();
					});
				}else{
					if(typeof args[0] == 'integer'){
						return message.reply("that's not a number dumbass")
					}
					if(args[1] < 1 || args[1] > 100){
						return message.reply("wrong number, minimum is 1, maximum is 100");
					}
					
					const taggedUser = message.mentions.users.first();
					database5.query(
						"UPDATE IGNORE userData SET hownig='" + `${args[1]}` + "'" + " WHERE discord_id='" + `${taggedUser.id}` + "'"
					).then(() => {
						message.reply(`successfuly changed ${taggedUser}'s nigrate :monkey:`);
						database5.close();
					});

				}
			}else{
				message.reply("you are not a Big Man")
			}

		break;
		//if(message.member.roles.find(r => r.name === "big man"))

		

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
                    return message.reply("nice try faggot")
                }

                return message.channel.send(`${taggedUser}, ` + randomRoast);
            }

            break;

        case ("lenny"):

            var randomLenny = lennys[Math.floor(Math.random()*lennys.length)];

            return message.channel.send(randomLenny);

            break;

        case ("help"):

            message.channel.send("avatar - check your avatar or the person you mentioned \nroast - roast yourself or the person you mentioned \nlenny - gives you a random lenny ʕ ͡° ʖ̯ ͡°ʔ \nhownig - check how nig you are or the person you mentioned \nsinners - check the list of sinners \npeepee - checks out your peepee :wink: \nchangenig - change your or someone's nigrate \nchangepeepee - change the size of your or someone's schlong \nbank - check your balance");

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

