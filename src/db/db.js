const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/store");
  console.log("Connected To Database Successfully!".green.inverse.bold);
};

module.exports = connectDB;
