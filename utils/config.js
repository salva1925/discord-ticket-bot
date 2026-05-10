const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../config.json');

function loadConfig() {
  try {
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
    return null;
  } catch (error) {
    console.error('Error loading config:', error);
    return null;
  }
}

function saveConfig(config) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving config:', error);
    return false;
  }
}

module.exports = { loadConfig, saveConfig };
