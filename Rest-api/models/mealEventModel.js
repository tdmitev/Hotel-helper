const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const mealEventSchema = new mongoose.Schema({
    date: Date,
    mealType: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner'],
    },
    guests: [{
      guestId: {
        type: ObjectId,
        ref: 'Guest'
      },
      attended: {
        type: Boolean,
        default: false,
      }
    }],
    menuItems: [{
      type: ObjectId,
      ref: 'MenuItems'
    }],
    totalGuests: {
      type: Number,
      default: 0,
    },
    attendedGuests: {
      type: Number,
      default: 0,
    }
  }, { timestamps: { createdAt: 'created_at' } });
  
  module.exports = mongoose.model('MealEvent', mealEventSchema);
