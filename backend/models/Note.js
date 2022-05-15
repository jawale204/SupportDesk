const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: "Ticket",
    },
    text: {
      type: String,
      required: true,
    },
    isStaff: {
      type: Boolean,
      default: false,
      required: true,
    },
    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Note", NoteSchema);
