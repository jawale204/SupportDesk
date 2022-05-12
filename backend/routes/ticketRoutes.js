const express = require("express");
const router = express.Router();
const { getTicket, createTicket } = require("../controllers/TicketController");
const { authMiddleware } = require("../middleware/authMiddleware");
router.get("/", authMiddleware, getTicket);

router.post("/", authMiddleware, createTicket);

module.exports = router;
