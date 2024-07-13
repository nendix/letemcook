const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URI,
      // "mongodb://mongodb:27017/letemcook_db",
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
