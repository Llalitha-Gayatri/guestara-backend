const express = require("express");
const { searchItems } = require("../controllers/searchController");

const router = express.Router();
router.get("/items", searchItems);

module.exports = router;
