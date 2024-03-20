const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [5, 'Name should be at least 3 characters'],
  },
  age: {
    type: Number,
    required: true,
  },
  tel: {
    type: String,
    required: true,
    minlength: [10, 'Phone number should be at least 10 characters'],
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other'],
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  stayPeriod: {
    from: {
      type: Date,
      required: true, 
    },
    to: {
      type: Date,
      required: true,
    },
  },
  view: {
    type: String,
    required: true,
    enum: ['sea', 'pool', 'garden', 'mountain'],
  },
  occupancyStatus: {
    type: String,
    required: true,
    enum: ['occupied', 'vacant', 'reserved'],
  }
});

module.exports = mongoose.model('Guest', guestSchema);