const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: String,
    description: String,
    taxApplicable: { type: Boolean, default: false },
    taxPercentage: { type: Number },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
