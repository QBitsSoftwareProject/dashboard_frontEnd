import styles from "../videoCard.module.css";

import playBtn from "../../../assets/images/icons/play.png";

import deleteBtn from "../../../assets/images/icons/delete.png";

import editBtn from "../../../assets/images/icons/edit.png";

import { useState } from "react";

import Swal from "sweetalert2";

import {
  Box,
  FormControl,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";

import {
  deleteVideo,
  editVideo,
} from "../../../services/adminServices/adminServices";

const VideoCard = ({ video, modalClose, actionStateFunction, actionState }) => {
  // modal styles
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "15px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    zIndex: 0,
  };

  const [manageVideoPlayer, setManageVideoPlayer] = useState(false);
  const [manageVideoEditor, setManageVideoEditor] = useState(false);

  const handleManageVideoPlayerClose = () => {
    setManageVideoPlayer(false);
  };

  const handleManageVideoEditorClose = () => {
    setManageVideoEditor(false);
  };

  const videoDeleter = async (videoId) => {
    modalClose();
    Swal.fire({
      title: "Are you sure you want to delete this video?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(0, 102, 255,0.5)",
      cancelButtonColor: "#0066ff",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteVideo(videoId);
          actionStateFunction(!actionState);
          Swal.fire({
            title: "Deleted!",
            text: "Video has been deleted.",
            icon: "success",
          });
        } catch (err) {
          console.log("error deleting video,error: ", err.message);
        }
      }
    });
  };

  const videoEditorModal = (video) => {
    setNewVideoTitle(video.title);
    setNewVideoCategory(video.tags[0]);
    setManageVideoEditor(true);
  };

  const videoEditor = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    if (newVideoTitle !== "" && newVideoCategory !== "") {
      const newVideoDetails = {
        title: newVideoTitle,
        tags: newVideoCategory,
      };
      console.log("video to edit:", video);
      console.log("new video details:", newVideoDetails);
      const response = await editVideo(video._id, newVideoDetails);
      if (response) {
        handleManageVideoEditorClose();
        actionStateFunction(!actionState);
        modalClose();
        Toast.fire({
          icon: "success",
          title: "Video details edited successfully",
        });
      }
    } else {
      handleManageVideoEditorClose();
      actionStateFunction(!actionState);
      modalClose();
      Swal.fire({
        icon: "error",
        title: "Failed to create edit video details",
        text: "Please complete the form to edit video details",
      });
    }
  };

  // video edit
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoCategory, setNewVideoCategory] = useState("");
  // video edit

  const handleVideoTitle = (event) => {
    setNewVideoTitle(event.target.value);
  };

  const handleVideoCategory = (event) => {
    setNewVideoCategory(event.target.value);
  };

  return (
    <>
      {/* video player modal */}
      <div>
        <Modal
          open={manageVideoPlayer}
          onClose={handleManageVideoPlayerClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box
            sx={{
              ...style,
              width: 600,
              paddingLeft: 5,
              paddingRight: 5,
              paddingTop: 3,
              paddingBottom: 3,
              height: "450px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className={styles.videoContainer}>
              <h4 style={{ textAlign: "center" }}>{video.title}</h4>
              <h5 style={{ textAlign: "center", color: "rgb(47, 121, 233)" }}>
                {video.tags}
              </h5>
              <video
                controls
                src={video.downloadURL}
                style={{
                  width: "600px",
                  outline: "none",
                  borderRadius: "20px",
                }}
              />
            </div>
          </Box>
        </Modal>
      </div>
      {/* video player modal */}

      {/* video details editor modal */}
      <Modal
        open={manageVideoEditor}
        onClose={handleManageVideoEditorClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 600,
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 3,
            paddingBottom: 3,
            flexDirection: "column",
            height: "350px",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              width: "100%",
            }}
          >
            <h4>Enter new video details</h4>
            <div
              style={{
                width: "100%",
                height: "fit-content",
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <label>Enter new video title</label>
              <TextField
                value={newVideoTitle}
                id="outlined-basic"
                variant="outlined"
                placeholder="Video title"
                fullWidth
                onChange={handleVideoTitle}
              />
            </div>
            <div
              style={{
                width: "100%",
                height: "fit-content",
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <label>Select new video Category</label>
              <FormControl fullWidth>
                <Select
                  value={newVideoCategory}
                  onChange={handleVideoCategory}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="meditation and mindfulness">
                    Meditation and mindfulness
                  </MenuItem>
                  <MenuItem value="physical exercise and yoga">
                    Physical exercises and yoga
                  </MenuItem>
                  <MenuItem value="nature and relaxation">
                    Nature and relaxation
                  </MenuItem>
                  <MenuItem value="positive affirmations and inspirational content">
                    Positive affirmations and inspirational content
                  </MenuItem>
                  <MenuItem value="music and sound therapy">
                    Music and sound therapy
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 30,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <button className={styles.editBtn} onClick={videoEditor}>
              Edit video
            </button>
            <button
              className={styles.cancelBtn}
              onClick={handleManageVideoEditorClose}
            >
              Cancel edit
            </button>
          </div>
        </Box>
      </Modal>
      {/* video details editor modal */}

      <div className={styles.videoCard}>
        {/* video title and category */}
        <div className={styles.VideotitleAndCategory}>
          <span style={{ fontSize: "18px" }}>{video.title}</span>
          <span
            style={{
              marginTop: "12px",
              fontSize: "14px",
              color: "rgb(47, 121, 233)",
              width: "fit-content",
            }}
          >
            {video.tags}
          </span>
        </div>
        {/* video title and category */}
        {/* actions */}
        <div className={styles.videoActions} style={{ width: "30%" }}>
          <div
            className={styles.actionBtn}
            onClick={() => {
              setManageVideoPlayer(true);
            }}
          >
            <img src={playBtn} style={{ width: "15px" }} />
          </div>
          <div
            className={styles.actionBtn}
            onClick={() => {
              videoEditorModal(video);
            }}
          >
            <img src={editBtn} style={{ width: "18px" }} />
          </div>
          <div
            className={styles.actionBtn}
            onClick={() => {
              videoDeleter(video._id);
            }}
          >
            <img src={deleteBtn} style={{ width: "15px" }} />
          </div>
        </div>
        {/* actions */}
      </div>
    </>
  );
};

export default VideoCard;
