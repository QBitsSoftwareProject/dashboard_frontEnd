const article = require("../../models/articleResources/article");

//create new article
exports.createArticle = async (req, res) => {
  try {
    const { title, paragraphs } = req.body;
    const newArticle = new article({ title, paragraphs });
    await newArticle.save();
    
    return res.status(201).json("article saved successfully");
  } catch (err) {
    return res
      .status(500)
      .json({ errorMsg: "article save failed", error: err });
  }
};
