const mongoose = require("mongoose");
const validator = require("validator");

// _id, title, description,timestamp

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title cannot be empty"],
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
