const mongoose = require("mongoose");

const waitlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  signupDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Waitlist", waitlistSchema);
