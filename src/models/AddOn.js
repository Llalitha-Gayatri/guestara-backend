const mongoose = require("mongoose");

const addOnSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  isMandatory: { type: Boolean, default: false },
  group: String // e.g. "SAUCE"
});

module.exports = mongoose.model("AddOn", addOnSchema);
