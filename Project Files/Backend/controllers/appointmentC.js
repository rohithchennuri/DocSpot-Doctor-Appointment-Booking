const Appointment = require('../schemas/appointmentModel');
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
exports.upload = multer({ storage });

// Book an appointment (now accepts name and age, checks required fields)
// appointmentsController.js
const Appointment = require("../models/appointmentModel");

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, name, age } = req.body;
    const userId = req.user.id;

    const appointment = new Appointment({
      doctorId,
      userId,
      date,
      name,
      age,
      documents: req.files.map(file => ({
        filename: file.originalname,
        contentType: file.mimetype,
        buffer: file.buffer,
      })),
      status: "pending",
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Admin: get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('userId', 'name email')
      .populate({
  path: 'doctorId',
  populate: { path: 'userId', select: 'name' }, // populate the doctor’s user data for name
  select: 'specialization location userId'
})
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User: get own appointments
exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await Appointment.find({ userId })
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name' },
        select: 'specialization location userId'
      });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel or reschedule appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { appointmentId, status, date } = req.body;
    const update = {};
    if (status) update.status = status;
    if (date) update.date = date;
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      update,
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Doctor: get own appointments
exports.getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id; // Assuming doctor's user ID
    // Find doctor profile for this user
    const doctorProfile = await require('../schemas/docModel').findOne({ userId: doctorId });
    if (!doctorProfile) return res.status(404).json({ message: "Doctor profile not found" });

    const appointments = await Appointment.find({ doctorId: doctorProfile._id })
      .populate('userId', 'name email');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Doctor: update appointment status (scheduled, completed, etc)
exports.doctorUpdateAppointment = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};