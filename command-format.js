const Discord = require("discord.js");
//Importiere Packages

module.exports = {
   name: "name-cmd",
   //Name von dem Command
   aliases: ["alias1", "alias2", "alias3"],
   //Alias für den Command
   cooldowns: 1000, //1000 = 1 Sekunde
   //Cooldown für den Command (Millisekunden)
   description: "This Command Tells About You",
   //Beschreibung für den Command
   usage: "<user> <reason>",
   //Nutzung für den Command. [wie z.b ?name-cmd <user> <reason>]
   toggleOff: false,
   //Deaktiviere/Aktiviere den Command im Notfall. [true = inaktiv | false = aktiv]
   developersOnly: false,
   //Soll der Command nur für Developer sein. [true = ja | false = nein]
   /*
    Um dich selber zum Dev zu machen gehe zu
    botconfig/main.json, und setze die ID ein.
*/
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   //Berechtigung die der Nutzer benötigt damit der Bot reagiert!
   botpermissions: ["ADMINISTRATOR"],
   //Berechtigungen die der Dev benötigt um Dev CMD's zu nutzen

   run: async (client, message, args) => {
      const member = message.mentions.members.first();
      if (!member) return message.reply("Nenne mir bitte einen Nutzer...");

      message.reply(`Über ${member}: \`Er/Sie nutzt SkyZ Hosting!\``);
   },
};
