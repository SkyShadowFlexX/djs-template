const { MessageEmbed } = require("discord.js");
const c = require("../../botconfig/main.json");
const images = [
    "https://c.tenor.com/pw_aw6rqs7AAAAAM/despicable-me-minions.gif", "https://c.tenor.com/jDCwQvQ3vpcAAAAM/grrr-taco-guru.gif",
    "https://c.tenor.com/gW_vSmtIHkoAAAAM/anime-cute.gif", "https://c.tenor.com/UorOHviQUgMAAAAM/moe-rawr.gif",
    "https://c.tenor.com/L19Eoc1f4VgAAAAM/elaiza-elaiza-cute.gif", "https://c.tenor.com/pamH5OzfKH4AAAAM/godzilla-rainbow.gif",
    "https://c.tenor.com/fky3BjEKk0oAAAAj/kawaii-cute.gif", "https://c.tenor.com/LuivQSvzDBsAAAAj/flashyklau-vtuber.gif",
    "https://c.tenor.com/i2jCo-VVTbMAAAAj/rawr-stan-marsh.gif", "https://c.tenor.com/txZ4G2t8isoAAAAM/rawr-lol.gif"
];

module.exports = {
   name: "rawr",
   aliases: ["roar", "rar", "rouwr"],
   cooldowns: 2500,
   description: "Rawr jemanden an.",
   usage: "<User>",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],

   run: async (client, message, args) => {
    const userm = message.mentions.users.first();
    const memberMention = message.mentions.members.first();
if(!userm) return message.reply(c.markerr);     
  let ui = {};
    ui.uname = userm.username;
       
const image = images[Math.floor(Math.random() * images.length)];
       
const rawr = new MessageEmbed()
        .setTitle("``Nutzer Informationen``")
        .setDescription("``" + message.author.username +"`` rawrt ``" + ui.uname +"`` laut und mächtig an!")
        .setColor(c.color)
        .setFooter(c.hoster, c.hi)
        .setThumbnail(image);
       
message.channel.send({ embeds: [rawr] });
    },
};
