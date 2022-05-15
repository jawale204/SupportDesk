const express = require("express");
const router = express.Router({ mergeParams: true });
const { authMiddleware } = require("../middleware/authMiddleware");
const { getNotes, createNotes } = require("../controllers/NoteController");

router.get("/", authMiddleware, getNotes);

router.post("/", authMiddleware, createNotes);

module.exports = router;
