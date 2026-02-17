const express = require('express');
const router = express.Router();
const userC = require('../controllers/userC');

router.post('/register', userC.register);
router.post('/login', userC.login);

module.exports = router;