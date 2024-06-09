const express = require("express");

const tripsRouter = express.Router();

tripsRouter.all("*", (req, res) => {
  res.json({ error: true, message: "404 Invalid Route" });
});

module.exports = { tripsRouter };
