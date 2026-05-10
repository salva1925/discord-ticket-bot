const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChannelType } = require('discord.js');
const { loadConfig } = require('../utils/config');
const { createEmbed } = require('../utils/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Configura el panel de tickets del bot')
    .setDefaultMemberPermissions(0), // Solo administrador

  async execute(interaction) {
    const config = loadConfig();
    if (!config) {
      return interaction.reply({
        content: '❌ No se encontró config.json. Por favor, copia config.json.example a config.json y configúralo.',
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle('🎫 Panel de Tickets')
      .setDescription('Selecciona la categoría de tu ticket a continuación. Un miembro del staff se encargará de ayudarte pronto.')
      .setColor(0x7289da)
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .addFields(
        ...config.ticketCategories.map(category => ({
          name: `${category.emoji} ${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`,
          value: `Crea un ticket de ${category.name}`,
          inline: true,
        }))
      )
      .setTimestamp();

    const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('ticket_category_select')
          .setPlaceholder('📂 Selecciona una categoría')
          .addOptions(
            config.ticketCategories.map(category => ({
              label: category.name.charAt(0).toUpperCase() + category.name.slice(1),
              value: category.name,
              emoji: category.emoji,
              description: `Crea un ticket de ${category.name}`,
            }))
          )
      );

    await interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: false,
    });
  },
};
