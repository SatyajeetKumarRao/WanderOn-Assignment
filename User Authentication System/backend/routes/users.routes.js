const express = require("express");

const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
  res.send("users home");
});

usersRouter.all("*", (req, res) => {
  res.json({ error: true, message: "404 Invalid Route" });
});

module.exports = { usersRouter };
