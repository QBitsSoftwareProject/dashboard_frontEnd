const video = require("../../models/videoResources/video");

// create new video file
exports.createVideo = async (req, res) => {
  try {
    
    const { title, duration, tags, ifWatch, watchCount,downloadURL } = req.body;
    
    const newVideo = new video({
      title,
      duration,
      tags,
      ifWatch,
      watchCount,
      downloadURL,
    });

    await newVideo.save();

    return res.status(201).json("video saved successfully");

  } catch (err) {

    return res.status(500).json({ errorMsg: "video save failed", error: err });
    
  }
};
