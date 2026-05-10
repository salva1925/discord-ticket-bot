const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Muestra la información de ayuda del bot'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📚 Ayuda del Bot de Tickets')
      .setDescription('Aquí puedes ver todos los comandos disponibles')
      .setColor(0x7289da)
      .addFields(
        {
          name: '🎫 Comandos de Tickets',
          value: '`/setup` - Configura el panel de tickets\n`/status` - Ver estado de tus tickets\n`/close` - Cierra un ticket',
          inline: false,
        },
        {
          name: '👨‍💼 Comandos de Staff',
          value: '`/claim` - Reclamar un ticket\n`/unclaim` - Dejar de reclamar un ticket\n`/add` - Añadir usuario al ticket\n`/remove` - Remover usuario del ticket',
          inline: false,
        },
        {
          name: '📊 Información',
          value: '`/help` - Muestra este mensaje\n`/stats` - Ver estadísticas de tickets',
          inline: false,
        },
        {
          name: '💡 ¿Cómo crear un ticket?',
          value: 'Usa `/setup` para ver el panel de tickets y selecciona una categoría. ¡Un miembro del staff se encargará de ayudarte!',
          inline: false,
        }
      )
      .setTimestamp()
      .setFooter({ text: 'Discord Ticket Bot' });

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
