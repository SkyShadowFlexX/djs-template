const { Client, CommandInteraction } = require("discord.js");

module.exports = {
   name: "ping",
   description: "returns websocket ping",
   type: "CHAT_INPUT",
   run: async (client, interaction, args) => {
      interaction.followUp({ content: `${client.ws.ping}ms!` });
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
