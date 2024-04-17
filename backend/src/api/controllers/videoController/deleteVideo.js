const video = require("../../models/videoResources/video");

// deleting video file by id
exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVideo = await video.findByIdAndDelete(id);

    if (!deletedVideo) {
      return res.status(404).json({ message: "video could not be found" });
    }

    return res.status(201).json(deletedVideo);
  } catch (error) {
    return res.status(500).json({
      errorMsg: "video deletion failed",
      error: err,
    });
  }
};
