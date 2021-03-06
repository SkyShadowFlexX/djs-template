const { MessageEmbed, Message, Discord } = require("discord.js");
const { readdirSync } = require("fs");
const ms = require("ms");
const prefix = "";
let color = "#2F3136";

module.exports = {
   name: "cmdhelp",
   aliases: ["ch"],
   cooldowns: 3000,
   description: "Tells Information About Commands",
   usage: "<cmd name>",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["ADMINISTRATOR"],
   run: async (client, message, args) => {
      if (!args[0]) {
         message.reply("Bitte nenne einen Command Namen...");
      } else {
         let cots = [];
         let catts = [];

         readdirSync("./commands/").forEach((dir) => {
            if (dir.toLowerCase() !== args[0].toLowerCase()) return;

            const commands = readdirSync(`./commands/${dir}`).filter((file) =>
               file.endsWith(".js")
            );

            const cmds = commands.map((command) => {
               let file = require(`../../commands/${dir}/${command}`);

               if (!file.name) return "Kein Command Name.";

               let name = file.name.replace(".js", "");

               let des = client.commands.get(name).description;
               let emo = client.commands.get(name).emoji;

               let obj = {
                  cname: `${emo ? emo : ""} - \`${name}\``,
                  des,
               };

               return obj;
            });

            let dota = new Object();

            cmds.map((co) => {
               dota = {
                  name: `${cmds.length === 0 ? "In Arbeit." : co.cname}`,
                  value: co.des ? co.des : "Keine Beschreibung",
                  inline: true,
               };
               catts.push(dota);
            });

            cots.push(dir.toLowerCase());
         });

         const command =
            client.commands.get(args[0].toLowerCase()) ||
            client.commands.find(
               (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
            );

         if (cots.includes(args[0].toLowerCase())) {
            return;
         }

         if (!command) {
            const embed = new MessageEmbed()
               .setTitle(
                  `Unbekannter Command! Nutze \`${prefix}help\` f??r all meine Commands!`
               )
               .setColor("RED");
            return message.channel.send({ embeds: [embed] });
         }

         const embed = new MessageEmbed()
            .setTitle("Command Details:")
            .addField(
               "Command:",
               command.name ? `${command.name}` : "Kein Name f??r diesen Command."
            )
            .addField(
               "Alias:",
               command.aliases
                  ? `${command.aliases.join(" ,")}`
                  : "Keine Alias f??r diesen Command."
            )
            .addField(
               "Cooldowns:",
               command.cooldowns ? `${ms(command.cooldowns)}` : `Keinen.`
            )
            .addField(
               "Beschreibung:",
               command.description
                  ? command.description
                  : "Keine Beschreibung f??r diesen Command."
            )
            .addField(
               "Nutzung:",
               command.usage
                  ? `${prefix}${command.name} ${command.usage}`
                  : `${prefix}${command.name}`
            )
            .addField(
               "Command Status:",
               command.toggleOff ? `Deaktiviert` : `Aktiviert`
            )
            .addField("DevelopersOnly:", command.developersOnly ? `Ja` : `Nein`)
            .addField(
               "Bot-Berechtigung ben??tigt:",
               command.botpermissions
                  ? `${command.botpermissions.join(", ")}`
                  : `Kein/e`
            )
            .addField(
               "User-Rechte ben??tigt:",
               command.memberpermissions
                  ? `${command.memberpermissions.join(", ")}`
                  : `Kein/e`
            )

            .setFooter(
               `Anfrage von ${message.author.tag}`,
               message.author.displayAvatarURL({
                  dynamic: true,
               })
            )
            .setTimestamp()
            .setColor("BLURPLE");
         return message.channel.send({ embeds: [embed] });
      }
   },
};

/*
 * ?????????????????????????????????????????????[Supporting]?????????????????????????????????????????????
 * Ben??tigst du mal Hilfe
 * Melde dich bei uns im Support
 * Wir helfen dir gerne bei jedem Problem
 * auch solltest du Code fehler haben
 *
 * LG Sky
 */
