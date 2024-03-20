const { mealEventModel, menuItemModel, guestsModel } = require('../models');

async function createMealEvent(req, res, next) {
    const { date, mealType, menuItems } = req.body;

    try {
        // Изчисляване на общия брой гости в базата данни
        const totalGuestsCount = await guestsModel.countDocuments();

        // Създаване на ново събитие за хранене с автоматично попълнено поле totalGuests
        const createdEvent = await mealEventModel.create({
            date,
            mealType,
            guests: [],
            menuItems,
            totalGuests: totalGuestsCount, 
            attendedGuests: 0
        });

        res.status(201).json(createdEvent);
    } catch (error) {
        console.error("Failed to create meal event:", error);
        next(error);
    }
}

function addMenuItemToMealEvent(req, res, next) {
    const { mealEventId, menuItemId } = req.params;

    mealEventModel.findByIdAndUpdate(
        mealEventId,
        { $addToSet: { menuItems: menuItemId } }, 
        { new: true }
    ).populate('menuItems') 
    .then(updatedEvent => res.status(200).json(updatedEvent))
    .catch(next);
}

module.exports = {
    createMealEvent,
    addMenuItemToMealEvent,
};