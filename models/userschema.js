const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  type: { type: String, required: true },
  rating: { type: String, required: true },
});

module.exports = mongoose.model("movies", userSchema);
