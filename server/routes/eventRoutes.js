const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");
const ticketController = require("../controllers/ticketController");

router.get("/", eventController.getEvents);
router.get("/new", [isAuthenticated, isAdmin], eventController.getNewEventForm);
router.post("/new", [isAuthenticated, isAdmin], eventController.createEvent);
router.get(
  "/delete/:id",
  [isAuthenticated, isAdmin],
  eventController.deleteEvent
);

router.get(
  "/edit/:id",
  [isAuthenticated, isAdmin],
  eventController.getEventEditForm
);
router.post(
  "/edit/:id",
  [isAuthenticated, isAdmin],
  eventController.updateEvent
);

router.get("/details/:id", eventController.getEventDetails);

router.post("/purchase/:id", isAuthenticated, ticketController.purchaseTicket);

module.exports = router;
