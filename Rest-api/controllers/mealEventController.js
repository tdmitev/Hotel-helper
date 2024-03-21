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
    const mealEventId = req.params.mealEventId;
    const { menuItemId } = req.body;

    mealEventModel.findByIdAndUpdate(
        mealEventId,
        { $addToSet: { menuItems: menuItemId } }, 
        { new: true, runValidators: true }
    ).populate('menuItems')
    .then(updatedEvent => {
        if (!updatedEvent) {
            return res.status(404).send({ message: "Meal event not found." });
        }
        res.status(200).json(updatedEvent);
    })
    .catch(next);
}

function removeMenuItemFromMealEvent(req, res, next) {
    const { mealEventId } = req.params;
    const { menuItemId } = req.body; 
    
    mealEventModel.findByIdAndUpdate(
        mealEventId,
        { $pull: { menuItems: menuItemId } },
        { new: true, runValidators: true }
    )
    .populate('menuItems') 
    .then(updatedEvent => {
        if (!updatedEvent) {
            return res.status(404).send({ message: "Meal event not found." });
        }
        res.status(200).json(updatedEvent);
    })
    .catch(error => {
        console.error("Failed to remove menuItem from mealEvent:", error);
        next(error);
    });
}

async function getSelectedMenuItemsForMealEvent(req, res, next) {
    const { mealEventId } = req.params;

    try {
        const mealEvent = await mealEventModel.findById(mealEventId).populate('menuItems');
        
        if (!mealEvent) {
            return res.status(404).send({ message: "Meal event not found." });
        }

        const selectedMenuItems = mealEvent.menuItems;

        res.status(200).json(selectedMenuItems);
    } catch (error) {
        console.error("Failed to get menu items for meal event:", error);
        next(error);
    }
}


module.exports = {
    createMealEvent,
    addMenuItemToMealEvent,
    removeMenuItemFromMealEvent,
    getSelectedMenuItemsForMealEvent
};