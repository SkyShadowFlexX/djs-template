const client = require("../index");
const chalk = require("chalk");
const { version: discordjsVersion } = require("discord.js");
const { prefix } = require("../botconfig/main.json");
const main_json = require("../botconfig/main.json");

client.on("ready", async () => {
  const supportServer = client.guilds.cache.get(`${main_json.TestingServerID}`);
  if (!supportServer) return console.log("");
  // ———————————————[Status]———————————————
  client.user.setActivity(
    `${prefix}help || ${client.guilds.cache.size} ${
      client.guilds.cache.size > 1 ? "Servers" : "Server"
    }`,
    { type: "WATCHING" }
  );
  // ———————————————[Ready MSG]———————————————
  console.log(chalk.green.bold("Erfolgreich!"));
  console.log(chalk.gray("Verbunden mit "), chalk.yellow(`${client.user.tag}`));
  console.log(
    chalk.white("Schaut "),
    chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
    chalk.white(
      `${
        client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
          ? "Nutzern,"
          : "Nutzer,"
      }`
    ),
    chalk.red(`${client.guilds.cache.size}`),
    chalk.white(`${client.guilds.cache.size > 1 ? "Server." : "Server."}`)
  );
  console.log(
    chalk.white(`Prefix:` + chalk.red(` ${prefix}`)),
    chalk.white("||"),
    chalk.red(`${client.commands.size}`),
    chalk.white(`Commands`)
  );
  console.log(
    chalk.white(`Support-Server: `) +
      chalk.red(`${supportServer.name || "Kein"}`)
  );
  console.log("");
  console.log(chalk.red.bold("——————————[Statistics]——————————"));
  console.log(
    chalk.gray(
      `Discord.js Version: ${discordjsVersion}\nLäuft auf Node ${process.version} auf ${process.platform} ${process.arch}`
    )
  );
  console.log(
    chalk.gray(
      `RAM: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
        2
      )} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
        2
      )} MB`
    )
  );
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
