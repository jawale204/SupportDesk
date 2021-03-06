const { sendResponse } = require("../service/sendResponse");
const NoteSchema = require("../models/Note");
const TicketSchema = require("../models/Ticket");

const getNotes = async (req, res) => {
  try {
    const ticket = await TicketSchema.findById(req.params.ticketId);
    if (!ticket) {
      res.status(400);
      return sendResponse(
        res,
        false,
        "Ticket not found",
        {},
        "Ticket not found",
      );
    }

    if (ticket.user.toString() !== req.user._id.toString()) {
      res.status(400);
      return sendResponse(res, false, "unAuthorized", {}, "unAuthorized");
    }

    const notes = await NoteSchema.find({ ticket: req.params.ticketId });
    res.status(200);
    return sendResponse(res, true, null, notes, "notes fetched");
  } catch (e) {
    res.status(500);
    return sendResponse(res, false, e.message, {}, "internal server error");
  }
};

const createNotes = async (req, res) => {
  try {
    const ticketRes = await TicketSchema.findById(req.params.ticketId);
    if (!ticketRes) {
      res.status(400);
      return sendResponse(
        res,
        false,
        "Ticket not found",
        {},
        "Ticket not found",
      );
    }

    if (ticketRes.user.toString() !== req.user._id.toString()) {
      res.status(400);
      return sendResponse(res, false, "unAuthorized", {}, "unAuthorized");
    }
    const noteObj = {
      text: req.body.text,
      user: req.user._id,
      ticket: ticketRes._id,
    };
    const note = await NoteSchema.create(noteObj);
    res.status(201);
    return sendResponse(res, true, null, note, "note created");
  } catch (e) {
    res.status(500);
    return sendResponse(res, false, e.message, {}, "internal server error");
  }
};

module.exports = {
  getNotes,
  createNotes,
};
