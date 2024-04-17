const audio = require("../../models/audioResources/audio");

// delete audio file
exports.deleteAudio = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAudio = await audio.findByIdAndDelete(id);

    if (!deletedAudio) {
      return res.status(404).json({ message: "audio could not be found" });
    }

    return res.status(201).json(deletedAudio);
  } catch (err) {
    return res
      .status(500)
      .json({ errorMsg: "failed to delete audio", error: err });
  }
};
