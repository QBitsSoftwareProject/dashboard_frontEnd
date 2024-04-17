const video = require("../../models/videoResources/video");

// get all video files
exports.getAllVideos = async (req, res) => {
  try {
    const allVideos = await video.find();

    if (!allVideos) {
      return res.status(404).json({ msg: "videos not found" });
    }

    return res.status(201).json(allVideos);
  } catch (err) {
    return res.status(500).json({ errorMsg: "failed to fetch videos", error: err });
  }
};

// get a video by id ----------------------------------------------------------------------------------------------------------------------------------------------------
exports.getAVideo = async (req, res) => {
  try {
    const { id } = req.params;
    
    const getVideo = await video.findById(id);

    if (!getVideo) {
      return res.status(404).json({ msg: "video not found" });
    }

    return res.status(201).json(getVideo);
  } catch (err) {
    return res.status(500).json({ errorMsg: "failed to fetch video", error: err });
  }
};
