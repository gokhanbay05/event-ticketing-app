const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const userController = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/", indexController.getHomePage);
router.get("/profile", isAuthenticated, userController.getUserProfile);

module.exports = router;
