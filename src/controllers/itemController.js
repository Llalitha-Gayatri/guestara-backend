const Item = require("../models/Item");
const { calculatePrice } = require("../services/pricingService");
const { getTaxForItem } = require("../services/taxService");

const getItemPrice = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item || !item.isActive) {
      return res.status(404).json({ message: "Item not found" });
    }

    const basePrice = calculatePrice({
      item,
      context: req.query
    });

    const taxPercent = await getTaxForItem(item);
    const taxAmount = (basePrice * taxPercent) / 100;

    res.json({
      pricingType: item.pricingType,
      basePrice,
      taxPercent,
      taxAmount,
      finalPrice: basePrice + taxAmount
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports = { getItemPrice };
