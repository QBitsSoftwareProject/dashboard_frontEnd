const express = require("express");

const {
    getAllAdmins,
    // getAdmin,
} = require("../../controllers/adminController/getAdmin");

const router = express.Router();

router.get("/", getAllAdmins); // get all videos

// router.get("/:id", getAdmin); // get a video

module.exports = router;