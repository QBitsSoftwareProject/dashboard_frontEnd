const express = require("express");

const { getAllArticles,getAnArticle } = require("../../controllers/articleRouter/getAllArticles");
const { createArticle } = require("../../controllers/articleRouter/createArticle");
const { updateArticle } = require("../../controllers/articleRouter/updateArticle");
const { deleteArticle } = require("../../controllers/articleRouter/deleteArticle");

const router = express.Router();

router.post("/",createArticle); // create new article
router.get("/",getAllArticles); // fetch all articles
router.get("/:id",getAnArticle); // fetch an article
router.put("/:id",updateArticle); // update article
router.delete("/:id",deleteArticle); // delete article

module.exports=router;
