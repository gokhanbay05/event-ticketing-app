const Event = require("../models/Event");
const Venue = require("../models/Venue");

exports.getEvents = async (req, res) => {
  try {
    const now = new Date();
    const page = parseInt(req.query.page) || 1;
    const eventsPerPage = 8;
    const totalEvents = await Event.countDocuments({ date: { $gte: now } });

    const events = await Event.find({ date: { $gte: now } })
      .sort({ date: 1 })
      .skip((page - 1) * eventsPerPage)
      .limit(eventsPerPage)
      .populate("venueID");

    res.render("events", {
      title: "Upcoming Events",
      events: events,
      currentPage: page,
      totalPages: Math.ceil(totalEvents / eventsPerPage),
    });
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).send("Error fetching event list.");
  }
};

exports.getNewEventForm = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.render("admin/add-event", {
      title: "Admin | Add New Event",
      venues: venues,
    });
  } catch (err) {
    console.error("Error fetching venues:", err);
    res.status(500).send("Error fetching venue list.");
  }
};

exports.createEvent = async (req, res) => {
  const { name, text, date, price, venueID, ticketCount, image } = req.body;
  try {
    const newEvent = new Event({
      name,
      text,
      date,
      price,
      venueID,
      ticketCount,
      image,
    });
    await newEvent.save();
    res.redirect("/events");
  } catch (err) {
    console.error("Error creating event:", err);

    const venues = await Venue.find();

    res.render("admin/add-event", {
      title: "Admin | Add New Event (Error)",
      event: req.body,
      venues: venues,
      error: err.message || "Error saving event.",
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect("/events");
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).send("Error deleting event.");
  }
};

exports.getEventEditForm = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const venues = await Venue.find();

    if (!event) {
      return res.status(404).send("Event not found.");
    }

    res.render("admin/edit-event", {
      title: "Edit Event",
      event: event,
      venues: venues,
    });
  } catch (err) {
    console.error("Error fetching event for edit:", err);
    res.status(500).send("Error loading edit form.");
  }
};

exports.updateEvent = async (req, res) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });
    res.redirect("/events");
  } catch (err) {
    console.error("Error updating event:", err);
    const venues = await Venue.find();
    res.render("admin/edit-event", {
      title: "Edit Event (Error)",
      event: req.body,
      venues: venues,
      error: err.message,
    });
  }
};

exports.getEventDetails = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("venueID");
    if (!event) {
      return res.status(404).send("Event not found.");
    }
    res.render("event-details", {
      title: "Event Details",
      event: event,
    });
  } catch (err) {
    console.error("Error fetching event details:", err);
    res.status(500).send("Error fetching event details.");
  }
};
