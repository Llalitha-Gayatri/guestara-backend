const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true
    },
    date: {
      type: String, // "2026-01-20"
      required: true
    },
    startTime: {
      type: String, // "10:00"
      required: true
    },
    endTime: {
      type: String, // "11:00"
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
