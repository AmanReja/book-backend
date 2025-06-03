const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userid: {
      type: String
    },
    itemid: {
      type: Number
    },
    items: [
      {
        bookname: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          default: 1
        },
        bookimage: {
          type: String, // URL to image or base64 encoding
          required: true
        },
        authore: {
          type: String,
          required: true
        },
        offer: {
          type: Number, // Discount percentage (optional)
          default: 0
        }
      }
    ]
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
