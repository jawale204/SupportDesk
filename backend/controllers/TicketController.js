const { validationResult } = require("express-validator");
const Ticket = require("../models/Ticket");
const TicketSchema = require("../models/Ticket");

const getTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id });
    if (!tickets) {
      return res.status(200).json({
        success: false,
        err: null,
        data: {},
        message: "tickets not found",
      });
    }
    return res.status(200).json({
      success: true,
      err: null,
      data: tickets,
      message: "tickets found",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      err: e.message,
      data: {},
      message: "internal server error",
    });
  }
};

const createTicket = async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ success: false, err, data: {} });
  }
  try {
    const ticket = {
      product: req.body.product,
      description: req.body.description,
      status: "new",
      user: req.user._id,
    };

    console.l;
    const newTicket = await Ticket.create(ticket);
    return res.status(201).json({
      success: true,
      err: null,
      data: newTicket,
      message: "ticket created",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      err: e.message,
      data: {},
      message: "internal server error",
    });
  }
};
module.exports = {
  getTicket,
  createTicket,
};
