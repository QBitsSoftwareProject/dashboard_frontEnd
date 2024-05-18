import React, { useState } from "react";
import styles from "../createArticle.module.css";

// material ui modal,box,textfield
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";

import createArticle from "../../../assets/images/article/article.png";

import add from "../../../assets/images/article/add.png";
import cross from "../../../assets/images/article/cross.png";
import image from "../../../assets/images/article/image.png";

import image2 from "../../../assets/images/article/defaultImgs/img1.jpg";
import DropFileInput from "../dropFileInput/DropFileInput";
import Dash_btn3 from "../dash_btn/dash_btn3";

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
};

export default function CreateArticle() {
  const [file, setFile] = useState(null);
  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (file) => {
    setFile(file);
  };

  const [showContent, setShowContent] = useState(true);

  const [paragraphs, setParagraphs] = useState([
    {
      name: "paragraph 1",
      paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: {
        about: "",
        url: "",
      },
    },
  ]);

  function addParagraph() {
    setParagraphs([
      ...paragraphs,
      {
        name: "paragraph " + (paragraphs.length + 1),
        paragraph: "",
        image: "",
      },
    ]);
  }

  /* Open */
  const openNav = () => {
    document.getElementById("myNav").style.width = "100%";
    setShowContent(true);
  };

  /* Close */
  const closeNav = () => {
    setShowContent(false);
    document.getElementById("myNav").style.width = "0%";
  };

  return (
    <>
      <div className={styles.createArticleSection}>
        <div>
          <img src={createArticle} />
          <h5
            style={{
              color: "#2F79E9",
              fontWeight: "bolder",
              fontSize: "15px",
            }}
          >
            Create Custom Article
          </h5>

          <button className={styles.createArticleBtn} onClick={openNav}>
            CREATE
          </button>
        </div>

        <div id="myNav" className={styles.overlay}>
          <a
            href="javascript:void(0)"
            className={styles.closebtn}
            onClick={closeNav}
          >
            &times;
          </a>

          {showContent ? (
            <div className={styles.overlay_content}>
              <div className={styles.articleContent1}>
                <span>Article Title :</span>
                <input
                  className={styles.articleInput1}
                  placeholder="Enter Article Title"
                />
                <br />
              </div>
              <div className={styles.articleContent2}>
                {paragraphs.map((para, index) => {
                  return (
                    <>
                      <div className={styles.paraWithImage}>
                        {/* paragraph */}
                        <div className={styles.articlePara}>
                          <span>{para.name} :</span>
                          <textarea
                            id="myTextarea"
                            className={styles.input_like}
                            onChange={(event) => {
                              para.paragraph = event.target.value;
                            }}
                          >
                            {para.paragraph}
                          </textarea>
                          <div className={styles.paraOptions}>
                            {index !== 0 ? (
                              <img
                                src={cross}
                                onClick={() => {
                                  const updatedParagraphs = paragraphs.filter(
                                    (paragraph) => paragraph !== para
                                  );
                                  setParagraphs(updatedParagraphs);
                                }}
                              />
                            ) : null}
                            <img src={image} onClick={handleOpen} />
                            <img src={add} onClick={addParagraph} />
                          </div>
                        </div>
                        {/* image */}
                        <div>
                          <img
                            id="paraImage"
                            className={styles.paraImage}
                            src={image2}
                          />
                          <h5>This is an image of a forest</h5>
                        </div>
                      </div>
                      <div>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="parent-modal-title"
                          aria-describedby="parent-modal-description"
                        >
                          <Box sx={{ ...style, width: 600 }}>
                            <h2
                              id="parent-modal-title"
                              style={{ textAlign: "center", color: "#2f79e9" }}
                            >
                              Describe your paragraph with an image
                            </h2>
                            <DropFileInput onFileChange={handleFileChange} />
                            <div
                              style={{
                                display: "flex",
                                height: "fit-content",
                                alignItems: "center",
                                gap:20,
                                marginTop:"20px"
                              }}
                            >
                              <TextField
                                style={{ flex: 4, height: "100%" }}
                                fullWidth
                                id="outlined-basic"
                                label="Say something about the image..."
                                variant="outlined"
                              />
                              <Button
                                variant="contained"
                                style={{ flex: 1, height: "50px",fontWeight:"bold" }} 
                              >
                                SET IMAGE
                              </Button>
                            </div>
                          </Box>
                        </Modal>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
