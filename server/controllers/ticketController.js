const Ticket = require("../models/Ticket");
const Event = require("../models/Event");

exports.purchaseTicket = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.userId;
    const quantity = parseInt(req.body.quantity, 10);

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send("Event not found.");
    }

    if (event.ticketCount < quantity) {
      return res.status(400).send("Not enough tickets available.");
    }

    event.ticketCount -= quantity;
    await event.save();

    const newTicket = new Ticket({
      userId,
      eventId,
      quantity,
    });
    await newTicket.save();

    res.redirect("/profile");
  } catch (err) {
    console.error("Ticket purchase error:", err);
    res.status(500).send("Something went wrong during purchase.");
  }
};
