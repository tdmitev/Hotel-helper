const express = require('express');
const router = express.Router();
const { menuItemController } = require('../controllers');
const { auth } = require('../utils');

router.get('/', menuItemController.getAllMenuItems);
router.post('/add-menu-item', auth(), menuItemController.createMenuItem);
router.put('/:menuItemId', auth(), menuItemController.editMenuItem);
router.delete('/:menuItemId', auth(), menuItemController.deleteMenuItem);

module.exports = router;