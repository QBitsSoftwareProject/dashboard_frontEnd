import styles from "../audioCard.module.css";

import playBtn from "../../../assets/images/icons/play.png";

import editBtn from "../../../assets/images/icons/edit.png";

import deleteBtn from "../../../assets/images/icons/delete.png";

import cancelIcon from "../../../assets/images/dragAndDrop/cancel.png";

import { useState } from "react";

import Swal from "sweetalert2";
import { Box, Grid, Modal, TextField } from "@mui/material";
import {
  deleteAudio,
  editAudio,
} from "../../../services/adminServices/adminServices";

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
  const [manageAudioEditor, setManageAudioEditor] = useState(false);

  const handleManageAudioPlayerClose = () => {
    setManageAudioPlayer(false);
  };

  const handleManageAudioEditorClose = () => {
    setManageAudioEditor(false);
  };

  // audio edit
  const [newAudioTitle, setNewAudioTitle] = useState("");
  const [newAudioTags, setNewAudioTags] = useState([]);
  const [tag, setTag] = useState("");
  // audio edit

  const audioEditorModal = (audio) => {
    setNewAudioTitle(audio.title);
    setNewAudioTags(audio.tags);
    setManageAudioEditor(true);
  };

  const audioDeleter = async (audioId) => {
    modalClose();
    Swal.fire({
      title: "Are you sure you want to delete this audio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(0, 102, 255,0.5)",
      cancelButtonColor: "#0066ff",
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

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const audioEditor = async () => {
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
    if (newAudioTitle !== "" && newAudioTags.length !== 0) {
      const newAudioDetails = {
        title: newAudioTitle,
        tags: newAudioTags,
      };
      console.log("audio to edit:", audio);
      console.log("new audio details:", newAudioDetails);
      const response = await editAudio(audio._id, newAudioDetails);
      if (response) {
        handleManageAudioEditorClose();
        actionStateFunction(!actionState);
        modalClose();
        Toast.fire({
          icon: "success",
          title: "Audio details edited successfully",
        });
      }
    } else {
      handleManageAudioEditorClose();
      actionStateFunction(!actionState);
      modalClose();
      Swal.fire({
        icon: "error",
        title: "Failed to create edit audio details",
        text: "Please complete the form to edit audio details",
      });
    }
  };

  const handleAudioTitle = (event) => {
    setNewAudioTitle(event.target.value);
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
                              marginTop: "25px",
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

      {/* audio editor modal */}
      <div>
        <Modal
          open={manageAudioEditor}
          onClose={handleManageAudioEditorClose}
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
              height: "fit-content",
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
              <h4>Enter new audio details</h4>
              <div
                style={{
                  width: "100%",
                  height: "fit-content",
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <label>Enter new audio title</label>
                <TextField
                  value={newAudioTitle}
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Video title"
                  fullWidth
                  onChange={handleAudioTitle}
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
                <label>Enter audio tags</label>
                {/* audio tags */}
                <Grid item xs={12} style={{ paddingRight: "20px" }}>
                  <div className={styles.tagsContainer}>
                    <div className={styles.tagDisplay}>
                      {newAudioTags.map((tag, index) => (
                        <div className={styles.tag} key={index}>
                          {tag}
                          <img
                            src={cancelIcon}
                            style={{ width: "15px", cursor: "pointer" }}
                            onClick={() => {
                              const updatedTags = newAudioTags.filter(
                                (item) => item !== tag
                              );
                              setNewAudioTags(updatedTags);
                            }}
                          />
                        </div>
                      ))}
                      <div className={styles.tagInput}>
                        <input
                          id="tgIn"
                          className={styles.tgIn}
                          placeholder="Enter resource tags"
                          onChange={handleTagChange}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              if (
                                !newAudioTags.includes(
                                  tag.trim().toLowerCase()
                                ) &&
                                tag.trim().length !== 0
                              ) {
                                setNewAudioTags([
                                  ...newAudioTags,
                                  tag.toLowerCase(),
                                ]);
                              }
                              document.getElementById("tgIn").value = "";
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Grid>
                {/* audio tags */}
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
              <button className={styles.editBtn} onClick={audioEditor}>
                Edit audio
              </button>
              <button
                className={styles.cancelBtn}
                onClick={handleManageAudioEditorClose}
              >
                Cancel edit
              </button>
            </div>
          </Box>
        </Modal>
      </div>
      {/* audio editor modal */}

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
              audioEditorModal(audio);
            }}
          >
            <img src={editBtn} style={{ width: "18px" }} />
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
