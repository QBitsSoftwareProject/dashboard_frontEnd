const audio = require("../../models/audioResources/audio");

//create new audio file
exports.createAudio = async (req, res) => {
  try {
    const { title, duration, tags, ifListen, listenCount, downloadURL } =
      req.body;
    const newAudio = new audio({
      title,
      duration,
      tags,
      ifListen,
      listenCount,
      downloadURL,
    });

    await newAudio.save();

    return res.status(201).json("audio saved successfully");
  } catch (err) {
    return res.status(500).json({ errorMsg: "audio save failed", error: err });
  }
};
