const { MessageEmbed } = require("discord.js");
const c = require("../../botconfig/main.json");
const moment = require('moment');

module.exports = {
   name: "user",
   aliases: ["info", "useri", "userinfo"],
   cooldowns: 2500,
   description: "Bekomme Informationen zu einem User.",
   usage: "<User>",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],

   run: async (client, message, args) => {
    const userm = message.mentions.users.first() || message.author;
    const memberMention = message.mentions.members.first() || message.member;
           
  let ui = {};
    ui.bot = userm.bot;
    ui.dat = userm.createdAt;
    ui.discrim = userm.discriminator;
    ui.id = userm.id;
    ui.mfa = userm.mfaEnabled;
    ui.pre = userm.premium;
    ui.presen = userm.presence;
    ui.tag = userm.tag;
    ui.uname = userm.username;
    ui.verified = userm.verified;
    ui.col = userm.accentColor;
       
    ui.avatar = userm.avatarURL;

const inf = new MessageEmbed()
        .setTitle("``Nutzer Informationen``")
        .setAuthor(ui.uname, ui.avatar)
	.setDescription(`
	\`\`💳\`\` Name ${ui.uname}\n
	\`\`📣\`\` TAG ${ui.tag}\n
	\`\`🎫\`\` iD ${ui.id}\n
	\`\`🎂\`\` Erstellt ${moment(ui.dat).format('DD/MM/YYYY')}\n
	\`\`🎉\`\` Beigetreten ${moment(ui.joinedAt).format('DD/MM/YYYY')}\n
	\`\`⚙️\`\` Bot? ${ui.bot}\n`)
//Füge ruhig mehr hinzu. Es ist dein Bot also mach was du möchtest ;) Nur keine Raid Bots oder so...
        .setColor(c.color)
        .setFooter(c.hoster, c.hi)
        .setThumbnail(ui.avatar);
       
message.channel.send({ embeds: [inf] });
    },
};

/*
 * ———————————————[Supporting]———————————————
 * Benötigst du mal Hilfe
 * Melde dich bei uns im Support
 * Wir helfen dir gerne bei jedem Problem
 * auch solltest du Code fehler haben
 *
 * LG Sky
 */
