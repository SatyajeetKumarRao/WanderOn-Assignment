require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { usersRouter } = require("./routes/users.routes");
const { connectDB } = require("./utils/db.config");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

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
