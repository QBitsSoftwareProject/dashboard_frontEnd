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

// import image2 from "../../../assets/images/article/defaultImgs/img1.jpg";
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

export default function CreateArticle({ onArticleSubmit }) {
  const [file, setFile] = useState(null);
  //modal
  const [open, setOpen] = React.useState(false);
  const [paraToModel, setParaToModel] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (file) => {
    setFile(file);
  };

  const [showContent, setShowContent] = useState(true);

  const [articleTitle, setArticleTitle] = useState("");

  const [paragraphs, setParagraphs] = useState([
    {
      name: "paragraph 1",
      paragraph: "",
      image: {
        about: "",
        url: "",
      },
    },
  ]);

  const [article, setArticle] = useState({});

  function addParagraph() {
    setParagraphs([
      ...paragraphs,
      {
        name: "paragraph " + (paragraphs.length + 1),
        paragraph: "",
        image: {
          about: "",
          url: "",
        },
      },
    ]);
  }

  const submitArticle = () => {
    console.log(article);
    const newArticle = { title: articleTitle, paragraphs };
    setArticle(newArticle);
    if (onArticleSubmit) {
      onArticleSubmit(newArticle);
    }
    closeNav(); // Close the overlay after submitting the article
  };

  const emptyArticle = () => {
    closeNav();
  };

  const updateParagraph = (index, newValue) => {
    const updatedParagraphs = paragraphs.map((para, i) =>
      i === index ? { ...para, paragraph: newValue } : para
    );
    setParagraphs(updatedParagraphs);
  };

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

          {Object.keys(article).length === 0 ? (
            <>
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
            </>
          ) : (
            <>
              <h5
                style={{
                  color: "#2F79E9",
                  fontWeight: "bolder",
                  fontSize: "15px",
                }}
              >
                Edit Your Article
              </h5>
              <button className={styles.createArticleBtn} onClick={openNav}>
                UPDATE
              </button>
            </>
          )}
        </div>

        <div id="myNav" className={styles.overlay}>
          {/* <a
            href="javascript:void(0)"
            className={styles.closebtn}
            onClick={closeNav}
          >
            &times;
          </a> */}
          {showContent ? (
            <div className={styles.overlay_content}>
              <div className={styles.articleContent1}>
                <span>Article Title :</span>
                <input
                  id="articleTitle"
                  className={styles.articleInput1}
                  placeholder="Enter Article Title"
                  onChange={(event) => {
                    setArticleTitle(event.target.value);
                  }}
                />
                <br />
              </div>
              <div className={styles.articleContent2}>
                {paragraphs.map((para, index) => {
                  return (
                    <>
                      <div key={index} className={styles.paraWithImage}>
                        {/* paragraph */}
                        <div className={styles.articlePara}>
                          <span>Paragraph {index + 1} :</span>
                          <textarea
                            id="myTextarea"
                            className={styles.input_like}
                            value={para.paragraph}
                            onChange={(event) =>
                              updateParagraph(index, event.target.value)
                            }
                          />
                          <div className={styles.paraOptions}>
                            {index !== 0 || paragraphs.length > 1 ? (
                              <img
                                src={cross}
                                onClick={() => {
                                  const updatedParagraphs = paragraphs.filter(
                                    (paragraph, i) => i !== index
                                  );
                                  setParagraphs(updatedParagraphs);
                                }}
                              />
                            ) : null}
                            <img
                              src={image}
                              onClick={() => {
                                setParaToModel(para);
                                setOpen(true);
                              }}
                            />
                            <img src={add} onClick={addParagraph} />
                          </div>
                        </div>
                        {/* image */}
                        <div>
                          <img
                            id="paraImage"
                            className={styles.paraImage}
                            src={para.image.url}
                          />
                          <h5 style={{ marginTop: "0px" }}>
                            {para.image.about}
                          </h5>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className={styles.createArticleBtnSection}>
                <Button
                  variant="contained"
                  style={{
                    flex: 1,
                    height: "50px",
                    fontWeight: "bold",
                  }}
                  onClick={submitArticle}
                >
                  CREATE ARTICLE
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    flex: 1,
                    height: "50px",
                    fontWeight: "bold",
                    marginLeft: 20,
                  }}
                  color="warning"
                  onClick={emptyArticle}
                >
                  CLOSE ARTICLE
                </Button>
              </div>
              {/* modal */}
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
                        gap: 20,
                        marginTop: "20px",
                      }}
                    >
                      <TextField
                        style={{ flex: 4, height: "100%" }}
                        fullWidth
                        id="outlined-basic"
                        label="Say something about the image..."
                        variant="outlined"
                        onChange={(e) => {
                          paraToModel.image.about = e.target.value;
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            paraToModel.image.url = URL.createObjectURL(file);
                            handleClose();
                          }
                        }}
                      />
                      <Button
                        variant="contained"
                        style={{
                          flex: 1,
                          height: "50px",
                          fontWeight: "bold",
                        }}
                        onClick={() => {
                          paraToModel.image.url = URL.createObjectURL(file);
                          handleClose();
                        }}
                      >
                        SET IMAGE
                      </Button>
                    </div>
                  </Box>
                </Modal>
              </div>
              {/* modal */}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
