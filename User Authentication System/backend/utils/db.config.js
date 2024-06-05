require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.DATABASE_URI;

const connectDB = () => {
  mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log("Database connect successfully");
    })
    .catch((error) => {
      console.log(`Unable to connect with Database. Error : ${error}`);

      process.exit(1);
    });
};

module.exports = { connectDB };
