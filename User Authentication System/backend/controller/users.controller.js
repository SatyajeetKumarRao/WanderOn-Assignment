require("dotenv").config();
const express = require("express");
const { Users } = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { BlacklistToken } = require("../models/blacklistToken.model");

const saltRounds = 10;

const login = async (req, res) => {
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
        jwt.sign(
          {
            userId: user._id,
            email: user.email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" },
          (err, accessToken) => {
            if (err) {
              throw new Error(err);
            }
            req.session.userId = user._id;
            return res
              .status(200)
              .cookie("accessToken", accessToken, {
                httpOnly: true,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                secure: process.env.NODE_ENV === "production",
                sameSite:
                  process.env.NODE_ENV === "production" ? "none" : "lax",
              })
              .json({
                accessToken,
                data: {
                  userId: user._id,
                  email: user.email,
                },
                message: "User logged in successfully",
              });
          }
        );
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
};

const register = async (req, res) => {
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
          userId: user._id,
          email: user.email,
        },
        message: "User registered successfully",
      });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: true, message: error.message });
  }
};

const checkAuth = (req, res) => {
  const accessToken =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ error: true, message: "Not Authorized" });
  }

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decodedData) => {
      if (err) {
        return res.status(401).json({ error: true, message: "Not Authorized" });
      }
      return res
        .status(200)
        .json({ userId: decodedData.userId, email: decodedData.email });
    }
  );
};

const logout = async (req, res) => {
  try {
    const accessToken =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    if (accessToken) {
      req.session.destroy();

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
    return res.status(500).json({ error: true, message: error.message });
  }
};
module.exports = { login, register, checkAuth, logout };
