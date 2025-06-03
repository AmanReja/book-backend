const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  razorpayid: { type: String, default: "" },
  amount: { type: Number, require: true },
  brandname: { type: String, require: true },
  quantity: { type: Number, required: true },
  brandimage: { type: String, required: true },
  status: { default: "Pending", type: String }
});
const payment = mongoose.model("Payment", dataSchema);
module.exports = payment;
