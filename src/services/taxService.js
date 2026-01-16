const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

const getTaxForItem = async (item) => {
  if (item.taxApplicable !== undefined) {
    return item.taxApplicable ? item.taxPercentage : 0;
  }

  if (item.subcategoryId) {
    const sub = await Subcategory.findById(item.subcategoryId);
    if (sub.taxApplicable !== undefined) {
      return sub.taxApplicable ? sub.taxPercentage : 0;
    }
    const cat = await Category.findById(sub.categoryId);
    return cat.taxApplicable ? cat.taxPercentage : 0;
  }

  const cat = await Category.findById(item.categoryId);
  return cat.taxApplicable ? cat.taxPercentage : 0;
};

module.exports = { getTaxForItem };
