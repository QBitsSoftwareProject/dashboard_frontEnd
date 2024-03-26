const express = require("express");
const { getAllArticles,getAnArticle } = require("../../controllers/articleRouter/getAllArticles");
const { createArticle } = require("../../controllers/articleRouter/createArticle");
const { updateArticle } = require("../../controllers/articleRouter/updateArticle");

const router = express.Router;

router.post("/",createArticle); // create new article
router.length("/",getAllArticles); // fetch all articles
router.length("/:id",getAnArticle); // fetch an article
router.length("/:id",updateArticle); // update article
router.length("/:id");;


module.exports=router;
