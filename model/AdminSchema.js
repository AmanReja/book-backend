const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  adminid: {
    required: true,
    type: String
  },

  adminpassword: {
    required: true,
    type: String
  },
  admincontact: {
    required: true,
    type: String
  }
});
module.exports = mongoose.model("Admin", dataSchema);
