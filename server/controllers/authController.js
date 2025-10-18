const User = require("../models/User");
const { registerSchema, loginSchema } = require("../utils/validationSchemas");
const jwt = require("jsonwebtoken");

exports.getRegisterForm = (req, res) => {
  res.render("auth/register", { title: "Register" });
};

exports.registerUser = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.render("auth/register", {
        title: "Register",
        error: error.details[0].message,
        formData: req.body,
      });
    }

    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.render("auth/register", {
        title: "Login",
        error: "Email or username already exists.",
        formData: req.body,
      });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.redirect("/auth/login");
  } catch (err) {
    console.error("Register Error:", err);
    res.render("auth/register", {
      title: "Register",
      error: "Something went wrong.",
      formData: req.body,
    });
  }
};

exports.getLoginForm = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

exports.loginUser = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.render("auth/login", {
        title: "Login",
        error: error.details[0].message,
        formData: req.body,
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error_msg", "Invalid email or password.");
      return res.render("auth/login", {
        title: "Login",
        error: "Invalid email or password.",
        formData: req.body,
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render("auth/login", {
        title: "Login",
        error: "Invalid email or password.",
        formData: req.body,
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return res.redirect("/");
  } catch (err) {
    console.error("Login Error:", err);
    res.render("auth/login", {
      title: "Login",
      error: "Something went wrong.",
      formData: req.body,
    });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
