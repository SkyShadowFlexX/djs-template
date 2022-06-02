const client = require("../index");
const { MessageEmbed } = require("discord.js");
const chalk = require("chalk");
const ms = require("ms");
const { developerID } = require("../botconfig/main.json");
const { clientavatar } = require("../botconfig/main.json");
const { clientname } = require("../botconfig/main.json");
const prefix = client.config.prefix;
const { randomMessages_Cooldown } = require("../botconfig/main.json");
client.on("messageCreate", async (message) => {
   if (
      message.author.bot ||
      !message.guild ||
      !message.content.toLowerCase().startsWith(client.config.prefix)
   )
      return;
   if (!message.member)
      message.member = await message.guild.fetchMember(message);
   const [cmd, ...args] = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(" ");
   let noargs_embed = new MessageEmbed()
      .setTitle(`:x: | Bitte wähle einen Command!`)
      .setColor("RED")
      .setFooter(`${clientname}`, `${clientavatar}`)
      .setTimestamp();
   if (cmd.length === 0) return message.reply({ embeds: [noargs_embed] });

   const command =
      client.commands.get(cmd.toLowerCase()) ||
      client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
   let nocmd_embed = new MessageEmbed()
      .setTitle(`:x: | Command wurde nciht gefunden  \`${prefix}help\``)
      .setColor("RED")
      .setFooter(`${clientname}`, `${clientavatar}`)
      .setTimestamp();
   if (!command) return message.channel.send({ embeds: [nocmd_embed] });
   if (command.toggleOff) {
      let toggleoff_embed = new MessageEmbed()
         .setTitle(
            `:x: | Dieser Command wurde von den Developern deaktiviert! Versuche es später erneut.`
         )
         .setColor("RED")
         .setFooter(`${clientname}`, `${clientavatar}`)
         .setTimestamp();
      return message.reply({ embeds: [toggleoff_embed] });
   } else if (!message.member.permissions.has(command.userpermissions || [])) {
      let userperms_embed = new MessageEmbed()
         .setTitle(`:x: | Du hast nicht die Rechte dazu!`)
         .setColor("RED")
         .setFooter(`${clientname}`, `${clientavatar}`)
         .setTimestamp();
      return message.reply({ embeds: [userperms_embed] });
   } else if (!message.guild.me.permissions.has(command.botpermissions || [])) {
      let botperms_embed = new MessageEmbed()
         .setTitle(`:x: | Ich habe keine Berechtigungen dazu!`)
         .setColor("RED")
         .setFooter(`${clientname}`, `${clientavatar}`)
         .setTimestamp();
      return message.reply({ embeds: [botperms_embed] });
   } else if (command.developersOnly) {
      if (!developerID.includes(message.author.id)) {
         let developersOnly_embed = new MessageEmbed()
            .setTitle(`:x: | Nur Developer können das machen!`)
            .setDescription(
               `Developers: ${developerID.map((v) => `<@${v}>`).join(",")}`
            )
            .setColor("RED")
            .setFooter(`${clientname}`, `${clientavatar}`)
            .setTimestamp();
         return message.reply({ embeds: [developersOnly_embed] });
      }
   } else if (command.cooldowns) {
      if (client.cooldowns.has(`${command.name}${message.author.id}`)) {
         let cooldown_embed = new MessageEmbed()
            .setTitle(
               `${
                  randomMessages_Cooldown[
                     Math.floor(Math.random() * randomMessages_Cooldown.length)
                  ]
               }`
            )
            .setDescription(
               `Du musst noch \`${ms(
                  client.cooldowns.get(`${command.name}${message.author.id}`) -
                     Date.now(),
                  { long: true }
               )}\` warten um \`${prefix}${command.name}\` nochmal zu nutzen!`
            )
            .setColor("BLUE")
            .setFooter(`${clientname}`, `${clientavatar}`)
            .setTimestamp();

         return message.reply({ embeds: [cooldown_embed] });
      }

      client.cooldowns.set(
         `${command.name}${message.author.id}`,
         Date.now() + command.cooldowns
      );

      setTimeout(() => {
         client.cooldowns.delete(`${command.name}${message.author.id}`);
      }, command.cooldowns);
   }
   await command.run(client, message, args);
});
/*
 * ———————————————[Supporting]———————————————
 * Benötigst du mal Hilfe
 * Melde dich bei uns im Support
 * Wir helfen dir gerne bei jedem Problem
 * auch solltest du Code fehler haben
 *
 * LG Sky
 */
