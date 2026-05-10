const fs = require('fs');
const path = require('path');

function createTranscript(ticket, messages, user) {
  const transcriptsDir = path.join(__dirname, '../transcripts');
  if (!fs.existsSync(transcriptsDir)) {
    fs.mkdirSync(transcriptsDir, { recursive: true });
  }

  const timestamp = new Date().toLocaleString('es-ES');
  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ticket #${ticket.id} - Transcripción</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #2f3136 0%, #36393f 100%);
      color: #dcddde;
      padding: 20px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: #36393f;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
    .header {
      border-bottom: 2px solid #202225;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      font-size: 28px;
      margin-bottom: 10px;
      color: #fff;
    }
    .header-info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      font-size: 14px;
    }
    .info-item {
      background: #2f3136;
      padding: 10px 15px;
      border-radius: 6px;
    }
    .info-item strong {
      color: #7289da;
    }
    .messages {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .message {
      background: #2f3136;
      padding: 15px;
      border-radius: 6px;
      border-left: 3px solid #7289da;
    }
    .message-author {
      font-weight: bold;
      color: #7289da;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .message-time {
      font-size: 12px;
      color: #72767d;
      margin-left: auto;
    }
    .message-content {
      color: #dcddde;
      word-wrap: break-word;
      white-space: pre-wrap;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #202225;
      font-size: 12px;
      color: #72767d;
      text-align: center;
    }
    .badge {
      display: inline-block;
      background: #7289da;
      color: white;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 11px;
      margin-left: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎫 Ticket #${ticket.id}</h1>
      <div class="header-info">
        <div class="info-item"><strong>Categoría:</strong> ${ticket.category}</div>
        <div class="info-item"><strong>Estado:</strong> ${ticket.closedAt ? 'Cerrado' : 'Abierto'}</div>
        <div class="info-item"><strong>Usuario:</strong> ${user.username}</div>
        <div class="info-item"><strong>Claim:</strong> ${ticket.claimedBy ? 'Reclamado' : 'Sin reclamar'}</div>
      </div>
    </div>

    <div class="messages">
      ${messages.map(msg => \`
        <div class="message">
          <div style="display: flex; justify-content: space-between; align-items: start;">
            <div class="message-author">
              \${msg.author.bot ? '<span class="badge">BOT</span>' : ''}
              \${msg.author.username}
            </div>
            <div class="message-time">\${new Date(msg.createdTimestamp).toLocaleString('es-ES')}</div>
          </div>
          <div class="message-content">\${escapeHtml(msg.content)}</div>
        </div>
      \`).join('')}
    </div>

    <div class="footer">
      <p>Transcripción generada el ${timestamp}</p>
      <p>Discord Ticket Bot</p>
    </div>
  </div>
</body>
</html>
  `;

  const filename = `ticket-${ticket.id}-${Date.now()}.html`;
  const filePath = path.join(transcriptsDir, filename);

  fs.writeFileSync(filePath, html);
  return filePath;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

module.exports = { createTranscript };
