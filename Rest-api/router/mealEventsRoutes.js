const express = require('express');
const router = express.Router();
const { mealEventController } = require('../controllers');
const { auth } = require('../utils');

router.get('/', auth(), mealEventController.getAllMealEvents);
router.post('/create-meal-event', auth(), mealEventController.createMealEvent);
router.post('/menu-items/add-menu-item', auth(), mealEventController.addMenuItemToMealEvent);
router.delete('/menu-items/:menuItemId', auth(), mealEventController.removeMenuItemFromMealEvent);
router.get('/menu-items', mealEventController.getSelectedMenuItemsForMealEvent);
router.post('/select/:mealEventId', auth(), mealEventController.selectMealEvent);
router.post('/deselect', auth(), mealEventController.deselectMealEvent);

module.exports = router;