const express = require("express");
const path = require("path");
const connectDB = require("./server/config/db");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

// ----------------------------------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ----------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.user = decoded;
    } catch (err) {
      res.clearCookie("token");
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
});

// ----------------------------------------------------
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/uploads")));

// ----------------------------------------------------
const indexRoutes = require("./server/routes/index");
const venueRoutes = require("./server/routes/venueRoutes");
const eventRoutes = require("./server/routes/eventRoutes");
const authRoutes = require("./server/routes/authRoutes");

app.use("/", indexRoutes);
app.use("/venues", venueRoutes);
app.use("/events", eventRoutes);
app.use("/auth", authRoutes);

// ----------------------------------------------------
const PORT = process.env.APP_PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
