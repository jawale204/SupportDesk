const { validationResult } = require("express-validator");
const res = require("express/lib/response");
const Ticket = require("../models/Ticket");
const { sendResponse } = require("../service/sendResponse");

const getTickets = async (req, res) => {
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
    const newTicket = await Ticket.create(ticket);
    res.status(201);
    return sendResponse(res, true, null, newTicket, "ticket created");
  } catch (e) {
    return res.status(500).json({
      success: false,
      err: e.message,
      data: {},
      message: "internal server error",
    });
  }
};

const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.find({
      user: req.user._id,
      _id: req.params.id,
    });

    if (!ticket || ticket.length === 0) {
      res.status(400);
      return sendResponse(res, false, null, {}, "ticked not found");
    }

    res.status(200);
    return sendResponse(res, true, null, ticket[0], "ticket found");
  } catch (e) {
    res.status(500);
    return sendResponse(res, false, e.message, {}, "Interval server error");
  }
};

const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.find({
      user: req.user._id,
      _id: req.params.id,
    });

    if (!ticket || ticket.length === 0) {
      res.status(400);
      return sendResponse(res, false, null, {}, "ticked not found");
    }

    await ticket[0].remove();
    res.status(200);
    return sendResponse(res, true, null, ticket[0], "ticket deleted");
  } catch (e) {
    res.status(500);
    return sendResponse(res, false, e.message, {}, "Interval server error");
  }
};

const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      res.status(400);
      return sendResponse(res, false, null, {}, "ticked not found");
    }

    if (ticket.user.toString() !== req.user.id) {
      res.status(401);
      return sendResponse(res, false, null, {}, "Unauthorized");
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    res.status(200);
    return sendResponse(res, true, null, updatedTicket, "ticket updated");
  } catch (e) {
    res.status(500);
    return sendResponse(res, false, e.message, {}, "Interval server error");
  }
};
module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};
