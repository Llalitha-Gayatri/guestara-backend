const Item = require("../models/Item");
const {
  getAvailableSlots,
  bookSlot
} = require("../services/bookingService");

const getSlots = async (req, res) => {
  const item = await Item.findById(req.params.itemId);

  if (!item || !item.isBookable) {
    return res.status(400).json({ message: "Item not bookable" });
  }

  const slots = await getAvailableSlots(item, req.query.date);
  res.json(slots);
};

const createBooking = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;
    const item = await Item.findById(req.params.itemId);

    if (!item || !item.isBookable) {
      return res.status(400).json({ message: "Item not bookable" });
    }

    const booking = await bookSlot(
      item,
      date,
      startTime,
      endTime
    );

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getSlots, createBooking };
