const toMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const isOverlap = (start1, end1, start2, end2) => {
  return (
    toMinutes(start1) < toMinutes(end2) &&
    toMinutes(start2) < toMinutes(end1)
  );
};

module.exports = { toMinutes, isOverlap };
