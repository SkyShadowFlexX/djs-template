const { MessageEmbed } = require("discord.js");
const c = require("../../botconfig/main.json");

module.exports = {
   name: "rate",
   aliases: ["rateme"],
   cooldowns: 2500,
   description: "Lass dich Layla Bewerten.",
   usage: "<User>",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],

   run: async (client, message, args) => {
//------Variable
	const pbrate = Math.floor(Math.random() * 10)
	const rate = Math.floor(Math.random() * 90) 
       
//------Slap    
const rates = new MessageEmbed()
        .setTitle("<a:rainbowheart:975111333781577819> ``Bewertung`` <a:rainbowheart:975111333781577819>")
        .setDescription("Ich finde dein Profilbild interessant, lass es mich mal anschauen" + `\n\n\`\`Profilbild:\`\` ${pbrate}\n\`\`Bewertung\`\` ${rate}\n\`\`Insgesammte Punkte:\`\`` + Math.floor(pbrate + rate))
        .setColor(c.color)
        .setFooter(c.hoster, c.hi)

//-------Chance
message.channel.send({ embeds: [rates] });
       
//------Ende
    },
};
