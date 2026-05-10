const { InteractionType } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    // Slash Commands
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: '❌ Hubo un error al ejecutar el comando.', ephemeral: true });
        } else {
          await interaction.reply({ content: '❌ Hubo un error al ejecutar el comando.', ephemeral: true });
        }
      }
    }

    // Buttons
    if (interaction.isButton()) {
      const button = client.buttons.get(interaction.customId);
      if (!button) return;

      try {
        await button.execute(interaction, client);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: '❌ Error al procesar el botón.', ephemeral: true });
        } else {
          await interaction.reply({ content: '❌ Error al procesar el botón.', ephemeral: true });
        }
      }
    }

    // Select Menus
    if (interaction.isStringSelectMenu()) {
      const select = client.selects.get(interaction.customId);
      if (!select) return;

      try {
        await select.execute(interaction, client);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: '❌ Error al procesar el menú.', ephemeral: true });
        } else {
          await interaction.reply({ content: '❌ Error al procesar el menú.', ephemeral: true });
        }
      }
    }

    // Modals
    if (interaction.isModalSubmit()) {
      const modal = client.modals.get(interaction.customId);
      if (!modal) return;

      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: '❌ Error al procesar el formulario.', ephemeral: true });
        } else {
          await interaction.reply({ content: '❌ Error al procesar el formulario.', ephemeral: true });
        }
      }
    }
  },
};
