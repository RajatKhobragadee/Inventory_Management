const mongoose = require("mongoose");

const orderLIneItemSchema = new mongoose.Schema(
  {
    productName: String,
    quantity: Number,
    sellPrice: Number,
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderLIneItem", orderLIneItemSchema);
