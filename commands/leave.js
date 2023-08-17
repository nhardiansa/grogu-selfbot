const { default: DiscordStreamClient } = require("discord-stream-client");


module.exports = {
  name: 'pulang sana!',
  run: async (client, message, args) => {


    const StreamClient = new DiscordStreamClient(client);
    
    StreamClient.leaveVoiceChannel();
    message.reply('Oke gua pulang dulu ye, jangan kangen ya!');
    
  }
}
