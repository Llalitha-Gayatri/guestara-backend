const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory"
    },

    description: String,
    image: String,

    isActive: {
      type: Boolean,
      default: true
    },

    pricingType: {
      type: String,
      enum: ["STATIC", "TIERED", "COMPLIMENTARY", "DISCOUNTED", "DYNAMIC"],
      required: true
    },

    pricingConfig: {
      type: mongoose.Schema.Types.Mixed
    },

    isBookable: {
      type: Boolean,
      default: false
    },

    availability: {
      days: [String], 

      slots: [
        {
          start: String, 
          end: String 
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Item", itemSchema);
