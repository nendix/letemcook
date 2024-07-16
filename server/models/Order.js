const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = new mongoose.Schema(
  {
    taxCode: {
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
  },
  {
    timestamps: true,
  },
);

orderSchema.plugin(AutoIncrement, {
  inc_field: "ticket",
  id: "ticketNums",
  start_seq: 1,
});

module.exports = mongoose.model("Order", orderSchema);
