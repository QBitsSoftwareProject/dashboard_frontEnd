const mongoose = require("mongoose");

const schema = mongoose.Schema;

const articleSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  downloadURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("articleResources", articleSchema);
