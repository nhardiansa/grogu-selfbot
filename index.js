const fs = require('fs');
const { Client } = require('discord.js-selfbot-v13');
const { DiscordStreamClient } = require('discord-stream-client');

require('dotenv').config();
const TOKEN = process.env.TOKEN


const client = new Client({
  checkUpdate: false
});

client.login(TOKEN);

const commands = new Map();

client.on('ready', async () => {
  console.log(`${client.user.tag} is ready!`);

  fs.readdirSync('./commands')
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
      try {
        const command = require(`./commands/${file}`);
        commands.set(command.name, command);
      } catch (error) {
        console.log('Error loading command', error);
      }
    });
})

client.on('messageCreate', async (message) => {
  if(message.author.bot) return;
  if(!message.content.startsWith('!grogu')) return;

  const args = message.content.split(' ').splice(1).join(' ');
  const command = (args.toLowerCase());

  if(!commands.has(command)) {
    message.reply('Gak jelas lu kocak');
    return;
  };

  try {
    commands.get(command).run(client, message, args);
  } catch (error) {
    console.log('Error running command', error);
    message.reply('Lu cobain command apaan sih? Bikin error aja lu');
  }
});
