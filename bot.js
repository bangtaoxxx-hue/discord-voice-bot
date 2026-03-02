const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const TOKEN = process.env.TOKEN; // ใส่ Token ผ่าน Railway
const CHANNEL_ID = process.env.CHANNEL_ID; // ใส่ Voice Channel ID ผ่าน Railway

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const channel = await client.channels.fetch(CHANNEL_ID);

  if (!channel) return console.log("หา Voice ไม่เจอ");
  if (!channel.isVoiceBased()) return console.log("ไม่ใช่ Voice Channel");

  joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfDeaf: false,
  });

  console.log("เข้า Voice แล้ว ✅");
});

client.login(TOKEN);
