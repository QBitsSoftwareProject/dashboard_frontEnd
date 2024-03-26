const audio = require("../../models/audioResources/audio");

// getting all audios
exports.getAllAudios = async (req, res) => {
  try {
    const allAudios = await audio.find();

    if (!allAudios) {
      return res.status(404).json({ msg: "audio not found" });
    }

    return res.status(201).json(allAudios);
  } catch (err) {
    return res.status(500).json({ errorMsg: "failed to fetch audios", error: err });
  }
};

//get audio by id ---------------------------------------------------------------------------------------------------------------------------------------------------------
exports.getAnAudio = async (req, res) => {
  try {
    const { id } = req.params;
    const getAudio = await audio.findById(id);

    if (!getAudio) {
      return res.status(404).json({ msg: "audio not found" });
    }

    return res.status(201).json(getAudio);

  } catch (err) {
    return res.status(500).json({errorMsg:"failed to fetch audio",error:err});
  }
};
