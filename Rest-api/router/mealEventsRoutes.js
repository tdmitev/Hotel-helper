const express = require('express');
const router = express.Router();
const { mealEventController } = require('../controllers');
const { auth } = require('../utils');

router.post('/create-meal-event', auth(), mealEventController.createMealEvent);
router.get('/:mealEventId/menu-items', mealEventController.getSelectedMenuItemsForMealEvent);

module.exports = router;