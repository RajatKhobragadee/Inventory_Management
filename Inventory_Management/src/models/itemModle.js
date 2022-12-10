const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    productName: {type:String,unique : true},
    quantity: Number,
    stockPrice: Number,
    sellPrice:Number,
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("item", itemSchema);
