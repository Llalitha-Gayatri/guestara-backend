const express = require("express");
const {
  getSlots,
  createBooking
} = require("../controllers/bookingController");

const router = express.Router();

router.get("/:itemId/slots", getSlots);
router.post("/:itemId/book", createBooking);

module.exports = router;
