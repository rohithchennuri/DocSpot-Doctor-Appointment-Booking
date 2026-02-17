const express = require("express");
const router = express.Router();
const { bookAppointment } = require("../controllers/appointmentsController");
const auth = require("../middleware/auth");
const multer = require("multer");

// Configure Multer (basic memory storage)
const upload = multer({ storage: multer.memoryStorage() });

router.post("/book", auth, upload.array("documents"), bookAppointment);

module.exports = router;
