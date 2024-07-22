const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = new mongoose.Schema(
  {
    taxCode: {
      type: String,
      unique: true,
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
  },
  {
    timestamps: true,
  },
);

orderSchema.plugin(AutoIncrement, {
  inc_field: "ticket",
  id: "ticket",
  start_seq: 1,
});

module.exports = mongoose.model("Order", orderSchema);
