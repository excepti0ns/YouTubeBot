
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const HttpProxy = require("http-proxy-agent");
const config = require ("./config.json");
let IP = [];
let UserAgent = [];

module.exports = (bot) => {

function random() {
const ip = IP[Math.floor(Math.random() * IP.length)];
const useragent = UserAgent[Math.floor(Math.random() * IP.length)];
return {ip,useragent};
};

async function live(id) {
try {
  
const { ip , useragent } = random();
let options = {headers:{"User-Agent":useragent,"referer":"https://www.google.com"}};
if(ip) options.agent = new HttpProxy(ip);
const res = await fetch(`https://www.youtube.com/channel/${id}`,options);
const text = await res.text();
const dom = cheerio.load(text);

const test = dom(".yt-lockup-content").find(".yt-badge-live").text().toLowerCase();
if(! test.includes("live"))return;
const videoID = dom(".yt-lockup-content").find(".spf-link").attr("href").split("=")[1];
if(!videoID) return; 
bot.emit("live",videoID);
} catch(r) {
console.log(r);

};
};

setInterval(() => {

for (const id of config.channels) {
   live(id);
};
  
},config.interval);
};
