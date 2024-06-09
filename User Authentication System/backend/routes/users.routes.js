require("dotenv").config();
const express = require("express");

const {
  validateRegister,
  validateLogin,
} = require("../middleware/users.middleware");

const {
  login,
  register,
  checkAuth,
  logout,
} = require("../controller/users.controller");

const usersRouter = express.Router();

const saltRounds = 10;

usersRouter.post("/login", validateLogin, login);

usersRouter.post("/register", validateRegister, register);

// usersRouter.js or similar file
usersRouter.get("/check-auth", checkAuth);

usersRouter.post("/logout", logout);

usersRouter.all("*", (req, res) => {
  res.json({ error: true, message: "404 Invalid Route" });
});

module.exports = { usersRouter };
