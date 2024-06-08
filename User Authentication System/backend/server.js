require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { usersRouter } = require("./routes/users.routes");
const { connectDB } = require("./utils/db.config");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    methods: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("Cookies: ", JSON.stringify(req.cookies));
  res.json({ message: "Server Home Page" });
});

app.use("/users", usersRouter);

app.all("*", (req, res) => {
  res.json({ error: true, message: "404 Invalid Route" });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at ${PORT}`);
});
