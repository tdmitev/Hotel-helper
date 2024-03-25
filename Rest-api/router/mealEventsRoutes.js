const express = require('express');
const router = express.Router();
const { mealEventController } = require('../controllers');
const { auth } = require('../utils');

router.get('/', auth(), mealEventController.getAllMealEvents);
router.post('/create-meal-event', auth(), mealEventController.createMealEvent);
router.post('/:mealEventId/menu-items/add-menu-item', auth(), mealEventController.addMenuItemToMealEvent);
router.delete('/:mealEventId/menu-items/:menuItemId', auth(), mealEventController.removeMenuItemFromMealEvent);
router.get('/:mealEventId/menu-items', mealEventController.getSelectedMenuItemsForMealEvent);

module.exports = router;