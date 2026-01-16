const parseTimeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const calculateTieredPrice = (tiers, usage) => {
  for (const tier of tiers) {
    if (usage <= tier.upto) {
      return tier.price;
    }
  }
  throw new Error("No tier available for given usage");
};

const calculateDynamicPrice = (windows, currentTime) => {
  const now = parseTimeToMinutes(currentTime);

  for (const window of windows) {
    const start = parseTimeToMinutes(window.start);
    const end = parseTimeToMinutes(window.end);

    if (now >= start && now < end) {
      if (window.price === null) {
        throw new Error("Item not available at this time");
      }
      return window.price;
    }
  }
  throw new Error("No pricing window matched");
};

const calculatePrice = ({ item, context }) => {
  const config = item.pricingConfig;

  switch (item.pricingType) {
    case "STATIC":
      return config.price;

    case "COMPLIMENTARY":
      return 0;

    case "DISCOUNTED": {
      const { basePrice, discountType, discountValue } = config;
      let finalPrice =
        discountType === "PERCENT"
          ? basePrice - (basePrice * discountValue) / 100
          : basePrice - discountValue;

      return Math.max(finalPrice, 0);
    }

    case "TIERED":
      if (!context.usage) {
        throw new Error("Usage is required for tiered pricing");
      }
      return calculateTieredPrice(config.tiers, Number(context.usage));

    case "DYNAMIC":
      const time = context.time || new Date().toTimeString().slice(0, 5);
      return calculateDynamicPrice(config.windows, time);

    default:
      throw new Error("Invalid pricing type");
  }
};

module.exports = { calculatePrice };
