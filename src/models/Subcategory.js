const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    name: { type: String, required: true },
    image: String,
    description: String,
    taxApplicable: Boolean,
    taxPercentage: Number,
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

subcategorySchema.index({ categoryId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Subcategory", subcategorySchema);
