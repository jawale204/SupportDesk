const express = require("express");
const router = express.Router();
const { getTicket, createTicket } = require("../controllers/TicketController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { createTicketValidation } = require("../validation/Ticket");
router.get("/", authMiddleware, getTicket);

router.post("/", createTicketValidation, authMiddleware, createTicket);

module.exports = router;
