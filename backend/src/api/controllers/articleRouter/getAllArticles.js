const article = require("../../models/articleResources/article");

// getting all articles
exports.getAllArticles = async (req, res) => {
  try {
    const allArticles = await article.find();

    if (!allArticles) {
      return res.status(404).json({ msg: "article not found" });
    }

    return res.status(201).json(allArticles);
  } catch (err) {
    return res.status(500).json({ errorMsg: "failed to fetch articles" });
  }
};

// getting article by id
exports.getAnArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const getArticle = await article.findById(id);

    if (!getArticle) {
      return res.status(404).json("article not found");
    }

    return res.status(201).json(getArticle);
  } catch (err) {
    return res
      .status(500)
      .json({ errorMsg: "failed to fetch article", error: err });
  }
};
