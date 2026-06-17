const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  available: {
    type: Boolean,
    default: true
  },

  // 👇 ADD THESE NEW FIELDS
  issuedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  issueDate: {
    type: Date,
    default: null
  },

  dueDate: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model("Book", bookSchema);