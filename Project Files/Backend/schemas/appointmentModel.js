const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  age: Number,
  date: String,
  status: { type: String, default: "pending" },
  documents: [
    {
      filename: String,
      contentType: String,
      buffer: Buffer,
    },
  ],
});

module.exports = mongoose.model("Appointment", appointmentSchema);
