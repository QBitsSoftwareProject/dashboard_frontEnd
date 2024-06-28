import styles from "../audioCard.module.css";

import playBtn from "../../../assets/images/icons/play.png";

import deleteBtn from "../../../assets/images/icons/delete.png";

import { useState } from "react";

import Swal from "sweetalert2";
import { Box, Modal } from "@mui/material";
import { deleteAudio } from "../../../services/adminServices/adminServices";

const AudioCard = ({ audio, modalClose, actionStateFunction, actionState }) => {
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

  const [manageAudioPlayer, setManageAudioPlayer] = useState(false);

  const handleManageAudioPlayerClose = () => {
    setManageAudioPlayer(false);
  };

  const audioDeleter = async (audioId) => {
    modalClose();
    Swal.fire({
      title: "Are you sure you want to delete this audio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0066ff",
      cancelButtonColor: "rgb(0, 102, 255,0.5)",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteAudio(audioId);
          actionStateFunction(!actionState);
          Swal.fire({
            title: "Deleted!",
            text: "Audio has been deleted.",
            icon: "success",
          });
        } catch (err) {
          console.log("error deleting audio,error: ", err.message);
        }
      }
    });
  };

  return (
    <>
      {/* audio player modal */}
      <div>
        <Modal
          open={manageAudioPlayer}
          onClose={handleManageAudioPlayerClose}
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
              height: "250px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h4>{audio.title}</h4>
              <audio
                controls
                src={audio.downloadURL}
                style={{ width: "100%" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {audio.tags
                  ? audio.tags.map((tag) => {
                      return (
                        <>
                          <span
                            style={{
                              marginTop:"25px",
                              fontSize: "14px",
                              color: "rgb(47, 121, 233)",
                              width: "fit-content",
                              marginRight: "10px",
                              paddingLeft: "15px",
                              paddingRight: "15px",
                            }}
                          >
                            {tag + " "}
                          </span>
                        </>
                      );
                    })
                  : null}
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      {/* audio player modal */}
      <div className={styles.audioCard}>
        {/* audio title and category */}
        <div className={styles.audioTitleAndCategory}>
          <span style={{ fontSize: "18px" }}>{audio.title}</span>
          <div>
            {audio.tags
              ? audio.tags.map((tag) => {
                  return (
                    <>
                      <span
                        style={{
                          marginTop: "12px",
                          fontSize: "14px",
                          color: "rgb(47, 121, 233)",
                          width: "fit-content",
                          marginRight: "10px",
                          padding: "15px",
                        }}
                      >
                        {tag + " "}
                      </span>
                    </>
                  );
                })
              : null}
          </div>
        </div>
        {/* audio title and category */}
        {/* actions */}
        <div className={styles.audioActions} style={{ width: "30%" }}>
          <div
            className={styles.actionBtn}
            onClick={() => {
              setManageAudioPlayer(true);
            }}
          >
            <img src={playBtn} style={{ width: "15px" }} />
          </div>
          <div
            className={styles.actionBtn}
            onClick={() => {
              audioDeleter(audio._id);
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

export default AudioCard;
