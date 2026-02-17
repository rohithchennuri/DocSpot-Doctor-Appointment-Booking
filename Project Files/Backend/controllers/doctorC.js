const Doctor = require('../schemas/docModel');
const User = require('../schemas/userModel');

// Apply as Doctor (User Submits Form)
exports.applyDoctor = async (req, res) => {
  try {
    const { specialization, location, availableSlots } = req.body;
    const userId = req.user.id; // ✅ Set by auth middleware

    // Check if already applied or is already a doctor
    const existing = await Doctor.findOne({ userId });
    if (existing) return res.status(400).json({ message: "You have already applied or are already a doctor." });

    const doctor = new Doctor({
      userId,
      specialization,
      location,
      availableSlots,
      status: "approved" // ✅ Change to "pending" if you want manual admin approval
    });

    await doctor.save();

    // Update user role to doctor
    await User.findByIdAndUpdate(userId, {
      role: "doctor",
      isDoctorApproved: true // Optional: helps in access control
    });

    res.status(201).json({ message: "Doctor application successful", doctor });

  } catch (error) {
    console.error("Error in applyDoctor:", error);
    res.status(500).json({ error: error.message });
  }
};

// Admin: Approve or Reject Doctor
exports.approveDoctor = async (req, res) => {
  try {
    const { doctorId, status } = req.body; // status = "approved" or "rejected"

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { status },
      { new: true }
    );

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    if (status === "approved") {
      await User.findByIdAndUpdate(doctor.userId, { isDoctorApproved: true });
    }

    res.json({ message: `Doctor ${status}`, doctor });

  } catch (error) {
    console.error("Error in approveDoctor:", error);
    res.status(500).json({ error: error.message });
  }
};

// Admin: Get All Pending Applications
exports.getPendingDoctors = async (req, res) => {
  try {
    const pendingDoctors = await Doctor.find({ status: "pending" }).populate("userId", "name email");
    res.json(pendingDoctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Public/User: Get All Approved Doctors (with Filters)
exports.getDoctors = async (req, res) => {
  try {
    const { specialization, location } = req.query;
    let filter = { status: "approved" };

    if (specialization) {
      filter.specialization = new RegExp(specialization, "i"); // case-insensitive
    }
    if (location) {
      filter.location = new RegExp(location, "i");
    }

    const doctors = await Doctor.find(filter).populate("userId", "name email");
    res.json(doctors);
  } catch (error) {
    console.error("Error in getDoctors:", error);
    res.status(500).json({ error: error.message });
  }
};
