const express = require('express');
const router = express.Router();
const { register, login, me } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protect, me);

module.exports = router;