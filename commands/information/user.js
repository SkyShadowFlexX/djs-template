const { MessageEmbed } = require("discord.js");
const c = require("../../botconfig/main.json");

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
    ui.createdat = userm.createdAt;
    ui.discrim = userm.discriminator;
    ui.id = userm.id;
    ui.mfa = userm.mfaEnabled;
    ui.pre = userm.premium;
    ui.presen = userm.presence;
    ui.tag = userm.tag;
    ui.uname = userm.username;
    ui.verified = userm.verified;

    ui.avatar = userm.avatarURL;

const inf = new MessageEmbed()
        .setTitle("``Nutzer Informationen``")
        .setAuthor(ui.uname, ui.avatar)
		.addFields(
			{ name: '``🎉`` Erstellt am', value: `${userm.createdAt}`, inline: true },
			{ name: '``💵``  Premium Account', value: `${ui.premium}`, inline: true },
 	        { name: '\u200B', value: '\u200B' },
			{ name: '``💳`` ID', value: `${ui.id}`, inline: true },
			{ name: '``💾`` Name', value: `${ui.uname}`, inline: true },
			{ name: '``✔️`` 2FA', value: `${ui.mfa}`, inline: true },
			{ name: '``🔑`` Verifiziert?', value: `${ui.verified}`, inline: true },
	)
        .setColor(c.color)
        .setFooter(c.hoster, c.hi)
        .setThumbnail(ui.avatar);
       
message.channel.send({ embeds: [inf] });
    },
};
