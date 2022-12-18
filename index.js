require("dotenv").config();
const fetch = require("node-fetch");
const spawn = require("child_process").spawn;

if (!process.env.APP_NAME) return console.log(`APP_NAME is bot specified!`);

let child = spawn("java", ["-jar", "Lavalink.jar"], { "stdio": "inherit" });

child.on("close", (code) => {
    console.log(`Lavalink exited with code ${code}. Trying to respawn...`);
    child = spawn("java", ["-jar", "Lavalink.jar"], { "stdio": "inherit" });
});

setInterval(() => fetch(`https://${process.env.APP_NAME}.onrender.com/`).catch((e) => { }), 300000);

child.on("error", (error) => console.log(`Error with lavalink: ${error}`));
process.on("unhandledRejection", (reason, p) => console.log(reason, p));
process.on("uncaughtException", (e, origin) => console.log(e, origin));
process.on("uncaughtExceptionMonitor", (e, origin) => console.log(e, origin));