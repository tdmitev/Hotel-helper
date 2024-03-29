const { mealEventModel, menuItemModel, guestsModel } = require('../models');

async function createMealEvent(req, res, next) {
    const { date, mealType, menuItems } = req.body;

    try {
        const totalGuestsCount = await guestsModel.countDocuments();

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

async function deleteMealEvent(req, res, next) {
    const { mealEventId } = req.params;

    try {
        const deletedEvent = await mealEventModel.findByIdAndDelete(mealEventId);

        if (!deletedEvent) {
            return res.status(404).send({ message: "Meal event not found." });
        }

        res.status(200).json(deletedEvent);
    } catch (error) {
        console.error("Failed to delete meal event:", error);
        next(error);
    }
}

async function getMealEventById(mealEventId) {
    try {
        const mealEvent = await mealEventModel.findById(mealEventId);
        return mealEvent;
    } catch (error) {
        console.error("Error fetching meal event by ID:", error);
        throw error; 
    }
}

async function selectMealEvent (req, res, next) {
    const { mealEventId } = req.params;
    try {
        const mealEvent = await getMealEventById(mealEventId);
        if (!mealEvent) {
            return res.status(404).json({ message: "Meal event not found." });
        }
        req.session.selectedMealEventId = mealEventId; 
        res.json({ message: "Meal event selected successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error selecting meal event." });
    }
};

async function deselectMealEvent(req, res, next) {
    if (!req.session.selectedMealEventId) {
        return res.status(400).json({ message: "No meal event is currently selected." });
    }

    delete req.session.selectedMealEventId;

    res.json({ message: "Meal event deselected successfully." });
}

async function getAllMealEvents (req, res, next) {
    try {
        const mealEvents = await mealEventModel.find({});
        res.json(mealEvents);
    } catch (error) {
        next(error);
    }
};

function addMenuItemToMealEvent(req, res, next) {

    const mealEventId = req.session.selectedMealEventId;
    const { menuItemId } = req.body;

    if (!mealEventId) {
        return res.status(400).send({ message: "No meal event selected." });
    }

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
    const mealEventId = req.session.selectedMealEventId;
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
    const mealEventId = req.session.selectedMealEventId;

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
    getSelectedMenuItemsForMealEvent,
    getAllMealEvents,
    selectMealEvent,
    deselectMealEvent,
    deleteMealEvent
};