const express = require("express");
const router = express.Router({ mergeParams: true });
const { authMiddleware } = require("../middleware/authMiddleware");
const { getNotes } = require("../controllers/NoteController");

router.get("/", authMiddleware, getNotes);

module.exports = router;
