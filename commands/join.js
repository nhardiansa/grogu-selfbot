const { DiscordStreamClient } = require('discord-stream-client');

module.exports = {
  name: 'join sini!',
  run: async (client, message, args) => {
    const channel = message.member?.voice?.channel ?? message.channel;
    const allowedChannels = ['GUILD_VOICE'];

    if (!allowedChannels.includes(channel.type)) {
      return message.reply('Cari channel yang bener dulu, baru panggil gua, kocak!');
    }
    // get client current voice channel
    const clientVoiceChannel = client.channels.cache.get(client.user.voice.channelId);

    // check if client is already in a voice channel
    if (clientVoiceChannel) {
      if (clientVoiceChannel.id !== message.channel.id) {
        return message.reply('Gua lagi di channel lain, lu gak liat ya?');
      }

      return message.reply('Lu gak liat gua lagi di channel lu?');
    }

    // join channel
    const StreamClient = new DiscordStreamClient(client);

    try {
      await StreamClient.joinVoiceChannel(client.channels.cache.get(channel.id), {
        selfDeaf: true,
        selfMute: false,
        selfVideo: false,
      });
      message.reply('Gua udah join channel lu ye');
    } catch (error) {
      console.log('Error joining voice channel', error);
      message.reply('Mampus error gua, lu apain gua kocak?');
    }

  }
};
