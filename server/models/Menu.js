const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  first: {
    type: String,
    required: true,
  },
  second: {
    type: String,
    required: true,
  },
  side: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(("Menu", menuSchema));
