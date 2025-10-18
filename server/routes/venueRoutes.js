const express = require("express");
const router = express.Router();
const venueController = require("../controllers/venueController");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

router.get("/", venueController.getVenues);
router.get("/new", [isAuthenticated, isAdmin], venueController.getNewVenueForm);
router.post("/new", [isAuthenticated, isAdmin], venueController.createVenue);
router.get(
  "/delete/:id",
  [isAuthenticated, isAdmin],
  venueController.deleteVenue
);

router.get(
  "/edit/:id",
  [isAuthenticated, isAdmin],
  venueController.getVenueEditForm
);
router.post(
  "/edit/:id",
  [isAuthenticated, isAdmin],
  venueController.updateVenue
);

router.get("/details/:id", venueController.getVenueDetails);

module.exports = router;
