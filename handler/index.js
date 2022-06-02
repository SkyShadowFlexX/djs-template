const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const globPromise = promisify(glob);
const mainjson = require("../botconfig/main.json");
const chalk = require("chalk");

module.exports = async (client) => {
  // ———————————————[Commands]———————————————
  const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
    }
  });

  // ———————————————[Events]———————————————
  const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
  eventFiles.map((value) => require(value));

  // ———————————————[Slash Commands]———————————————
  const slashCommands = await globPromise(
    `${process.cwd()}/SlashCommands/*/*.js`
  );

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);

    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
  });
  client.on("ready", async () => {
    // Register for a single guild
    if (mainjson.TestingServerID === "Your Server ID") {
      console.log(chalk.gray("—————————————————————————————————"));
      console.log(
        chalk.white("["),
        chalk.blue.bold("SkyZ Hosting"),
        chalk.white("]"),
        chalk.gray(" : "),
        chalk.white.bold("Finde ServerID nciht um die Slashes hinzuzufügen")
      );
      console.log(chalk.gray("—————————————————————————————————"));
      console.log(chalk.magenta("Bitte fixe es mit folgenden Möglichkeiten."));
      console.log(
        chalk.yellow.bold("1.) ") +
          chalk.cyan("Gehe in ") +
          chalk.red.underline("botconfig/main.json") +
          chalk.cyan(" und setze \nSupportServer/TestServer ID in den") +
          chalk.red(" TestingServerID String!")
      );
      console.log(
        chalk.yellow.bold("2.) ") +
          chalk.cyan("Nutze Globale Slash Commands in dem du "no" in Zeile 74 zu\n") +
          chalk.blue.bold.underline(
            " await client.application.commands.set(arrayOfSlashCommands);\n"
          ) +
          chalk.cyan(" in the else statement.")
      );
      console.log(
        chalk.green.bold("Still Need Help? Contact Me:\n") +
          chalk.yellow.italic("Discord: DrakeZee#5223\n") +
          chalk.yellow.italic("Discord Server: dsc.gg/botsway")
      );
    } else {
      await client.guilds.cache
        .get(mainjson.TestingServerID)
        .commands.set(arrayOfSlashCommands);

      // Register for all the guilds the bot is in
      // await client.application.commands.set(arrayOfSlashCommands);
    }
  });
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
