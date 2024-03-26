const audio = require("../../models/audioResources/audio");

// update audio file
exports.updateAudio = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, duration, tags, ifListen, listenCount, downloadURL } =
      req.body;
      
    const updatedAudioDetails = {
      title,
      duration,
      tags,
      ifListen,
      listenCount,
      downloadURL,
    };

    const updatedAudio = await audio.findByIdAndUpdate(id, updatedAudioDetails);

    if (!updatedAudio) {
      return res.status(404).json({ message: "audio could not be found" });
    }

    return res.status(201).json(updatedAudio);
  } catch (err) {
    return res
      .status(500)
      .json({ errorMsg: "audio update failed", error: err });
  }
};
