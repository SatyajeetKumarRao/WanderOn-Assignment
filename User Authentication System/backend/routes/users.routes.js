require("dotenv").config();
const express = require("express");
const { Users } = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
  validateRegister,
  validateLogin,
} = require("../middleware/users.middleware");
const { BlacklistToken } = require("../models/blacklistToken.model");
const { Session } = require("../models/session.model");

const usersRouter = express.Router();

const saltRounds = 10;

usersRouter.get("/", (req, res) => {
  res.send("users home");
});

usersRouter.post("/login", validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: "User doesn't exist. Try to register." });
    }

    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        throw new Error(err);
      }

      if (result) {
        // const sessionId = crypto.randomBytes(32).toString("hex");

        // const session = new Session({
        //   userId: user._id,
        //   sessionId,
        // });

        // await session.save();

        const accessToken = jwt.sign(
          {
            userId: user._id,
            // sessionId,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );

        return res
          .status(200)
          .cookie("accessToken", accessToken, {
            httpOnly: true,
            // secure: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          })
          .json({
            // accessToken,
            data: {
              userid: user._id,
            },
            message: "User logged in successfully",
          });
      } else {
        return res.status(400).json({
          error: true,
          message: "Invalid Email or Password",
        });
      }
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: true, message: error.message });
  }
});

usersRouter.post("/register", validateRegister, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await Users.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ error: true, message: "User already exists" });
    }

    bcrypt.hash(password, saltRounds, async (err, encrypted) => {
      if (err) {
        throw new Error(err);
      }

      const user = new Users({
        username,
        email,
        password: encrypted,
      });

      await user.save();

      return res.status(201).json({
        data: {
          userid: user._id,
          email: user.email,
        },
        message: "User registered successfully",
      });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: true, message: error.message });
  }
});

usersRouter.post("/logout", async (req, res) => {
  try {
    if (req.cookies.accessToken) {
      const accessToken = req.cookies.accessToken;

      const blacklistToken = new BlacklistToken({ token: accessToken });

      await blacklistToken.save();

      return res.status(200).clearCookie("accessToken").json({
        message: "User logged out successfully",
      });
    } else {
      return res
        .status(400)
        .json({ error: true, message: "Access Token Required" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: true, message: error.message });
  }
});

usersRouter.all("*", (req, res) => {
  res.json({ error: true, message: "404 Invalid Route" });
});

module.exports = { usersRouter };
