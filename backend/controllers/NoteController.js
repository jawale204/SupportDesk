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

module.exports = {
  getNotes,
};
