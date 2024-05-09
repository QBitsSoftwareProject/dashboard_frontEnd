const express = require("express");

const {
    getAdmin,
    // getAdmin,
} = require("../../controllers/adminController/getAdmin");

const router = express.Router();

router.post("/", getAdmin); // get all videos

// router.get("/:id", getAdmin); // get a video

module.exports = router;