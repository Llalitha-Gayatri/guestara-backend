const Item = require("../models/Item");
const { getPagination } = require("../utils/pagination");

const searchItems = async (req, res) => {
  const {
    q,
    minPrice,
    maxPrice,
    categoryId,
    activeOnly = "true",
    page,
    limit,
    sortBy = "name"
  } = req.query;

  const filter = {};

  if (q) filter.name = { $regex: q, $options: "i" };
  if (categoryId) filter.categoryId = categoryId;
  if (activeOnly === "true") filter.isActive = true;

  const { skip, limit: lim } = getPagination(page, limit);

  const items = await Item.find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(lim);

  res.json(items);
};

module.exports = { searchItems };
