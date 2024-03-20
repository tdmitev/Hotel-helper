const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [5, 'Name should be at least 5 characters'],
    },
    image: {
        type: String,
        match: /^https?:\/\//,
        required:true
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'Description should be at least 10 characters'],
    },
    category: {
        type: String,
        required: true,
        minlength: [5, 'Category should be at least 5 characters'],
    },

}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('MenuItem', menuSchema);
