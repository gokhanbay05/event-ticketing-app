const Ticket = require("../models/Ticket");

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const now = new Date();

    const tickets = await Ticket.find({ userId }).populate({
      path: "eventId",
      populate: {
        path: "venueID",
      },
    });

    const activeTickets = tickets.filter(
      (ticket) => new Date(ticket.eventId.date) >= now
    );
    const pastTickets = tickets.filter(
      (ticket) => new Date(ticket.eventId.date) < now
    );

    res.render("profile", {
      title: "My Profile",
      activeTickets,
      pastTickets,
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).send("Error loading profile.");
  }
};
