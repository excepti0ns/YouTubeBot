const {Client,MessageEmbed} = require("discord.js");
const bot = new Client();
const config = require("./config.json");
const last = [];
require("./youtube.js")(bot);

bot.login(config.Token);
bot.on("ready",() => console.log("Bot is ready"));

bot.on("live",videoID => {
  if(last.includes(videoID)) return;
  bot.channels.cache.get(config.channelID).send(`@everyone https://www.youtube.com/watch?v=${videoID}`);
  last.push(videoID);
});
