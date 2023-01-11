const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  users: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Groups", groupSchema);
