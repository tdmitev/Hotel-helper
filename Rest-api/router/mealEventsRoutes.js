const express = require('express');
const router = express.Router();
const { mealEventController } = require('../controllers');
const { auth } = require('../utils');

router.post('/create-meal-event', auth(), mealEventController.createMealEvent);
// Допълнителни маршрути за управление на събития за хранене могат да бъдат добавени тук

module.exports = router;