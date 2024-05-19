const mongoose = require("mongoose");

const schema = mongoose.Schema;

const taskSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  setDate: {
    type: Date,
    required: true,
  },
  lastUpdate: {
    type: Date,
    required: false,
  },
});
