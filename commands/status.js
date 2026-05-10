const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getUserTickets } = require('../utils/tickets');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Ver el estado de tus tickets abiertos'),

  async execute(interaction) {
    const userTickets = getUserTickets(interaction.user.id);

    if (userTickets.length === 0) {
      return interaction.reply({
        content: '❌ No tienes ningún ticket abierto.',
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle('📊 Tus Tickets')
      .setColor(0x7289da)
      .setDescription(`Tienes **${userTickets.length}** ticket(s) abierto(s)`)
      .addFields(
        userTickets.map(ticket => ({
          name: `🎫 Ticket #${ticket.id}`,
          value: `**Categoría:** \`${ticket.category}\`\n**Reclamado por:** ${ticket.claimedBy ? `<@${ticket.claimedBy}>` : 'No reclamado'}\n**Creado:** <t:${Math.floor(ticket.createdAt / 1000)}:R>`,
          inline: true,
        }))
      )
      .setTimestamp();

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
