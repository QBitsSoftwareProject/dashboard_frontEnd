const mongoose = require("mongoose");

const schema = mongoose.Schema;

const audioSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  ifListen: {
    type: Boolean,
  },
  listenCount: {
    type: Number,
    // required: true,
  },
  downloadURL: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("audioResources", audioSchema);
