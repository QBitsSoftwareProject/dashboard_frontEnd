const article = require("../../models/articleResources/article");

//update article details
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, downloadURL } = req.body;
    const updatedArticleDetails = {
      title,
      downloadURL,
    };

    const updatedArticle = await article.findByIdAndUpdate(
      id,
      updatedArticleDetails
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "article could not updated" });
    }

    return res.status(201).json(updatedArticle);
  } catch (err) {
    return res
      .status(500)
      .json({ errorMsg: "article update failed", error: err });
  }
};
