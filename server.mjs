import fs from "fs";
import path from "path";
import express from "express";
import { Client, Collection, GatewayIntentBits, ActivityType, EmbedBuilder } from "discord.js";
import CommandsRegister from "./regist-commands.mjs";
import Notification from "./models/notification.mjs";
import { fileURLToPath, pathToFileURL } from "url";
import Sequelize from "sequelize";
import Parser from 'rss-parser';

const parser = new Parser();
const youtubei = new Youtubei();

const app = express();
app.use(pagesRouter);
app.listen(3000, () => console.log('Express server started on port 3000'));

let postCount = 0;
app.post('/Discord-bot-POST-URL', (req, res) => {
  console.log(`Received POST request.`);
  postCount++;
  console.log(`Current postCount: ${postCount}`);
  if (postCount === 1) {
    console.log('Triggering function.');
    trigger();
    postCount = 0;
  }
  res.send('POST response by Render');
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
  ],
});

console.log('Setting up integrations and time updates');
setupLineIntegration(app, client);
startTimeUpdate(client);

client.commands = new Collection();

const categoryFoldersPath = path.join(process.cwd(), "commands");
console.log(`Loading commands from ${categoryFoldersPath}`);
const commandFolders = fs.readdirSync(categoryFoldersPath);
for (const folder of commandFolders) {
  const commandsPath = path.join(categoryFoldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".mjs"));
  for (const file of commandFiles) {
    console.log(`Importing command module: ${file}`);
    import(pathToFileURL(path.join(commandsPath, file)).href).then(module => {
      client.commands.set(module.data.name, module);
      console.log(`Registered command: ${module.data.name}`);
    });
  }
}

const handlers = new Map();
const handlersPath = path.join(process.cwd(), "handlers");
console.log(`Loading handlers from ${handlersPath}`);
const handlerFiles = fs.readdirSync(handlersPath).filter(f => f.endsWith(".mjs"));
for (const file of handlerFiles) {
  console.log(`Importing handler module: ${file}`);
  import(pathToFileURL(path.join(handlersPath, file)).href).then(module => {
    handlers.set(file.slice(0, -4), module);
    console.log(`Registered handler: ${file.slice(0, -4)}`);
  });
}

client.on("interactionCreate", async interaction => {
  console.log('Interaction received');
  await handlers.get("interactionCreate").default(interaction);
});


client.on("messageCreate", async message => {
  // console.log(`Message received from ${message.author.tag}: ${message.content}`);
  if (message.author.id === client.user.id || message.author.bot) return;
  await messagedelete(message);
  await handlers.get("messageCreate").default(message);
});

client.on('ready', async () => {
  console.log(`${client.user.tag} がログインしました！`);
  await sendStartupMessage(client);

  const statuses = [
    () => `Ping:${client.ws.ping}ms`,
    () => `${client.guilds.cache.size}個のサーバー`,
    () => '音割れakg',
    () => '/help',
    () => '何か',
    () => 'BOT機能追加中',
    () => '24時間 常時稼働 にしたい'
  ];

  const activityTypes = [
    ActivityType.Playing,
    ActivityType.Playing,
    ActivityType.Listening,
    ActivityType.Watching,
    ActivityType.Competing,
    ActivityType.Watching,
    ActivityType.Watching
  ];

  let statusIndex = 0;
  setInterval(() => {
    // console.log(`Updating status to: ${statuses[statusIndex % statuses.length]()}`);
    client.user.setActivity(statuses[statusIndex % statuses.length](), { type: activityTypes[statusIndex % activityTypes.length] });
    statusIndex++;
  }, 10000);
});

Notification.sync({ alter: true }).then(() => console.log('Notification model synced'));
YoutubeFeeds.sync({ alter: true }).then(() => console.log('YoutubeFeeds model synced'));
YoutubeNotifications.sync({ alter: true }).then(() => console.log('YoutubeNotifications model synced'));
CommandsRegister();
client.login(process.env.TOKEN).then(() => console.log('Client login initiated'));

}
