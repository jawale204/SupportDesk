const TicketSchema = require("../models/Ticket");

const getTicket = async (req, res) => {
  res.status(200).json({ message: "get ticket" });
};

const createTicket = async (req, res) => {
  res.status(200).json({ message: "create ticket" });
};

module.exports = {
  getTicket,
  createTicket,
};
