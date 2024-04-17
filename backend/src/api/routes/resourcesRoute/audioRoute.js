const express = require("express");

const {
  createAudio,
} = require("../../controllers/audioController/createAudio");

const {
  deleteAudio,
} = require("../../controllers/audioController/deleteAudio");

const {
  getAllAudios,
  getAnAudio,
} = require("../../controllers/audioController/getAllAudios");

const {
  updateAudio,
} = require("../../controllers/audioController/updateAudio");

const router = express.Router();

router.post("/", createAudio);  // create new audio
router.get("/", getAllAudios); // fetch all audios
router.get("/:id", getAnAudio); // fetch an audio 
router.delete("/:id", deleteAudio); // delete audio file
router.put("/:id", updateAudio); // update audio file

module.exports = router;
