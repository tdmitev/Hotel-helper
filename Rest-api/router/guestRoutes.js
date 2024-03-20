const express = require('express');
const router = express.Router();
const { guestController } = require('../controllers');
const { auth } = require('../utils');

router.get('/', auth(), guestController.getAllGuests);
router.get('/room', guestController.getGuestsByRoom);
router.post('/import', auth(), guestController.importGuestsInDB);
router.post('/room/check-in', auth(), guestController.checkInGuest);
router.get('/statistics', auth(), guestController.guestStatistics);
router.get('/statistics/checked-in-guests', auth(), guestController.handleGuestStatistics);
router.post('/statistics/checked-in-guests/:guestId', auth(), guestController.undoCheckInGuest);

module.exports = router;