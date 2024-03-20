const { menuItemsModel, userModel } = require('../models'); 

function createMenuItem(req, res, next) {
    const { name, image, description, category } = req.body;
    const userId = req.user._id; 

    menuItemsModel.create({ name, image, description, category })
        .then(createdItem => {
            return userModel.findByIdAndUpdate(userId, 
                { $push: { createdMenuItems: createdItem._id } },
                { new: true }
            ).then(() => {
                res.status(201).json(createdItem);
            });
        })
        .catch(next);
}

function getAllMenuItems(req, res, next) {
    menuItemsModel.find({})
        .then(items => res.status(200).json(items))
        .catch(next);
}

function editMenuItem(req, res, next) {
    const { menuItemId } = req.params;
    const updateData = req.body;

    menuItemsModel.findByIdAndUpdate(menuItemId, updateData, { new: true }) 
        .then(updatedItem => res.status(200).json(updatedItem))
        .catch(next);
}

function deleteMenuItem(req, res, next) {
    const { menuItemId } = req.params;

    menuItemsModel.findByIdAndDelete(menuItemId)
        .then(deletedItem => {
            if (!deletedItem) {
                return res.status(404).json({ message: 'MenuItem not found.' });
            }
        
            return userModel.updateMany(
                { createdMenuItems: menuItemId }, 
                { $pull: { createdMenuItems: menuItemId } }
            ).then(() => {
                res.status(200).json({ message: 'MenuItem deleted successfully.', deletedItem });
            });
        })
        .catch(next);
}

module.exports = {
    getAllMenuItems,
    createMenuItem,
    editMenuItem,
    deleteMenuItem
};