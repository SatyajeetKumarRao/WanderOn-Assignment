require("dotenv").config();
const express = require("express");
const { usersRouter } = require("./routes/users.routes");
const { connectDB } = require("./utils/db.config");

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Server Home Page");
});

app.use("/users", usersRouter);

app.all("*", (req, res) => {
  res.json({ error: true, message: "404 Invalid Route" });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at ${PORT}`);
});
