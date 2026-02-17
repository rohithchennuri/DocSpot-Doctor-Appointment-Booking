const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  specialization: String,
  location: String,
  availableSlots: [String],
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Doctor", doctorSchema);
