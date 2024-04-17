const mongoose = require("mongoose");

const schema = mongoose.Schema;

const videoSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    // required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  ifWatch: {
    type: Boolean,
  },
  watchCount: {
    type: Number,
    // required: true,
  },
  downloadURL:{
    type:String,
    // required:true,
  }
});

module.exports = mongoose.model("videoResources", videoSchema);
