const article = require("../../models/articleResources/article");

//delete article
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArticle = await article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json("article could not be found");
    }

    return res.status(201).json(deletedArticle);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ errorMsg: "failed to delete article", error: err });
  }
};
