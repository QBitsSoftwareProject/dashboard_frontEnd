import styles from "../videoCard.module.css";

import playBtn from "../../../assets/images/icons/play.png";

import deleteBtn from "../../../assets/images/icons/delete.png";

import { useState } from "react";

import Swal from "sweetalert2";
import { Box, Modal } from "@mui/material";
import { deleteVideo } from "../../../services/adminServices/adminServices";

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

  const handleManageVideoPlayerClose = () => {
    setManageVideoPlayer(false);
  };

  const videoDeleter = async (videoId) => {
    modalClose();
    Swal.fire({
      title: "Are you sure you want to delete this video?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0066ff",
      cancelButtonColor: "rgb(0, 102, 255,0.5)",
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
      {/* audio player modal */}
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
