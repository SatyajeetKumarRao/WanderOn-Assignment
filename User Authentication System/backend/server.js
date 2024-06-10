require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { usersRouter } = require("./routes/users.routes");
const { connectDB } = require("./utils/db.config");
const cookieParser = require("cookie-parser");
const { tripsRouter } = require("./routes/trips.routes");
const session = require("express-session");

const helmet = require("helmet");

const app = express();

app.use(helmet());

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

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Server Home Page" });
});

app.use("/users", usersRouter);

app.use("/trips", tripsRouter);

app.all("*", (req, res) => {
  res.json({ error: true, message: "404 Invalid Route" });
});

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running at ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
