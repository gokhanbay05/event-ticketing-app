const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: [1, "Capacity must be at least 1."],
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
