/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                                                                                                                          //
//      _   _    ____ _  ______   ___ _____                                                                                    //
//     | | / \  / ___| |/ / __ ) / _ \_   _|                                                                                   //
//  _  | |/ _ \| |   | ' /|  _ \| | | || |                                                                                     //
// | |_| / ___ \ |___| . \| |_) | |_| || |                                                                                     //
//  \___/_/   \_\____|_|\_\____/ \___/ |_|                                                                                     //
//                                                                                                                             //
// THIS BOT WAS CREATED BY CAIRO JOHN MITCHELL-ACASON (Cairo#4883)                                                             //
// SELF HOSTING IS NOT SUPPORTED!                                                                                              //
//                                                                                                                             //
// Join the support server here: https://discord.gg/AWEvbyb                                                                    //
//                                                                                                                             //
// Invite the bot here: https://discordapp.com/oauth2/authorize?client_id=437439973751521280&permissions=8&scope=bot           //
//                                                                                                                             //
// Vote for us on our DBL listing here: https://discordbots.org/bot/437439973751521280/vote                                    //
//                                                                                                                             //
// Support issues and enquieries;                                                                                              // 
// - Friend Cairo#4883                                                                                                         //
// - Join the support server (faster response)                                                                                 //
// - Bug report https://jackbot.js.org/bugreport                                                                               //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// Copyright (C) 2018 Cairo John Mitchell-Acason                                 //
//                                                                               //
// This program is free software: you can redistribute it and/or modify          //
// it under the terms of the GNU Affero General Public License as published by   //
// the Free Software Foundation, either version 3 of the License, or             //
// (at your option) any later version.                                           //
//                                                                               // 
// This program is distributed in the hope that it will be useful,               //
// but WITHOUT ANY WARRANTY; without even the implied warranty of                //
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                 //
// GNU Affero General Public License for more details.                           //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////

const fs = require("fs");
const pm2 = require("pm2");
const chalk = require("chalk"); 
const bfd = require("bfd-api");
const dbl = require("dblposter");
const Discord = require("discord.js");

////////////////////////////////////////////////////////////////////
//   ____  _____ _____ ___ _   _ ___ _____ ___ ___  _   _ ____    //
//  |  _ \| ____|  ___|_ _| \ | |_ _|_   _|_ _/ _ \| \ | / ___|   //
//  | | | |  _| | |_   | ||  \| || |  | |  | | | | |  \| \___ \   //
//  | |_| | |___|  _|  | || |\  || |  | |  | | |_| | |\  |___) |  //
//  |____/|_____|_|   |___|_| \_|___| |_| |___\___/|_| \_|____/   //
//                                                                //
////////////////////////////////////////////////////////////////////

const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

const config = require("./config.json");
const colours = require("./colours.json");
const donators = require("./donators.json");
const secrets = require("./authentications.json");

const warn = chalk.keyword('orange');
const botinfo = chalk.magenta;
const info = chalk.blue;
const main = chalk.red;
const actionSuccess = chalk.green;
const actionFailure = chalk.red;
const error = chalk.red;

var bot = new Discord.Client();
var bfd_token = `${secrets.bfd}`;

const BFD = new bfd(bfd_token);
const dblposter = new dbl(`${secrets.dbl}`, bot);

///////////////////////////////////////////////
//   _______     _______ _   _ _____ ____    // 
//  | ____\ \   / / ____| \ | |_   _/ ___|   //
//  |  _|  \ \ / /|  _| |  \| | | | \___ \   //
//  | |___  \ V / | |___| |\  | | |  ___) |  //
//  |_____|  \_/  |_____|_| \_| |_| |____/   //
//                                           //
///////////////////////////////////////////////

pm2.connect(function(err) {
  if (err) throw err;

  setTimeout(function worker() {
    console.log(warn("SYSTEM WARN: Restarting JackBot"));
    pm2.restart('index', function() {});
    setTimeout(worker, 3600000);
  }, 3600000);
});

bot.on('ready', () => {
BFD.postCount(bot.guilds.size, bot.user.id);
});

bot.on('guildCreate', (g) => { BFD.postCount(bot.guilds.size, bot.user.id) });
bot.on('guildDelete', (g) => { BFD.postCount(bot.guilds.size, bot.user.id) });

bot.on('ready', () => {
  bot.user.setActivity('JackSucksAtLife Memes', { type: 'WATCHING' }); //sets status
  bot.user.setStatus('dnd') //changes online status (Online, Idle, Do Not Disturb [dnd])
  .then(console.log) //logs information about the bot to the console
  .catch(console.error) //logs any errors to the console on startup (EG: Depreciation Warnings etc.)
});

bot.on("ready", async () => {
  console.log(main("________________________________________"))
  console.log(main("| JACKBOT (JACKSUCKSATBOT) LEGAL NOTES |"))
  console.log(warn("SYSTEM WARN: This bot uses the AGPL-3.0 license"))
  console.log(warn("SYSTEM WARN: The original code for this bot was created by Cairo John Mitchell-Acason (Cairo#4883)"))
  console.log(main("_________________________________________"))
  console.log(main("| JACKBOT (JACKSUCKSATBOT) COMMAND LINE |"))
  console.log(actionSuccess("SYSTEM CONNECTION NOTICE: I have succesfully connected to the Discord Services & API"))
  console.log(botinfo("SYSTEM BOTINFO NOTICE: I am currently in " + bot.guilds.size + " guilds"))
  console.log(botinfo("SYSTEM BOTINFO NOTICE: Further information can be viewed below"))
});

bot.on("message", function(message){

    if (message.author.bot) return;

    if(message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

    if (message.channel instanceof Discord.DMChannel)
                var embed = new Discord.RichEmbed()
                   .setDescription("<a:no:446899005054648322> **Guilds Only** - You cannot use me in DMs.")
                   .setColor(colours.error)
                message.channel.send(embed);
    if (message.channel instanceof Discord.DMChannel) return

    switch (args[0].toLowerCase()){
/////////////////////////////////////////////////////////////////////////////////////
//   _   _ _____ _     ____     ____ ___  __  __ __  __    _    _   _ ____  ____   //
//  | | | | ____| |   |  _ \   / ___/ _ \|  \/  |  \/  |  / \  | \ | |  _ \/ ___|  // 
//  | |_| |  _| | |   | |_) | | |  | | | | |\/| | |\/| | / _ \ |  \| | | | \___ \  //
//  |  _  | |___| |___|  __/  | |__| |_| | |  | | |  | |/ ___ \| |\  | |_| |___) | //
//  |_| |_|_____|_____|_|      \____\___/|_|  |_|_|  |_/_/   \_\_| \_|____/|____/  //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////
        case "commands":
        case "help":
            var embed = new Discord.RichEmbed()
               .addField("🏠️ Help: Menu","All commands use the prefix `jb!`\nIf there are any issues please join the support server [https://discord.gg/AWEvbyb](https://discord.gg/AWEvbyb)\nﾠ ﾠ\n**===============================**\nﾠ ﾠ")
               .addField("🌐 Command Documentation","You can view the full list of commands with a little description [here](https://cairo2k18.github.io/jackbot/commands/).\nﾠ ﾠ")
               .addField("⚙️ System Commands", "For a full list of system commands type `jb!system` or click [here](https://cairo2k18.github.io/jackbot/commands/#system-commands).\nﾠ ﾠ")
               .addField("📸️ Memey Commands", "For a full list of memey commands type `jb!memes` or click [here](https://cairo2k18.github.io/jackbot/commands/#memey-commands).\nﾠ ﾠ")
               .addField("📹 Video Meme Commands","For a full list of video meme commands type `jb!videomemes` or click [here](https://cairo2k18.github.io/jackbot/commands/#video-meme-commands).\nﾠ ﾠ")
               .addField("💿️ Ate Commands", "For a full list of ATE commands type `jb!ate` or click [here](https://cairo2k18.github.io/jackbot/commands/#active-testing-enviroment).")
               .setColor(message.guild.me.displayColor)
               .setFooter("JackBot | Developed by Cairo#4883", config.botownerpfp)
            message.channel.send(embed)
            break;
        case "system":
            var embed = new Discord.RichEmbed()
               .addField("⚙️ Help: System","All commands use the prefix `jb!`\nIf there are any issues please join the support server [https://discord.gg/AWEvbyb](https://discord.gg/AWEvbyb)\nﾠ ﾠ")
               .addField("💬 Commands (13)","**|** `info` **|** `links` **|** `support` **|** `website` **|** `invite` **|** `updatelogs` **|**\n**|** `version` **|** `ping` **|** `bugs` **|** `github` **|** `trello` **|** `donate` **|** `partner` **|**")
               .setColor(message.guild.me.displayColor)
               .setFooter("JackBot | Developed by Cairo#4883", config.botownerpfp)
            message.channel.send(embed);
            break;
        case "memes":
            var embed = new Discord.RichEmbed()
               .addField("📸 Help: Memes","All commands use the prefix `jb!`\nIf there are any issues please join the support server [https://discord.gg/AWEvbyb](https://discord.gg/AWEvbyb)\nﾠ ﾠ")
               .addField("💬 Commands (40)","**|** `dead` **|** `gag` **|** `immature` **|** `manslaughter` **|** `retard` **|**\n**|** `sticktotheformat` **|** `excited` **|** `gtfo` **|** `junk` **|** `dump` **|**\n**|** `cleaver` **|** `kazoodrop` **|** `smh` **|** `crotch` **|** `murderer` **|**\n**|** `psychopath` **|** `weird` **|** `alien` **|** `shocked` **|** `uhh` **|** `wtf` **|**\n**|** `singing` **|** `suited` **|** `please` **|** `angry` **|** `angelic` **|**\n**|** `kazooholder` **|** `flamin` **|** `satan` **|** `thinking` **|** `swirl` **|**\n**|** `overnight` **|** `kazoo` **|** `explosion` **|** `derp` **|** `twitterllama` **|**\n**|** `monster` **|** `duet` **|** `broke` **|**")
               .setColor(message.guild.me.displayColor)
               .setFooter("JackBot | Developed by Cairo#4883", config.botownerpfp)
            message.channel.send(embed);
            break;
        case "videomemes":
            var embed = new Discord.RichEmbed()
               .addField("📹️ Help: Video Memes","All commands use the prefix `jb!`\nIf there are any issues please join the support server [https://discord.gg/AWEvbyb](https://discord.gg/AWEvbyb)\nﾠ ﾠ")
               .addField("📝 Note","**__These commands are for the [Donator(s)](https://patreon.com/jackbotofficial) only!__**\nﾠ ﾠ")
               .addField("💬 Commands (2)","**|** `spin` **|** `scumbag` **|**")
               .setColor(message.guild.me.displayColor)
               .setFooter("JackBot | Developed by Cairo#4883", config.botownerpfp)
            message.channel.send(embed);
            break;
        case "ate":
            var embed = new Discord.RichEmbed()
               .addField("💿️ Help: Ate","All commands use the prefix `jb!`\nIf there are any issues please join the support server [https://discord.gg/AWEvbyb](https://discord.gg/AWEvbyb)\nﾠ ﾠ")
               .addField("📝 Note","**__These commands are for the BotOwner(s) only!__**\nﾠ ﾠ")
               .addField("💬 Commands (4)","**|** `ate-ping` **|** `ate-check` **|** `ate-eval` **|** `ate-guilds` **|**")
               .setColor(message.guild.me.displayColor)
               .setFooter("JackBot | Developed by Cairo#4883", config.botownerpfp)
            message.channel.send(embed);
            break;
/////////////////////////////////////////////////////////////////////////////////////////////////
//   ______   ______ _____ _____ __  __    ____ ___  __  __ __  __    _    _   _ ____  ____    //
//  / ___\ \ / / ___|_   _| ____|  \/  |  / ___/ _ \|  \/  |  \/  |  / \  | \ | |  _ \/ ___|   //
//  \___ \\ V /\___ \ | | |  _| | |\/| | | |  | | | | |\/| | |\/| | / _ \ |  \| | | | \___ \   //
//   ___) || |  ___) || | | |___| |  | | | |__| |_| | |  | | |  | |/ ___ \| |\  | |_| |___) |  //
//  |____/ |_| |____/ |_| |_____|_|  |_|  \____\___/|_|  |_|_|  |_/_/   \_\_| \_|____/|____/   //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////                     
        case "ping":
            var embed = new Discord.RichEmbed()
                .setDescription("<a:ping:449425545437118464> **I am decently quick with my responses, eh?**")
                .setColor(0x25a1f9)
            message.channel.send(embed);
            break;
        case "about": //alias for info
        case "info":
            var embed = new Discord.RichEmbed()
               .addField("🤖 About This Bot","This bot is a bot full of memes, quotes and many other features that are about JackSucksAtLife. The original version of this bot was created on the **22/04/2018** by `Cairo#4883` in `Discord.JS` a full list of commands can be found by typing `" + config.prefix + "help` or you may continue to read below if you wish to know more about Cairo & JackSucksAtLife.\nﾠ ﾠ")
               .addField("📹 About JackSucksAtLife","JackSucksAtLife is a YouTuber from England, United Kingdom and plays Minecraft.\n**You can view a one minute introduction to JackSucksAtLife here:**\nhttps://www.youtube.com/watch?v=wBj1ApMc7ls\nﾠ \n**Social Media:**\n<:youtube:437431052596805643> **YouTube:** [JackSucksAtLife](https://youtube.com/JackSucksAtLife)\n<:skycade:437430012086583296> **Skycade:** [ID#3](https://skycade.net/members/3)\n<:twitter:437430284938641408> **Twitter:** [@JackMasseyWelsh](https://twitter.com/JackMasseyWelsh)\n<:instagram:437492253557129227> **Instagram:** [@jackmasseywelsh](https://www.instagram.com/jackmasseywelsh)\n<:discord:437503796730527745> **Discord:** Jack#0320\nﾠ ﾠ")
               .addField("💻 About Cairo (The Developer)","Cairo is a Discordian from South Island, New Zealand and codes basic bots.\nﾠ \n**Social Media:**\n<:skycade:437430012086583296> **Skycade:** [ID#3580](https://skycade.net/members/3580)\n<:twitter:437430284938641408> **Twitter:** [@CairoNZ](https://twitter.com/CairoNZ)\n<:discord:437503796730527745> **Discord:** Cairo#4883")
               .setColor(message.guild.me.displayColor)
            message.channel.send(embed);
            break;
        case "invite":
        case "support":
        case "website":
        case "links":
            var embed = new Discord.RichEmbed()
                .addField("🌐 Website", "The bot's website contains the command list, bug report section, a basic overview of the bot and the updatelogs.\n**You can view the website by clicking [here](https://cairo2k18.github.io/jackbot).**\nﾠ ﾠ")
                .addField("❤️ Support Server", "This is the bot's official discord server which can be used for support and general discussion on the bot, jacksucksatlife.\n**You can join this by clicking [here](https://discord.gg/AWEvbyb).**\nﾠ ﾠ")
                .addField("🤖 Bot Invite", "**You can invite JackBot by clicking [here](https://discordapp.com/oauth2/authorize?client_id=437439973751521280&permissions=8&scope=bot) or giving this link to your friend:**\n`https://discordapp.com/oauth2/authorize?client_id=437439973751521280&permissions=8&scope=bot`")
                .setFooter("JackBot | Developed by Cairo#4883", config.botownerpfp)
                .setColor(message.guild.me.displayColor)
            message.channel.send(embed);
            break;
        case "updatelogs":
        case "updatelog":
            var embed = new Discord.RichEmbed()
                .setDescription("<:updates:449795724478119937> **You want to view the updatelogs you say?** - Click [here](https://cairo2k18.github.io/jackbot/updatelog).")
                .setColor(0x3bcc58)
            message.channel.send(embed);
            break;
        case "version":
            var embed = new Discord.RichEmbed()
                .setDescription("💿 Version " + config.version + " [STABLE]")
                .setColor(message.guild.me.displayColor)
            message.channel.send(embed);
            break;
        case "bug": //alias for bugs
        case "bugs":
            var embed = new Discord.RichEmbed()
                .setDescription("<:bugs:449430234287046676> **A bug you say?** - Please report all bugs [here](https://cairo2k18.github.io/jackbot/bugreport/).")
                .setColor(0x3bcc58)
            message.channel.send(embed);
        break;
        case "github":
            var embed = new Discord.RichEmbed()
               .setDescription(":octopus: **I'm open source!** - View jackbot on github [here](https://github.com/cairo2k18/jackbot).")
               .setColor(0x9654f9)
            message.channel.send(embed);
            break;
        case "trello":
            var embed = new Discord.RichEmbed()
               .setDescription(":bulb: **Progress, Bugs, Ideas?** - You can view jackbot's trello [here](https://trello.com/b/vK3U4Qfy).")
               .setColor(0xf4d716)
            message.channel.send(embed);
            break;
        case "patreon": //alias for donate
        case "donate":
            var embed = new Discord.RichEmbed()
               .setDescription(":heart: **Help support jackbot** - You can donate [here](https://www.patreon.com/jackbotofficial).")
               .setColor(0xb21313)
            message.channel.send(embed);
            break; 
        case "partner":
        case "sweatychildren":
        case "sc":
            var embed = new Discord.RichEmbed()
               .setDescription("<:partner:314068430556758017> **__SweatyChildren__** \nWe have partnered with SweatyChildren, join today to get access to exclusive commands only available to use on this server, weekly giveaways to do with the bot and much more.\n[**Click here to join**](https://discord.gg/7Er7Pzt)")
               .setThumbnail("https://raw.githubusercontent.com/Cairo2k18/jackbot/images/newsclogo2018.jpg")
               .setColor(0x1400f7)
            message.channel.send(embed);
            break; 
//////////////////////////////////////////////////////////////////////////////////////
//  __  __ _____ __  __ _____    ____ ___  __  __ __  __    _    _   _ ____  ____   //
// |  \/  | ____|  \/  | ____|  / ___/ _ \|  \/  |  \/  |  / \  | \ | |  _ \/ ___|  //
// | |\/| |  _| | |\/| |  _|   | |  | | | | |\/| | |\/| | / _ \ |  \| | | | \___ \  //
// | |  | | |___| |  | | |___  | |__| |_| | |  | | |  | |/ ___ \| |\  | |_| |___) | //
// |_|  |_|_____|_|  |_|_____|  \____\___/|_|  |_|_|  |_/_/   \_\_| \_|____/|____/  //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
        case "junk":
            var embed = new Discord.RichEmbed()
               .setDescription("**Stop sending me junk mail... please** :newspaper2:")
               .setImage("https://i.imgur.com/S2GqmMz.jpg")
               .setColor(0x0800ff)
            message.channel.send(embed);
            break;
        case "dump":
            var embed = new Discord.RichEmbed()
               .setDescription("**Look at this bloody mess you made guys** :angry:")
               .setImage("https://i.imgur.com/sD9qa1u.png")
               .setColor(0xa02121)
            message.channel.send(embed);
            break;
        case "cleaver":
            var embed = new Discord.RichEmbed()
              .setDescription("**My trusty cleaver! :knife:**")
              .setImage("https://i.imgur.com/eWHj5pD.png")
              .setColor(0xc6baba)
            message.channel.send(embed);
            break;
        case "dead":
            var embed = new Discord.RichEmbed()
               .setDescription("**Jack suffering from baby wipes :baby:**")
               .setImage("https://i.imgur.com/1abxANB.png")
               .setColor(0xc90000)
            message.channel.send(embed);
            break;
        case "gag":
            var embed = new Discord.RichEmbed()
               .setDescription("**Vomit is the best flavour :nauseated_face:**")
               .setImage("https://i.imgur.com/Bh0Qc3M.png")
               .setColor(0xdd3e3e)
            message.channel.send(embed);
            break;
        case "immature":
            var embed = new Discord.RichEmbed()
               .setDescription("**:thinking: This is pretty sexy, I gotta say.**")
               .setImage("https://i.imgur.com/R3aEWac.png")
               .setColor(0xff3ab3)
            message.channel.send(embed);
            ///////////////
            //SECOND PART//
            ///////////////
            var embed = new Discord.RichEmbed()
               .setDescription("**LOL I MADE AN ASS! :joy:**")
               .setImage("https://i.imgur.com/f3znuOD.png")
               .setColor(0xff3ab3)
            message.channel.send(embed);
            break;
        case "manslaughter":
            var embed = new Discord.RichEmbed()
               .setDescription("**NOO! :sob: May you rest in peace, poor peacock :bird:**")
               .setImage("https://i.imgur.com/Inmylei.png")
               .setColor(0x000001)
            message.channel.send(embed);
            ///////////////
            //SECOND PART//
            ///////////////
            var embed = new Discord.RichEmbed()
               .setDescription("**I couldn't help this one.. I'm sorry dude :bat:**")
               .setImage("https://i.imgur.com/OkXRqFc.png")
               .setColor(0x000001)
            message.channel.send(embed);
            //////////////
            //THIRD PART//
            //////////////
            var embed = new Discord.RichEmbed()
               .setDescription("**OMG MY SEXY GAST IS DYING! :fire:**")
               .setImage("https://i.imgur.com/ojvetZs.png")
               .setColor(0x000001)
            message.channel.send(embed);
            break;
        case "retard":
            var embed = new Discord.RichEmbed()
               .setDescription("**Hey ima retard, I didn't know this would happen :astonished:**")
               .setImage("https://i.imgur.com/4eJZ3Tj.png")
               .setColor(0x0f51bc)
            message.channel.send(embed);
            break;
        case "sticktotheformat":
            var embed = new Discord.RichEmbed()
               .setDescription("**Stick :clap: To :clap: The :clap: Format :clap:**")
               .setImage("https://media.tenor.com/images/accd85f9456ed6956001db4743cc7ca9/tenor.gif")
               .setColor(0xfff200)
            message.channel.send(embed);
            break;
        case "excited":
            var embed = new Discord.RichEmbed()
               .setDescription("**10,000 SUBSCRIBERS! cringy music plays\n....You saw nothing :neutral_face:**")
               .setImage("https://media.tenor.com/images/6236b6010241be14eb459a1ef364e92a/tenor.gif")
               .setColor(0xfffbaf)
            message.channel.send(embed);
            break;
        case "levitate":
            var embed = new Discord.RichEmbed()
               .setDescription("**I can levitate and do weird tricks with my stuff.. so what? :levitate:**")
               .setImage("https://media.tenor.com/images/94ca3d978343e252d1e788f6baaf8014/tenor.gif")
               .setColor(0xc92a2a)
            message.channel.send(embed);
            break;
        case "joinskycade":
            var embed = new Discord.RichEmbed()
               .setDescription("**I liek getting people to join my miencraf servhor :satellite:**")
               .setImage("https://i.imgur.com/WN7NAc5.jpg")
               .setColor(0x847d7d)
            message.channel.send(embed);
            break;
        case "nani":
            var embed = new Discord.RichEmbed()
               .setDescription("**NANI!!!**")
               .setImage("https://i.imgur.com/SVh18mF.png")
               .setColor(0xff0026)
            message.channel.send(embed);
            break;
        case "defeated":
            var embed = new Discord.RichEmbed()
               .setDescription("**All around me are familiar faces...**")
               .setImage("https://i.imgur.com/OV1nnBG.png")
               .setColor(0x494949)
            message.channel.send(embed);
            break;
        case "gtfo":
            var embed = new Discord.RichEmbed()
               .setDescription("**Get the f●●● out**")
               .setImage("https://i.imgur.com/opbqXDI.png")
               .setColor(0x3c598c)
            message.channel.send(embed);
            break;
        case "kazoodrop":
            var embed = new Discord.RichEmbed()
                .setDescription(":angry: **You absolute SCUM!**")
                .setImage("https://i.imgur.com/66CKPTu.png")
                .setColor(0xedb50e)
            message.channel.send(embed);
            break;
        case "smh":
            var embed = new Discord.RichEmbed()
                .setDescription(":face_palm: **Shaking my head indeed...**")
                .setImage("https://i.imgur.com/9x74MMI.jpg")
                .setColor(0xf7b8a5)
            message.channel.send(embed);
            break;
        case "crotch":
            var embed = new Discord.RichEmbed()
                .setDescription("**I'm just looking at down at my crotch.\nTotally normal :point_down:**")
                .setImage("https://i.imgur.com/fYwoVAg.png")
                .setColor(0x425791)
            message.channel.send(embed);
            break;
        case "murderer":
            var embed = new Discord.RichEmbed()
                .setDescription("**Hahahaha - I love killing innocent people and things :dizzy_face:**")
                .setImage("https://i.imgur.com/X1qQjJS.png")
                .setColor(0xf9f9c2)
            message.channel.send(embed);
            break;
        case "psychopath":
            var embed = new Discord.RichEmbed()
                .setDescription("**Hehehehehe.. keep one eye open tonight kids ;)** :knife:")
                .setImage("https://cdn.glitch.com/65a0949d-1f15-45db-bc6f-d9470dc2046a%2Fpsychopath.png?1529911046768")
                .setFooter("From video https://youtu.be/lV7S4unkJNs", config.ytlogo)
                .setColor(0xff2323)
            message.channel.send(embed);
            break;
        case "weird":
            var embed = new Discord.RichEmbed()
                .setDescription("**It's ok, just your average jacksucksatlife being weird** :no_mouth:")
                .setImage("https://cdn.glitch.com/65a0949d-1f15-45db-bc6f-d9470dc2046a%2Fweird.png?1529911067680")
                .setFooter("From video https://youtu.be/lV7S4unkJNs", config.ytlogo)
                .setColor(0x7f68ff)
            message.channel.send(embed);
            break;
        case "alien":
            var embed = new Discord.RichEmbed()
                .setDescription("**I have come to invade the earth and kill all humans** :alien:")
                .setImage("https://cdn.glitch.com/65a0949d-1f15-45db-bc6f-d9470dc2046a%2Falien.png?1529911146209")
                .setFooter("From video https://youtu.be/lV7S4unkJNs", config.ytlogo)
                .setColor(0xffeca8)
            message.channel.send(embed);
            break;
        case "shocked":
            var embed = new Discord.RichEmbed()
                .setDescription("**Nooooooooooooooooo!** :broken_heart: :sob:")
                .setImage("https://cdn.glitch.com/65a0949d-1f15-45db-bc6f-d9470dc2046a%2Fshocked.png?1529911108859")
                .setFooter("From video https://youtu.be/lV7S4unkJNs", config.ytlogo)
            message.channel.send(embed);
            break;
        case "uhh":
            var embed = new Discord.RichEmbed()
                .setDescription("**Jack, you done f●●●ed up this time** :face_palm:")
                .setImage("https://cdn.glitch.com/65a0949d-1f15-45db-bc6f-d9470dc2046a%2Fuhh.png?1529911140480")
                .setColor(0xfffffa)
                .setFooter("From video https://youtu.be/lV7S4unkJNs", config.ytlogo)
            message.channel.send(embed);
            break;
       case "wtf":
            var embed = new Discord.RichEmbed()
               .setDescription("**Who am I dating...** :face_palm:")
               .setImage("https://cdn.glitch.com/65a0949d-1f15-45db-bc6f-d9470dc2046a%2FScreenshot_6.png?1529907248035")
               .setColor(0x2a8bd6)
               .setFooter("From video https://youtu.be/snhzjJmp0E0", config.ytlogo)
            message.channel.send(embed);
            break;
        case "singing":
            var embed = new Discord.RichEmbed()
               .setDescription("**And I was like baby, baby, baby oh** :microphone:")
               .setImage("https://cdn.glitch.com/65a0949d-1f15-45db-bc6f-d9470dc2046a%2FScreenshot_3.png?1529907246011")
               .setColor(0xcccccc)
               .setFooter("From video https://youtu.be/snhzjJmp0E0", config.ytlogo)
            message.channel.send(embed);
            break;
        case "suited":
            var embed = new Discord.RichEmbed()
               .setDescription("**We really both are brother and sister.. I mean.. f●●●** :joy:")
               .setImage("https://cdn.glitch.com/65a0949d-1f15-45db-bc6f-d9470dc2046a%2FScreenshot_5.png?1529907252032")
               .setColor(0xffcc00)
               .setFooter("From video https://youtu.be/snhzjJmp0E0", config.ytlogo)
            message.channel.send(embed);
            break;
        case "please":
            var embed = new Discord.RichEmbed()
               .setDescription("**Becky.. please.. get some help** :hospital:")
               .setImage("https://cdn.glitch.com/65a0949d-1f15-45db-bc6f-d9470dc2046a%2FScreenshot_2.png?1529907248168")
               .setColor(0xff0037)
               .setFooter("From video https://youtu.be/snhzjJmp0E0", config.ytlogo)
            message.channel.send(embed);
            break;
        case "idiot":
            var embed = new Discord.RichEmbed()
               .setDescription("**HeLP! My bRaIN is being cRuSHeD!!! <:brain:462848215662854167>**")
               .setImage("https://i.imgur.com/pFi0rhL.png")
               .setColor(0xff8eac)
               .setFooter("From video https://youtu.be/4kgTRbJY9zk", config.ytlogo)
            message.channel.send(embed);
            break;
        case "angry":
            var embed = new Discord.RichEmbed()
               .setDescription("**B!tch get the f●●● outta here** :rage:")
               .setColor(0xfc3916)
               .setImage("https://i.imgur.com/lPIOloc.png")
               .setFooter("From video https://youtu.be/8SzMcGsyzoM", config.ytlogo)
            message.channel.send(embed);
            break;
        case "angelic":
            var embed = new Discord.RichEmbed()
               .setDescription("**This headset... was created by angels..** :angel:")
               .setColor(0xfcfcfc)
               .setImage("https://i.imgur.com/l2yFRqI.png")
               .setFooter("From video https://youtu.be/8SzMcGsyzoM", config.ytlogo)
            message.channel.send(embed);
            break;
        case "kazooholder":
            var embed = new Discord.RichEmbed()
               .setDescription("**This headset even has a built in kazoo holder** :open_mouth:")
               .setColor(0x44c44f)
               .setImage("https://i.imgur.com/BATqcsf.png")
               .setFooter("From video https://youtu.be/8SzMcGsyzoM", config.ytlogo)
            message.channel.send(embed);
            break;
        case "flamin":
            var embed = new Discord.RichEmbed()
               .setDescription("**It's a little hot in here** :fire:")
               .setColor(0xfcaf0a)
               .setImage("https://i.imgur.com/HTdHFlV.jpg")
               .setFooter("From video https://youtu.be/mvCK7f2xk0Q", config.ytlogo)
            message.channel.send(embed);
            break;
        case "satan":
            var embed = new Discord.RichEmbed()
               .setDescription("**Satan.. is that you..?** :dizzy_face:")
               .setColor(0xe2e2e2)
               .setImage("https://i.imgur.com/2sDTv8A.png")
               .setFooter("From video https://youtu.be/mvCK7f2xk0Q", config.ytlogo)
            message.channel.send(embed);
            break;
        case "thinking":
            var embed = new Discord.RichEmbed()
               .setDescription("**\*Thinking intensifies\*** :thinking:")
               .setColor(0x635c5c)
               .setImage("https://i.imgur.com/ssiOEJo.png")
               .setFooter("From video https://youtu.be/mvCK7f2xk0Q", config.ytlogo)
            message.channel.send(embed);
            break;
        case "swirl":
            var embed = new Discord.RichEmbed()
               .setDescription("**The sWirL meme is DEAD! STOP!**")
               .setImage("https://i.imgur.com/lxN6H2Z.jpg")
               .setColor(0xffd989)
               .setFooter("From video https://youtu.be/-BSiPJujYIY", config.ytlogo)
            message.channel.send(embed);
            break;
        case "overnight":
            var embed = new Discord.RichEmbed()
               .setDescription("**Picture this.. \*overnight challenge in a kazoo\* :frame_photo:**")
               .setImage("https://i.imgur.com/dNR17bV.png")
               .setColor(0x5ae4fc)
               .setFooter("From video https://youtu.be/fqlZW4XDQiI", config.ytlogo)
            message.channel.send(embed);
            break;
        case "kazoo":
            var embed = new Discord.RichEmbed()
               .setDescription("**the kazoo possesses you.. :ghost:**")
               .setImage("https://i.imgur.com/MGkPXft.png")
               .setColor(0xfffa00)
               .setFooter("From video https://youtu.be/y8ONmh_G-cQ", config.ytlogo)
            message.channel.send(embed);
            break;
        case "explosion":
            var embed = new Discord.RichEmbed()
               .setDescription("**\*explosions everywhere\*** :boom:")
               .setImage("https://i.imgur.com/Eb7pWci.jpg")
               .setColor(0xff3f00)
               .setFooter("From video https://youtu.be/y8ONmh_G-cQ", config.ytlogo)
            message.channel.send(embed);
            break;
        case "derp":
            var embed = new Discord.RichEmbed()
               .setDescription("**wait what.. uhh** :drooling_face:")
               .setImage("https://i.imgur.com/14eeAt1.jpg")
               .setColor(0xc66225)
               .setFooter("From video https://youtu.be/b9eqxonESeo", config.ytlogo)
            message.channel.send(embed);
            break;
        case "twitterllama":
            var embed = new Discord.RichEmbed()
               .setDescription("**I will rememberrr youuuu** :notes:")
               .setImage("https://i.redditmedia.com/y0Yd9ZSRem97Q6OjtOVq68ah8LwzLfisT8qZ2Megb_I.png?fit=crop&crop=faces%2Centropy&arh=2&w=960&s=eac65a9e83c9050eec0e3ebf51b3df6b")
               .setColor(0x969696)
               .setFooter("By u/xXMLG_R3dd1t3rXx", config.rlogo)
            message.channel.send(embed);
            break;
        case "monster":
            var embed = new Discord.RichEmbed()
               .setDescription("**On the outside I am usually normal..** :smiling_imp:")
               .setImage("https://i.imgur.com/epEjrM5.png")
               .setColor(0x9654f9)
               .setFooter("From video https://youtu.be/POX_wH8nM5o", config.ytlogo)
            message.channel.send(embed);
            break;
        case "duet":
            var embed = new Discord.RichEmbed()
               .setDescription("**Dun dun bum dan dun run fun** :violin: :microphone:")
               .setImage("https://i.imgur.com/6W5mHnv.jpg")
               .setColor(0xffeec9)
               .setFooter("From video https://youtu.be/POX_wH8nM5o", config.ytlogo)
            message.channel.send(embed);
            break;
        case "broke":
            var embed = new Discord.RichEmbed()
               .setDescription("**I mean it's a bit out of my budget..** :pound:")
               .setImage("https://i.imgur.com/nIXNB7R.png")
               .setColor(0xffdddd)
               .setFooter("From video https://youtu.be/POX_wH8nM5o", config.ytlogo)
            message.channel.send(embed);
            break;
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // __      _______ _____  ______ ____    __  __ ______ __  __ ______    _____ ____  __  __ __  __          _   _ _____   _____  //
 // \ \    / /_   _|  __ \|  ____/ __ \  |  \/  |  ____|  \/  |  ____|  / ____/ __ \|  \/  |  \/  |   /\   | \ | |  __ \ / ____| //
 //  \ \  / /  | | | |  | | |__ | |  | | | \  / | |__  | \  / | |__    | |   | |  | | \  / | \  / |  /  \  |  \| | |  | | (___   //
 //   \ \/ /   | | | |  | |  __|| |  | | | |\/| |  __| | |\/| |  __|   | |   | |  | | |\/| | |\/| | / /\ \ | . ` | |  | |\___ \  //
 //    \  /   _| |_| |__| | |____ |__| | | |  | | |____| |  | | |____  | |____ |__| | |  | | |  | |/ ____ \| |\  | |__| |____) | //
 //     \/   |_____|_____/|______\____/  |_|  |_|______|_|  |_|______|  \_____\____/|_|  |_|_|  |_/_/    \_\_| \_|_____/|_____/  //
 //                                                                                                                              //
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////      
        case "spin":
        if(donators.all.includes(message.author.id)) {
          var embed = new Discord.RichEmbed()
               .setDescription("**You spin me right round baby..** :notes:\nﾠ ﾠ")
               .addField("⏱ File Upload","**This file can take up to 10 seconds for discord to process.**")
               .setColor(0x4492e5)
            message.channel.send(embed)
            message.channel.send({
              files: [
                "./assets/spin.mp4"
              ]
            })
        } else {
            var embed = new Discord.RichEmbed()
                .setDescription("<a:no:446899005054648322> **Insufficient Permission(s)** - You must be a Level 1 Donator to use this command.")
                .setColor(colours.error)
            message.channel.send(embed);
            }
            break;
        case "scumbag":
        if(donators.all.includes(message.author.id)) {
          var embed = new Discord.RichEmbed()
               .setDescription("**You lil' scumbag** :anger:\nﾠ ﾠ")
               .addField("⏱ File Upload","**This file can take up to 15 seconds for discord to process.**")
               .setColor(0xd61919)
            message.channel.send(embed)
            message.channel.send({
              files: [
                "./assets/scumbag.mp4"
              ]
            })
        } else {
            var embed = new Discord.RichEmbed()
                .setDescription("<a:no:446899005054648322> **Insufficient Permission(s)** - You must be a Level 1 Donator to use this command.")
                .setColor(colours.error)
            message.channel.send(embed);
            }
            break;
            ///////////////////////////////////////////////////////////////////////////////
            //     _  _____ _____    ____ ___  __  __ __  __    _    _   _ ____  ____    //
            //    / \|_   _| ____|  / ___/ _ \|  \/  |  \/  |  / \  | \ | |  _ \/ ___|   //
            //   / _ \ | | |  _|   | |  | | | | |\/| | |\/| | / _ \ |  \| | | | \___ \   //
            //  / ___ \| | | |___  | |__| |_| | |  | | |  | |/ ___ \| |\  | |_| |___) |  //
            // /_/   \_\_| |_____|  \____\___/|_|  |_|_|  |_/_/   \_\_| \_|____/|____/   //
            //                         (ACTIVE TESTING ENVIROMENT)                       //
            //                                                                           //        
            //              ONLY THE BOTOWNER IS ALLOWED TO USE THESE COMMANDS           //
            //                         -+-+-+-+-+-+-+-+-+-+-+-+-                         //
            //         THE HELP MENU FOR THE ATE COMMAND HAS BEEN MOVED TO THE TOP       // 
            //                     WITH THE OTHER HELP COMMAND MENUS                     //
            //                                                                           //
            ///////////////////////////////////////////////////////////////////////////////
        case "ate-check":
            if (message.author.id !== config.botowner)
            var embed = new Discord.RichEmbed()
                .setDescription("<a:no:446899005054648322> **Insufficient Permission(s)** - You must be a BotOwner to use this command.")
                .setColor(colours.error)
            message.channel.send(embed)
            if (message.author.id !== config.botowner) return
            var embed = new Discord.RichEmbed()
                .setDescription("<a:yes:446899005125820427> **Success** - message sent to the console.")
                .setColor(colours.success)
            message.channel.send(embed)
            console.log(info("SYSTEM NOTICE: Console Responsiveness Check"))
            console.log(warn("SYSTEM WARNING: Ignore all errors listed below"))
            break;
        case "ate-ping":
            if (message.author.id !== config.botowner)
            var embed = new Discord.RichEmbed()
                .setDescription("<a:no:446899005054648322> **Insufficient Permission(s)** - You must be a BotOwner to use this command.")
                .setColor(colours.error)
            message.channel.send(embed);
            if (message.author.id !== config.botowner) return
            var embed = new Discord.RichEmbed()
                .setDescription((new Date().getTime() - message.createdTimestamp + " ms"))
                .setFooter("This method is highly inaccurate and depreciated.")
            message.channel.send(embed);
            break;
        case "ate-guilds":
            if (message.author.id !== config.botowner)
            var embed = new Discord.RichEmbed()
                .setDescription("<a:no:446899005054648322> **Insufficient Permission(s)** - You must be a BotOwner to use this command.")
                .setColor(colours.error)
            message.channel.send(embed);
            if (message.author.id !== config.botowner) return
            let string = '';
            bot.guilds.forEach(guild=>{
            string+= 'Guild name: ' + guild.name + '\n';
            })
            message.channel.send(string);
            break;
    }
});

bot.on("message", message => {
  const args = message.content.split(" ").slice(1);

  if (message.author.bot) return;

  if (message.content.startsWith(config.prefix + "ate-eval")) {
    if (message.author.id !== config.botowner)
            var embed = new Discord.RichEmbed()
               .setDescription("<a:no:446899005054648322> **Insufficient Permission(s)** - You must be a BotOwner to use this command.")
               .setColor(colours.error)
            message.channel.send(embed);
    if (message.author.id !== config.botowner) return
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});

dblposter.bind();
bot.login(secrets.token);

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// Copyright (C) 2018 Cairo John Mitchell-Acason                                 //
//                                                                               //
// This program is free software: you can redistribute it and/or modify          //
// it under the terms of the GNU Affero General Public License as published by   //
// the Free Software Foundation, either version 3 of the License, or             //
// (at your option) any later version.                                           //
//                                                                               // 
// This program is distributed in the hope that it will be useful,               //
// but WITHOUT ANY WARRANTY; without even the implied warranty of                //
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                 //
// GNU Affero General Public License for more details.                           //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////