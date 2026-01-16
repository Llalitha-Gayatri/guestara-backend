const express = require("express");

const app = express();

app.use(express.json());
app.use("/items", require("./routes/itemRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));
app.use("/search", require("./routes/searchRoutes"));

app.get("/", (req, res) => {
  res.send("Guestara Backend Running");
});

module.exports = app;
