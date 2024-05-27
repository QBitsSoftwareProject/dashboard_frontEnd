const mongoose = require("mongoose");

const schema = mongoose.Schema;

// the schema for paragraphs
const paragraphSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
  image: {
    about: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
  },
});

// the schema for articles
const articleSchema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    paragraphs: {
      type: [paragraphSchema],
      required: true,
    },
  },
  { timestamps: true } // createdAt and updatedAt fields
);

module.exports = mongoose.model("ArticleResource", articleSchema);
