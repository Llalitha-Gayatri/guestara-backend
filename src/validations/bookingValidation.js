const Joi = require("joi");

const bookingSchema = Joi.object({
  date: Joi.string().required(),
  startTime: Joi.string().required(),
  endTime: Joi.string().required()
});

module.exports = { bookingSchema };
