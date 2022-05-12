const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: true,
      enum: ["iphone", "Macbook Pro", "iMac", "iPad"],
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Ticket", TicketSchema);
