import React, { useEffect, useState } from "react";
import styles from "../createArticle.module.css";

// material ui modal,box,textfield
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Alert,
} from "@mui/material";

import createArticle from "../../../assets/images/article/article.png";

import add from "../../../assets/images/article/add.png";
import cross from "../../../assets/images/article/cross.png";
import image from "../../../assets/images/article/image.png";

import DropFileInput from "../dropFileInput/DropFileInput";

import { storage } from "../../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";

// linear progress for author registration
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
import { getAuthors, registerAuthor } from "../../../services/adminServices/adminServices";

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

  //new author register
  const [openAuthorRegister, setOpenAuthorRegister] = React.useState(false);
  const [newAuthorName, setNewAuthorName] = useState("");
  const [newAuthorProfileImg, setNewAuthorProfileImg] = useState(null);

  const [authorList, setAuthorList] = useState([]);

  const [loading, setLoading] = useState(false); // Loading state
  const [uploadFinished, setUploadFinished] = useState(false); //upload finish state
  const [uploadFailed, setUploadFailed] = useState(false); //upload failed state
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, openSnackBar } = state;

  const [resetFileInput, setResetFileInput] = useState(false); // State to track reset

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        let response;
        response = await getAuthors();
        if (response) {
          setAuthorList(response.data);
        } else {
          setAuthorList([]);
        }
      } catch (err) {
        console.log("error video fetch , error:" + err.message);
      }
    };
    fetchAuthors();
  }, [uploadFinished]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAuthorRegisterClose = () => {
    setOpenAuthorRegister(false);
  };

  const handleFileChange = (file) => {
    setFile(file);
  };

  const handleProfileImgChange = (file) => {
    setNewAuthorProfileImg(file);
  };

  const [showContent, setShowContent] = useState(true);

  const [articleTitle, setArticleTitle] = useState("");

  const [articleAuthor, setArticleAuthor] = useState("");

  const [paragraphs, setParagraphs] = useState([
    {
      name: "paragraph 1",
      paragraph: "",
      image: {
        about: "",
        url: "",
        file: null,
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
          file: null,
        },
      },
    ]);
  }

  const submitArticle = () => {
    const newArticle = {
      title: articleTitle,
      author: articleAuthor,
      paragraphs,
    };
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

  const registerNewAuthor = async () => {
    if (newAuthorName.trim() != "" && newAuthorProfileImg != null) {
      setLoading(true);
      const profileImageURL = await authorProfileImgUploader();
      const newAuthor = {
        name: newAuthorName,
        profileImgURL: profileImageURL,
      };
      try {
        await registerAuthor(newAuthor);
        setLoading(false);
        setUploadFinished(true);
        setNewAuthorName("");
        document.getElementById("authorName").value = "";
        setResetFileInput((prev) => !prev);
        handleAuthorRegisterClose();
      } catch (error) {
        alert("New author registration failed, error: " + error);
        setUploadFailed(true);
        setLoading(false);
      }
    }
  };

  // Firebase upload for article images
  const authorProfileImgUploader = async () => {
    try {
      if (newAuthorProfileImg) {
        let resourceFile;
        resourceFile = ref(storage, `resource/profileImgs/${v4()}`);
        await uploadBytes(resourceFile, newAuthorProfileImg);
        const newFileURL = await getDownloadURL(resourceFile);
        return newFileURL; // Return the URL
      } else {
        console.error("Author profile image not uploaded");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
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
          {showContent ? (
            <div className={styles.overlay_content}>
              <div className={styles.articleContent0}>
                <span style={{ marginLeft: -13 }}>Article Author :</span>
                <FormControl
                  style={{ width: "30%", marginLeft: 12 }}
                  size="small"
                >
                  <InputLabel
                    id="demo-select-small-label"
                    style={{ marginTop: 5 }}
                  >
                    Select Author
                  </InputLabel>
                  <Select
                    labelId="demo-select-large-label"
                    id="rCategory"
                    // value={category}
                    label="category"
                    style={{ height: "60px" }}
                    // onChange={handleCategoryChange}
                  >
                    {authorList.map((author) => {
                      return (
                        <MenuItem
                          value={author._id}
                          onClick={() => {
                            setArticleAuthor(author._id);
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              height: 40,
                            }}
                          >
                            <div
                              style={{
                                width: "10%",
                                height: 20,
                              }}
                            >
                              <Avatar
                                alt="Remy Sharp"
                                src={author.profileImg}
                              />
                            </div>
                            <div
                              style={{
                                width: "90%",
                                display: "flex",
                                alignItems: "center",
                                marginLeft: 20,
                              }}
                            >
                              {author.name}
                            </div>
                          </div>
                        </MenuItem>
                      );
                    })}
                    <MenuItem>
                      <div
                        style={{
                          backgroundColor: "#2f79e9",
                          width: "95%",
                          textAlign: "center",
                          paddingTop: 10,
                          paddingBottom: 10,
                          color: "white",
                          borderRadius: 10,
                          marginLeft: "auto",
                          marginRight: "auto",
                          marginTop: 10,
                          marginBottom: 6,
                          cursor: "pointer",
                          fontWeight: "500",
                        }}
                        onClick={() => {
                          setOpenAuthorRegister(true);
                        }}
                      >
                        Register new author
                      </div>
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={styles.articleContent1}>
                <span>Article Title :</span>
                <input
                  style={{ marginLeft: "10.8px" }}
                  id="articleTitle"
                  className={styles.articleInput1}
                  placeholder="Enter Article Title ..."
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
              <div
                className={styles.createArticleBtnSection}
                style={{ marginTop: -50 }}
              >
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

              {uploadFinished && (
                <Snackbar
                  // anchorOrigin={{ vertical, horizontal }}
                  open={uploadFinished}
                  autoHideDuration={5000}
                  onClose={() => {
                    setUploadFinished(false);
                  }}
                >
                  <Alert
                    onClose={() => {
                      setUploadFinished(false);
                    }}
                    severity="info"
                    variant="filled"
                    sx={{
                      width: "100%",
                      color: "white",
                    }}
                  >
                    Author Registered successfully
                  </Alert>
                </Snackbar>
              )}
              {uploadFailed && (
                <Snackbar
                  open={uploadFailed}
                  autoHideDuration={6000}
                  onClose={() => setUploadFailed(false)}
                >
                  <Alert
                    severity="error"
                    onClose={() => setUploadFailed(false)}
                  >
                    Author registration failed, Please try again
                  </Alert>
                </Snackbar>
              )}

              {/* modals */}

              {/* modal for registering new author */}
              <Modal
                open={openAuthorRegister}
                onClose={handleAuthorRegisterClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box sx={{ ...style, width: 600, height: "auto" }}>
                  {loading && (
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress />
                    </Box>
                  )}
                  <div>
                    <h4 style={{ textAlign: "center" }}>
                      Author Profile Image
                    </h4>
                    <DropFileInput
                      onFileChange={handleProfileImgChange}
                      ifProfileImg={true}
                      reset={resetFileInput}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 50,
                      gap: 20,
                    }}
                  >
                    <TextField
                      style={{ flex: 4, height: "100%" }}
                      fullWidth
                      id="authorName"
                      label="Enter new author's name"
                      variant="outlined"
                      onChange={(e) => {
                        setNewAuthorName(e.target.value);
                      }}
                      onKeyDown={async (e) => {
                        if (
                          e.key === "Enter" &&
                          newAuthorName.trim() !== "" &&
                          newAuthorProfileImg != null
                        ) {
                          await registerNewAuthor();
                          handleAuthorRegisterClose();
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
                      onClick={registerNewAuthor}
                    >
                      Register
                    </Button>
                  </div>
                </Box>
              </Modal>

              {/* modal for registering new author */}

              {/* modal for image upload for paragraph */}
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
                    <DropFileInput
                      isReset={false}
                      onFileChange={handleFileChange}
                      ifProfileImg={false}
                    />
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
                            paraToModel.image.file = file;
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
                          paraToModel.image.file = file;
                          handleClose();
                        }}
                      >
                        SET IMAGE
                      </Button>
                    </div>
                  </Box>
                </Modal>
              </div>
              {/* modal for image upload for paragraph */}
              {/* modals */}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
