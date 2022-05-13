const express = require("express");
const router = express.Router();
const {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/TicketController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { createTicketValidation } = require("../validation/Ticket");
router.get("/", authMiddleware, getTickets);

router.post("/", createTicketValidation, authMiddleware, createTicket);

router.get("/:id", authMiddleware, getTicket);

router.delete("/:id", authMiddleware, deleteTicket);

router.put("/:id", authMiddleware, updateTicket);

module.exports = router;
