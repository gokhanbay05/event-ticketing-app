const Event = require("../models/Event");
const Venue = require("../models/Venue");

exports.getHomePage = async (req, res) => {
  try {
    const now = new Date();
    const [featuredEvents, featuredVenues] = await Promise.all([
      Event.find({ date: { $gte: now } })
        .sort({ date: 1 })
        .limit(3)
        .populate("venueID"),

      Venue.find().sort({ createdAt: -1 }).limit(3),
    ]);

    res.render("index", {
      title: "Home",
      events: featuredEvents,
      venues: featuredVenues,
    });
  } catch (err) {
    console.error("Error fetching home page data:", err);
    res.status(500).send("Could not load the home page.");
  }
};
