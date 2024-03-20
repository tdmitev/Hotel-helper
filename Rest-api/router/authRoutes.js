const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');

router.post('/login', authController.login);
router.post('/register', authController.register); 
router.post('/logout', authController.logout);

module.exports = router;