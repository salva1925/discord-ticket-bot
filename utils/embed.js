const { EmbedBuilder } = require('discord.js');

function createEmbed(title, description, color = 0x2F3136, fields = []) {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .setTimestamp();

  if (fields.length > 0) {
    embed.addFields(fields);
  }

  return embed;
}

function createTicketEmbed(ticket, config) {
  const category = config.ticketCategories.find(c => c.name === ticket.category);
  const color = category?.color || 0x2F3136;

  return new EmbedBuilder()
    .setTitle(`${category?.emoji || '🎫'} Ticket #${ticket.id}`)
    .setDescription(`Bienvenido a tu ticket de ${ticket.category}. El staff se encargará de ayudarte pronto.`)
    .setColor(color)
    .addFields(
      { name: '📌 Estado', value: '`Abierto`', inline: true },
      { name: '👤 Usuario', value: `<@${ticket.userId}>`, inline: true },
      { name: '🏷️ Categoría', value: `\`${ticket.category}\``, inline: true }
    )
    .setTimestamp();
}

function createLogEmbed(action, ticket, user, config) {
  const category = config.ticketCategories.find(c => c.name === ticket.category);
  const color = category?.color || 0x2F3136;

  const actionEmojis = {
    'created': '✨',
    'claimed': '🙋',
    'closed': '🔒',
    'deleted': '🗑️',
    'reopened': '🔓',
  };

  return new EmbedBuilder()
    .setTitle(`${actionEmojis[action] || '📝'} Ticket ${action.toUpperCase()}`)
    .setColor(color)
    .addFields(
      { name: '🎫 Ticket ID', value: `#${ticket.id}`, inline: true },
      { name: '📂 Categoría', value: `\`${ticket.category}\``, inline: true },
      { name: '👤 Usuario', value: `<@${ticket.userId}>`, inline: true },
      { name: '👨‍💼 Staff', value: user ? `<@${user.id}>` : 'N/A', inline: true },
      { name: '⏰ Hora', value: `<t:${Math.floor(Date.now() / 1000)}:f>`, inline: false }
    )
    .setTimestamp();
}

module.exports = { createEmbed, createTicketEmbed, createLogEmbed };
