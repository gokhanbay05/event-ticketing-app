const Venue = require("../models/Venue");
const Event = require("../models/Event");

exports.getVenues = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const venuesPerPage = 8;
    const totalVenues = await Venue.countDocuments();

    const venues = await Venue.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * venuesPerPage)
      .limit(venuesPerPage);

    res.render("venues", {
      title: "Discover Venues",
      venues: venues,
      currentPage: page,
      totalPages: Math.ceil(totalVenues / venuesPerPage),
    });
  } catch (err) {
    console.error("Error fetching venues:", err);
    res.status(500).send("Error fetching venue list.");
  }
};

exports.getNewVenueForm = (req, res) => {
  res.render("admin/add-venue", {
    title: "Admin | Add New Venue",
  });
};

exports.createVenue = async (req, res) => {
  const { name, capacity, address, image } = req.body;
  try {
    const newVenue = new Venue({ name, capacity, address, image });
    await newVenue.save();
    res.redirect("/venues");
  } catch (err) {
    console.error("Error creating venue:", err);
    res.render("admin/add-venue", {
      title: "Admin | Add New Venue (Error)",
      venue: req.body,
      error: err.message || "Error saving venue.",
    });
  }
};

exports.deleteVenue = async (req, res) => {
  try {
    await Venue.findByIdAndDelete(req.params.id);
    res.redirect("/venues");
  } catch (err) {
    console.error("Error deleting venue:", err);
    res.status(500).send("Error deleting venue.");
  }
};

exports.getVenueEditForm = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).send("Venue not found.");
    }
    res.render("admin/edit-venue", {
      title: "Admin | Edit Venue",
      venue: venue,
    });
  } catch (err) {
    console.error("Error fetching venue for edit:", err);
    res.status(500).send("Error loading edit form.");
  }
};

exports.updateVenue = async (req, res) => {
  try {
    await Venue.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });
    res.redirect("/venues");
  } catch (err) {
    console.error("Error updating venue:", err);
    res.render("admin/edit-venue", {
      title: "Admin | Edit Venue (Error)",
      venue: req.body,
      error: err.message,
    });
  }
};

exports.getVenueDetails = async (req, res) => {
  try {
    const now = new Date();
    const [venue, eventsAtVenue] = await Promise.all([
      Venue.findById(req.params.id),
      Event.find({ venueID: req.params.id, date: { $gte: now } }).sort({
        date: 1,
      }),
    ]);

    if (!venue) {
      return res.status(404).render("404", { title: "Venue Not Found" }); // 404 sayfası varsa daha iyi olur.
    }

    res.render("venue-details", {
      title: venue.name,
      venue: venue,
      events: eventsAtVenue,
    });
  } catch (err) {
    console.error("Error fetching venue details:", err);
    res.status(500).send("Error loading venue details.");
  }
};
