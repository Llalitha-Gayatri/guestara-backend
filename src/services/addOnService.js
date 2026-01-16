const AddOn = require("../models/AddOn");

const calculateAddOnPrice = async (itemId, selectedAddOns = []) => {
  const addOns = await AddOn.find({
    _id: { $in: selectedAddOns },
    itemId
  });

  return addOns.reduce((sum, addon) => sum + addon.price, 0);
};

module.exports = { calculateAddOnPrice };
