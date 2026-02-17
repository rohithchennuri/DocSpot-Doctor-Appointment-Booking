const express = require('express');
const router = express.Router();
const doctorC = require('../controllers/doctorC');
const auth = require('../middlewares/authMiddleware');

// User applies as doctor
router.post('/apply', auth, doctorC.applyDoctor);

// Admin approves/rejects doctor
router.post('/approve', auth, doctorC.approveDoctor);
router.get('/pending', auth, doctorC.getPendingDoctors);
router.get('/', doctorC.getDoctors);

module.exports = router;