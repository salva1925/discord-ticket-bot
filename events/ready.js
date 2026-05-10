const { ActivityType } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`\n✅ Bot conectado como ${client.user.tag}`);
    console.log(`🚀 Bot está listo en ${new Date().toLocaleString('es-ES')}\n`);

    client.user.setActivity('tickets | /help', {
      type: ActivityType.Watching,
    });
  },
};
