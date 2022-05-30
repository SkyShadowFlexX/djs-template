const { Client, Collection } = require("discord.js");
// Importiere Discord.Js.
const client = new Client({ intents: 32767 });
// Erstelle einen neuen Discord Client
module.exports = client;
// Exportiere Client in andere Datein
const chalk = require("chalk");
// Importiert Chalk (Farben in der Konsole)

// ———————————————[Globale Variables]———————————————
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.config = require("./botconfig/main.json");
require("./handler")(client);
// Initialisiert variablen

// ———————————————[Einloggen in den Client]———————————————
const token = process.env["clienttoken"] || client.config.clienttoken;
if(token === ""){
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.blue.bold("SkyZ Hosting"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Fehlerhafter Token")
   );
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(chalk.magenta("Es existieren 2 möglichkeiten das zu Fixen"));
   console.log(
      chalk.blue("Setzte dein ") + chalk.red("Bot Token ") + chalk.blue("in:")
   );
   console.log(
      chalk.yellow.bold("1.) ") +
         chalk.cyan("index.js") +
         chalk.gray(
            " Im client.login ändere client.login(token) zu client.login('Dein Token')"
         )
   );
   console.log(
      chalk.yellow.bold("2.) ") +
         chalk.cyan("main.json ") +
         chalk.gray(
            'Gehe in botconfig/main.json, Finde "client.token":"Bot Token" und setzte deinen Token hinein'
         )
   );
   console.log(
      chalk.green.bold("Du benötigst noch hilfe? Kontaktiere uns:\n") +
         chalk.yellow.italic("Discord: SkyZ Host TICKET\n") +
         chalk.yellow.italic("Erstelle bei uns ein Ticket!")
   );
} else {
   client.login(token);
}
// Login The Bot.
// ———————————————[Error Handling]———————————————
process.on("unhandledRejection", (reason, p) => {
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.blue.bold("SkyZ Hosting"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Unhandled Rejection/Catch")
   );
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.blue.bold("SkyZ Hosting"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Uncaught Exception/Catch")
   );
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(
      chalk.white("["),
      chalk.blue.bold("SkyZ Hosting"),
      chalk.white("]"),
      chalk.gray(" : "),
      chalk.white.bold("Mehrere möglichkeiten")
   );
   console.log(chalk.gray("—————————————————————————————————"));
   console.log(type, promise, reason);
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
