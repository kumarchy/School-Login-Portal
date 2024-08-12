const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("parents", parentSchema);
