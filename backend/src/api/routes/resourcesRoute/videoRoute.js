const express = require("express");

const {
  createVideo,
} = require("../../controllers/videoController/createVideo");

const {
  getAllVideos,
  getAVideo,
} = require("../../controllers/videoController/getAllVideos");

const {
  deleteVideo,
} = require("../../controllers/videoController/deleteVideo");

const {
  updateVideo,
} = require("../../controllers/videoController/updateVideo");

const router = express.Router();

router.post("/", createVideo); // create video

router.get("/", getAllVideos); // get all videos

router.get("/:id", getAVideo); // get a video

router.put("/:id", updateVideo); // update video

router.delete("/:id", deleteVideo); // delete a video

module.exports = router;
