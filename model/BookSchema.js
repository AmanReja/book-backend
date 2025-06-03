const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  bookname: {
    required: true,
    type: String
  },
  price: {
    required: true,
    type: Number
  },
  quantity: {
    required: true,
    type: Number
  },
  rating: {
    required: true,
    type: Number
  },
  offer: {
    required: true,
    type: Number
  },
  authore: {
    required: true,
    type: String
  },
  bookimage: {
    required: true,
    type: String
  },
  bookimageid: {
    require: true,
    type: String
  }
});

module.exports = mongoose.model("Book", dataSchema);
