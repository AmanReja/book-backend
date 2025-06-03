const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
    },

    totalamount: {
      type: Number,
    },

    itemquantity: {
      type: Number,
    },
    items: [
      {
        bookname: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        bookimage: {
          type: String, // URL to image or base64 encoding
          required: true,
        },
        authore: {
          type: String,
          required: true,
        },
        offer: {
          type: Number, // Discount percentage (optional)
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

const order = mongoose.model("Order", dataSchema);

module.exports = order;
