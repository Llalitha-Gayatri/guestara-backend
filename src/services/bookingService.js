const Booking = require("../models/Booking");
const { isOverlap } = require("../utils/time");

const getAvailableSlots = async (item, date) => {
  const day = new Date(date)
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();

  if (!item.availability.days.includes(day)) {
    return [];
  }

  const existingBookings = await Booking.find({
    itemId: item._id,
    date
  });

  return item.availability.slots.filter((slot) => {
    return !existingBookings.some((booking) =>
      isOverlap(
        slot.start,
        slot.end,
        booking.startTime,
        booking.endTime
      )
    );
  });
};

const bookSlot = async (item, date, startTime, endTime) => {
  const conflicts = await Booking.find({
    itemId: item._id,
    date
  });

  const hasConflict = conflicts.some((booking) =>
    isOverlap(startTime, endTime, booking.startTime, booking.endTime)
  );

  if (hasConflict) {
    throw new Error("Slot already booked");
  }

  return Booking.create({
    itemId: item._id,
    date,
    startTime,
    endTime
  });
};

module.exports = { getAvailableSlots, bookSlot };
