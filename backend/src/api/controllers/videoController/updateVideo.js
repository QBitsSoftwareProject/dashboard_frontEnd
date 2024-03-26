const video = require("../../models/videoResources/video");

// update video file
exports.updateVideo = async (req, res) => {
  try {
    const { title, duration, tags, ifWatch, watchCount,downloadURL } = req.body;

    const updatedImageDetails = {
      title,
      duration,
      tags,
      ifWatch,
      watchCount,
      downloadURL
    };

    const { id } = req.params;

    const updatedVideo = await video.findByIdAndUpdate(id, updatedImageDetails);

    if (!updatedVideo) {
      return res.status(404).json({ message: "video could not be found" });
    }

    return res.status(201).json(updatedVideo);

  } catch (err) {

    return res
      .status(500)
      .json({ errorMsg: "video update failed", error: err });
      
  }
};
