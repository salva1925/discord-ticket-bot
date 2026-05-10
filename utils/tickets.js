const fs = require('fs');
const path = require('path');

const ticketsPath = path.join(__dirname, '../tickets.json');

function loadTickets() {
  try {
    if (fs.existsSync(ticketsPath)) {
      return JSON.parse(fs.readFileSync(ticketsPath, 'utf8'));
    }
    return {};
  } catch (error) {
    console.error('Error loading tickets:', error);
    return {};
  }
}

function saveTickets(tickets) {
  try {
    fs.writeFileSync(ticketsPath, JSON.stringify(tickets, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving tickets:', error);
    return false;
  }
}

function createTicket(ticketId, userId, category, channelId) {
  const ticket = {
    id: ticketId,
    userId,
    category,
    channelId,
    claimedBy: null,
    createdAt: Date.now(),
    closedAt: null,
    messages: [],
  };

  const tickets = loadTickets();
  tickets[ticketId] = ticket;
  saveTickets(tickets);
  return ticket;
}

function updateTicket(ticketId, updates) {
  const tickets = loadTickets();
  if (tickets[ticketId]) {
    Object.assign(tickets[ticketId], updates);
    saveTickets(tickets);
    return tickets[ticketId];
  }
  return null;
}

function deleteTicket(ticketId) {
  const tickets = loadTickets();
  delete tickets[ticketId];
  saveTickets(tickets);
}

function getTicket(ticketId) {
  const tickets = loadTickets();
  return tickets[ticketId] || null;
}

function getUserTickets(userId) {
  const tickets = loadTickets();
  return Object.values(tickets).filter(t => t.userId === userId && !t.closedAt);
}

function getTicketsByCategory(category) {
  const tickets = loadTickets();
  return Object.values(tickets).filter(t => t.category === category && !t.closedAt);
}

function generateTicketId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function checkDuplicate(userId, category) {
  const userTickets = getUserTickets(userId);
  return userTickets.some(t => t.category === category);
}

module.exports = {
  loadTickets,
  saveTickets,
  createTicket,
  updateTicket,
  deleteTicket,
  getTicket,
  getUserTickets,
  getTicketsByCategory,
  generateTicketId,
  checkDuplicate,
};
