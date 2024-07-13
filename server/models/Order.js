const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    choosenMenu: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Menu",
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    taxCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(("Order", orderSchema));
