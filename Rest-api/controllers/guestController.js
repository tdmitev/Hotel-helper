
 const fs = require('fs');
 const path = require('path');
 const { guestsModel } = require('../models');
 const { mealEventModel } = require('../models');

function getAllGuests(req, res, next) {
    guestsModel.find({})
        .then(guests => res.status(200).json(guests))
        .catch(next);
}

async function getGuestsByRoom (req, res, next) {
    const roomNumber = req.query.roomNumber;
    console.log("Търсене на гости в стая номер:", roomNumber);
  try {
    const guests = await guestsModel.find({ roomNumber: roomNumber });
    console.log("Намерени гости:", guests);
    res.json(guests);
  } catch (error) {
    next(error);
  }
  }

function importGuestsInDB(req, res) {
    const guests = req.body; 

    guestsModel.insertMany(guests)
        .then(() => res.status(200).send({ message: "Guests imported successfully." }))
        .catch(error => {
            console.error("Error importing guests:", error);
            res.status(500).send({ message: "Error importing guests.", error });
        });
}

async function checkInGuest (req, res, next) {
    const mealEventId = req.session.selectedMealEventId;
    const { guestId } = req.body; 
  
    try {
      const mealEvent = await mealEventModel.findById(mealEventId);
  
      if (!mealEvent) {
        return res.status(404).send({ message: "Meal event not found." });
      }
      if (!Array.isArray(mealEvent.guests)) {
        mealEvent.guests = []; 
      }
  
      const guestIndex = mealEvent.guests.findIndex(g => g.guestId.equals(guestId));
  
      if (guestIndex !== -1) {
        return res.status(400).send({ message: "Guest already checked in." });
      }
      mealEvent.guests.push({ guestId, attended: true });
      mealEvent.attendedGuests = (mealEvent.attendedGuests || 0) + 1;
  
      await mealEvent.save();
  
      res.status(200).send({ message: "Guest checked in successfully." });
    } catch (error) {
      console.error("Check-in guest failed:", error);
      next(error);
    }
  }

  async function undoCheckInGuest(req, res, next) {
    const mealEventId = req.session.selectedMealEventId;
    const { guestId } = req.body; 
  
    try {
      const mealEvent = await mealEventModel.findById(mealEventId);
  
      if (!mealEvent) {
        return res.status(404).send({ message: "Meal event not found." });
      }
  
      const guestIndex = mealEvent.guests.findIndex(g => g.guestId.equals(guestId) && g.attended);
  
      if (guestIndex === -1) {
        return res.status(404).send({ message: "Guest not found or not checked in." });
      }

      mealEvent.guests.splice(guestIndex, 1); 
      mealEvent.attendedGuests = mealEvent.guests.filter(g => g.attended).length; 
  
      await mealEvent.save();
  
      res.status(200).send({ message: "Check-in undone successfully." });
    } catch (error) {
      console.error("Undo check-in failed:", error);
      next(error);
    }
  }

  async function getAllCheckedInGuests(req, res, next) {
    try {
      const mealEventId = req.session.selectedMealEventId;
      if (!mealEventId) {
        return res.status(404).send({ message: "No meal event selected." });
      }
  
      const mealEvent = await mealEventModel.findById(mealEventId).populate('guests.guestId');
  
      if (!mealEvent) {
        return res.status(404).send({ message: "Meal event not found." });
      }
      const checkedInGuests = mealEvent.guests.filter(g => g.attended).map(g => g.guestId);
      res.status(200).json(checkedInGuests);
    } catch (error) {
      console.error("Error getting checked-in guests:", error);
      next(error);
    }
  }

  async function guestStatistics(req, res, next) {
    try {
      const mealEventId = req.session.selectedMealEventId;
      console.log("Searching for mealEventId:", mealEventId);

      if (!mealEventId) {
        return res.status(404).send({ message: "No meal event selected." });
      }

        const mealEvent = await mealEventModel.findById(mealEventId).populate('guests.guestId');

        console.log(mealEvent);
        const statistics = {
            totalGuests: mealEvent.totalGuests,
            attendedGuests: mealEvent.attendedGuests,
        };

        res.status(200).json(statistics);
    } catch (error) {
        console.error("Getting guest statistics failed:", error);
        next(error);
    }
}

async function findGuestByName(req, res, next) {
  const name = req.query.name; 
  try {
      const guests = await guestsModel.find({ name: { $regex: name, $options: 'i' } }); 
      if (guests.length === 0) {
          return res.status(404).send({ message: "No guests found with that name." });
      }
      res.status(200).json(guests);
  } catch (error) {
      console.error("Error finding guests by name:", error);
      next(error);
  }
}

async function handleGuestStatistics(req, res, next) {
  if (req.query.name) {
      findGuestByName(req, res, next);
  } else {
    getGuestsByRoom(req, res, next);
  }
}

module.exports = {
    getAllGuests,
    importGuestsInDB,
    checkInGuest,
    guestStatistics,
    getGuestsByRoom, 
    undoCheckInGuest,
    handleGuestStatistics
};