const express = require("express");
const { getItemPrice } = require("../controllers/itemController");

const router = express.Router();

router.get("/:id/price", getItemPrice);

module.exports = router;
