
const Discord = require("discord.js")
const config = require("./config.json");
const client = new Discord.Client()
const fs = require("fs");

let date_ob = new Date();
// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();
// current hours
let hours = date_ob.getHours();
// current minutes
let minutes = date_ob.getMinutes();
// current seconds
let seconds = date_ob.getSeconds();

let currentTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

const prefix = "?";

let wholeMessage = "";

const bannable = ["pog", "wagwan", "pepega"];

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})



client.on("message", function(message) {
    client.user.setStatus("dnd");
    client.user.setActivity("calling based department");
    if (message.author.bot) return;
    const bodyNoPre = message.content.split(" ");
    console.log(bodyNoPre);
    bodyNoPre.forEach((element) => {
        wholeMessage += element + " ";
        bannable.forEach((ban) => {
        if(element.toLowerCase() === ban) {
            message.member.kick("a")
                .then(() =>  console.log("kICK HIM"))
                .catch(console.error);
        }

        });
            if(element.toLowerCase() === "dababy") {
            message.reply("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimgix.ranker.com%2Fuser_node_img%2F4269%2F85377217%2Foriginal%2Fdababy-photo-u1%3Ffm%3Dpjpg%26q%3D80&f=1&nofb=1");
        } else if(element.toLowerCase().startsWith("-") === true || element.toLowerCase().startsWith("_") === true) {
            message.reply("Sponsored message by ?Gang: We beg you to stop using the ! or _ command since its very unefficient and is going to break your pc. Here is the proof: https://imgur.com/5Vavt3N");
        } else if(element.toLowerCase() === "same") {
                message.reply("same");
            } else if(element.toLowerCase() === "<@839017854463377408>") {
                message.author.send("Based department is calling");
                message.author.send("Accept: ✅ |  Accept: ✅");
            } else if(element.toLowerCase() === "sus") {
                message.author.send('https://tenor.com/view/linus-among-us-impostor-sus-tech-tip-gif-20214374').then(console.log("Sent to " + message.author.username));
            }

    });

    /*if(wholeMessage.search('thot') === true) {
        console.log("IF STATEMENT WORKS????")
        message.member.kick("being retarded as always")
            .then(() =>  console.log("kICK HIM"))
            .catch(console.error);
    }*/

    fs.appendFile((message.author.username + ".txt"), currentTime + ": " + message.author.username + ": " + wholeMessage + ", \n", (err) => {
        if (err)
            console.log(err);
        console.log(wholeMessage);
        wholeMessage = ""
    });


    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }  else if (command === "sum") {
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter += x);
        message.reply(`The sum of all the arguments you provided is ${sum}!`);
    } else if (command === "kick") {
        try {
            let toBeKicked = message.mentions.members.first();
            toBeKicked.kick("ye ye")
                .then(() => console.log("kICK HIM"))
                .catch(() => message.reply("YOU DONT HAVE THE RIGHT PERMISSIONS TO DO THAT"));
        } catch (err) {
            message.reply("You dont have the right permissions do that!")
        }
    } else if (command === "") {
        message.reply("" +
            "Available commands for based bot: \n" +
            "?ping -> shows the latency of the bot\n" +
            "?sum -> gives the sum of multiple numbers\n" +
            "?kick @ -> kicks the person you mention (Only if you have the permission to do that)\n" +
            "?tictactoe -> starts a game of tic tac toe." +
            "Now whether fck off or type something!\n")
    } else if (command === "tictactoe") {
        const circle = "⭕";
        const x = "❌";
        const tie = "";
        let round = 0;
        const empty = ":white_square_button:";
        let field = [empty,empty,empty,empty,empty,empty,empty,empty,empty];
        let emptyFields = [];
        let formatedField = field[0] + field[1] + field[2] + "\n" + field[3] + field[4] + field[5] + "\n" + field[6] + field[7] + field [8];
        let ended = false;

        // for loop -> checks if field[i] === empty -> saves index in index array -> at the end it chooses a random index out of emptyFields.length-1
        // for above -> 2 if statements for O = bot and X = user
        // Get random position
        // Dont think this does anything but im too scared to take it out
        if (round === 4){
            console.log("HAHAHAH");
            return;
        } else {
            emojiReactions();
        }


        function setUserInput(index) {
            field[index] = x;

            console.log("THIS SHOULD HAPPEN BEFORE BOT INPUT: INDEX: " + index);
        }

        function randNum(max) {
            return Math.floor(Math.random() * max);
        }

        function setBotInput() {
                for(let i = 0; i<field.length; i++) {
                    if (field[i] === empty) {
                        emptyFields.push(i)
                        //emptyfields isnt empt
                        console.log(i);
                    }
                }
                console.log("THIS SHOULD HAPPEN AFTER USER INPUT: INDEX: ");
                let botIndex = emptyFields[randNum(emptyFields.length)];
                console.log(botIndex);
                field[botIndex] = circle;
                formatedField = field[0] + field[1] + field[2] + "\n" + field[3] + field[4] + field[5] + "\n" + field[6] + field[7] + field [8];



                message.channel.send(formatedField);
                emptyFields = [];
                emojiReactions();
        }

        function executeAll(num) {

                if (field[num] === empty) {
                    setUserInput(num);
                    setBotInput();
                    checkIfWin(x);
                    if(ended !== true) {
                        checkIfWin(circle);
                        checkIfWin(tie);
                        round++;
                    }
                } else {
                    message.reply("this field is already taken");
                    emojiReactions();
                }
        }


        function gameEnded(side) {
            if(side === x) {
                message.reply("The game has ended").then(message.reply("Congrats! You won against a stupid AI."));
            } else if(side === circle) {
                message.reply("The game has ended").then(message.reply("HOW DID YOU MANAGE TO LOSE AGAINST A RANDOM NUMBER GENERATOR?! Pretty sus if you ask me.")).then(message.reply("https://tenor.com/view/19dollar-fortnite-card-among-us-amogus-sus-red-among-sus-gif-20549014")).catch(console.error);
            } else if(side === tie) {
                message.reply("The game has ended").then(message.reply("Should have been an easy win but ok..."));
            }
            ended = true;
        }

        function checkIfWin(side) {
            // 0, 1, 2 / 3, 4 ,5 / 6, 7, 8 / 0, 4, 8 / 2, 4, 6 / 1, 4, 7 / 0, 3, 6 / 2, 5, 8

            //side is whether circle or x

            if(field[0] === side && field[1] === side && field[2] === side) {
                gameEnded(side);
            } else if(field[3] === side && field[4] === side && field[5] === side) {
                gameEnded(side);
            } else if(field[6] === side && field[7] === side && field[8] === side) {
                gameEnded(side);

            } else if(field[0] === side && field[4] === side && field[8] === side) {
                gameEnded(side);

            }else if(field[2] === side && field[4] === side && field[6] === side) {
                gameEnded(side);

            }else if(field[1] === side && field[4] === side && field[7] === side) {
                gameEnded(side);

            }else if(field[0] === side && field[3] === side && field[6] === side) {
                gameEnded(side);

            }else if(field[2] === side && field[5] === side && field[8] === side) {
                gameEnded(side);

            } else if(emptyFields.length === 0 && round === 5){
                gameEnded(tie);

            }
        }

        function emojiReactions() {
            message.react('1️⃣');
            message.react('2️⃣');
            message.react('3️⃣');
            message.react('4️⃣');
            message.react('5️⃣');
            message.react('6️⃣');
            message.react('7️⃣');
            message.react('8️⃣');
            message.react('9️⃣');


            const filter = (reaction, user) => {
                return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;

            };

            message.awaitReactions(filter, {max: 1, time: 180000, errors: ['time']})
                .then(collected => {
                    const reaction = collected.first();
                    console.log(reaction.emoji.name);
                    if (ended !== true) {
                        if (reaction.emoji.name === '1️⃣') {
                            let num = 0;
                            message.reply('you reacted with a one');
                            executeAll(num);

                        } else if (reaction.emoji.name === "2️⃣") {
                            let num = 1;
                            message.reply('you reacted with a two');
                            executeAll(num);

                        } else if (reaction.emoji.name === "3️⃣") {
                            let num = 2;
                            message.reply('you reacted with a three');
                            executeAll(num);
                        } else if (reaction.emoji.name === "4️⃣") {
                            let num = 3;
                            message.reply('you reacted with a four');
                            executeAll(num);
                        } else if (reaction.emoji.name === "5️⃣") {
                            let num = 4;
                            message.reply('you reacted with a five');
                            executeAll(num);
                        } else if (reaction.emoji.name === "6️⃣") {
                            let num = 5;
                            message.reply('you reacted with a six');
                            executeAll(num);
                        } else if (reaction.emoji.name === "7️⃣") {
                            let num = 6;
                            message.reply('you reacted with a seven');
                            executeAll(num);
                        } else if (reaction.emoji.name === "8️⃣") {
                            let num = 7;
                            message.reply('you reacted with a eight');
                            executeAll(num);
                        } else if (reaction.emoji.name === "9️⃣") {
                            let num = 8;
                            message.reply("you reacted with a nine");
                            executeAll(num);
                        }
                    } else {
                        console.log("IT FINALLY ENDED");
                        return;
                    }
                })

        }


        message.channel.send(formatedField);
    } else if (command === "download") {
        let toBeExposed = message.mentions.members.first();
        message.author.send({
            files: [{
                attachment: toBeExposed.displayName + ".txt",
                name:  toBeExposed.displayName + ".txt"
            }]
        });
    } else if (command === "invite") {
        message.channel.createInvite({ unique: true, temporary: false }).then(invite => {
            message.reply("https://discord.gg/" + invite.code);
        });
    } else if (command === "cheese") {
        message.channel.send("🧀");
    } else if (command === "chess") {
        const wk = "<:kingw:841224208972513320>";
        const bk = "<:kingb:841224209086152704>";
        const wq = "<:queenw:841224234457628712>";
        const bq = "<:queenb:841224234420142080>";
        const wr = "<:rookw:841224234315284491>";
        const br = "<:rookb:841224234444652574>";
        const wb = "<:bishopw:841224183492509696>";
        const bb = "<:bishopb:841223730272403456>";
        const wn = "<:kinghtw:841224209069375509>";
        const bn = "<:knightb:841224208587292713>";
        const wp = "<:pawnw:841224234508484608>";
        const bp = "<:pawnb:841224234289725470>";
        const white = ":white_large_square:";
        const black = ":black_large_square:";
        let chessField = [
            [wr,wn,wb,wk,wq,wb,wn,wr],
            [wp,wp,wp,wp,wp,wp,wp,wp],
            [white, black, white, black, white, black, white, black],
            [black, white, black, white, black, white, black, white],
            [white, black, white, black, white, black, white, black],
            [black, white, black, white, black, white, black, white],
            [bp,bp,bp,bp,bp,bp,bp,bp],
            [br,bn,bb,bq,bk,bb,bn,br]
        ];

        //TODO: RULES FOR CHESS + MAYBE PARAMETER FOR COLOR + CREATE EAT FUNCTION WITH PAWNTYPE PARAMETER + USE USER INPUT TO CHECK
        let y = 0;
        let x = 0;
        let currentPos = chessField[x][y];
        function pawn() {
            if(currentPos === wp) {
                // GO DOWN
                if(chessField[x+1][y] === black || chessField[x+1][y] === white) {
                    //it is allowed to go down here
                } else {
                    message.reply("There is something blocking the way for this pawn, please try something else");
                }

                //if(chessField[x+1][y-1] !== black)
            } else if (currentPos === bp) {
                // GO UP
                if(chessField[x-1][y] === black || chessField[x-1][y] === white) {


                } else {
                    message.reply("There is something blocking the way for this pawn, please try something else");
                }

                // diagonal eat
                try {
                    if (chessField[x + 1][y + 1] !== black || chessField[x + 1][y + 1] !== white) {
                        //allow
                    } else if (chessField[x + 1][y - 1] !== black || chessField[x + 1][y - 1] !== white) {
                        //allow
                    } else {
                        message.reply("There is no pawn you can eat here");
                    }
                } catch (err) {
                    console.log(err);
                    message.reply("edge pawns currently not working");
                }
            }

            //TODO: one or two at start pos
        }

        function rook() {

        }

        function knight() {

        }

        function bishop() {

        }

        function king() {
            //literally the easiest one, just has 1 block movement +
        }

        function queen() {

        }

        function eat(pawnType) {
            switch (pawnType) {
                //consider creating shared names -> queen for bq + wq
                case bq:
                    // full diagonal + full cross
                    break;
                case wq:
                    // full diagonal + full cross
                    break;
                case wk:
                    // one in all directions
                    break;
                case bk:
                    // one in all directions
                    break;
                case wb:
                    // full diagonal
                    break;
                case bb:
                    // full diagonal
                    break;
                case bn:
                    // 2 same direction then one left or right (capital gamma)
                    break;
                case wn:
                    // 2 same direction then one left or right (capital gamma)
                    break;
                case br:
                    // full cross
                    break;
                case wr:
                    // full cross
                    break;
                case bp:
                    // only diagonally for pawns one ahead of pawn
                    break;
                case wp:
                    // only diagonally for pawns one ahead of pawn
                    break;
            }
        }

        function checkIfEmpty(pawnType) {

        }

        let formatedChessField = "";
        chessField.forEach(function (value) {
            formatedChessField += "\n";
            value.forEach(function (element) {
                    formatedChessField += element;

            });
        });

        message.reply(formatedChessField);
    }
    /*bodyNoPre.forEach((word) => {
        console.log("IT WORKS");
        if (word === '<@!429201238048112641>' || word === '<@!405783694306181121>') { //|| message.content === "@The Bot Abuser" || message.content === "@Big mac#9372") {
            //else if (command === "kick") {
            console.log("IF WORKS");
            let mentionMember = message.member;
            message.reply("GET BANNED SCRUB")
            mentionMember.kick("very useless bot")
                .then(() => console.log(`Kicked ${mentionMember.displayName}`))
                .catch(console.error);
            const kicker = args.map(x => String(x));
              let mentionMember = message.mentions.members.first();
              mentionMember.kick("Retarded")
                      .then(() => console.log(`Kicked ${member.displayName}`))
                      .catch(console.error);

        }
    });    */

});


client.login(config.BOT_TOKEN);
// For this create a new config.json file and save the bot token like this { "BOT_TOKEN": "<ENTER TOKEN HERE>" }
