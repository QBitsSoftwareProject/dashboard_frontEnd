import React, { useEffect, useRef, useState } from "react";
import styles from "../resource-management/resource-management.module.css";
import Dash_btn1 from "../../components/ui/dash_btn/dash_btn1";
import Dash_btn2 from "../../components/ui/dash_btn/dash_btn2";
import {
  Alert,
  Avatar,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import cancelIcon from "../../assets/images/dragAndDrop/cancel.png";
import DropFileInput from "../../components/ui/dropFileInput/DropFileInput";
import CreateArticle from "../../components/ui/createArticle/CreateArticle";
import { storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Box from "@mui/material/Box";

//loading animation
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";

import {
  createAudioResource,
  createNewArticle,
  createVideoResource,
  getAllArticles,
  getAllAudios,
  getAllVideos,
} from "../../services/adminServices/adminServices";
import AuthorCard from "../../components/ui/authorCard/authorCard";
import VideoCard from "../../components/ui/videoCard/videoCard";
import AudioCard from "../../components/ui/audioCard/audioCard";

const ResourceManagement = () => {
  const [isCancel, setIsCancel] = useState(false);
  const [isArticle, setIsArticle] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

  const [actionState, setActionState] = useState(false);

  // Resource features
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [article, setArticle] = useState({});

  const [loading, setLoading] = useState(false); // Loading state
  const [uploadFinished, setUploadFinished] = useState(false); //upload finish state
  const [uploadFailed, setUploadFailed] = useState(false); //upload failed state

  // Video features
  const [ifWatch, setIfWatch] = useState(false);
  const [watchCount, setWatchCount] = useState(0);

  // Audio features
  const [ifListen, setIfListen] = useState(false);
  const [listenCount, setListenCount] = useState(0);

  const [manageResources, setManageResources] = useState(false);

  const [resetFileInput, setResetFileInput] = useState(false); // State to track reset

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  //finish uploading
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setUploadFinished(false);
  };
  //finish uploading

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setIsArticle(false);
    setIsAudio(false);
    setIsVideo(false);
    setFileType("");

    if (event.target.value === "pdf") {
      setIsArticle(true);
      setFileType("article");
    } else if (event.target.value === "video") {
      setIsVideo(true);
      setFileType("video");
    } else if (event.target.value === "audio") {
      setIsAudio(true);
      setFileType("audio");
    }
  };

  const handleFileChange = (file) => {
    setFile(file);
  };

  // Function to reset all state values
  const resetForm = () => {
    setTitle("");
    setTag("");
    setTags([]);
    setCategory("");
    setFile(null);
    setFileType("");
    setArticle({});
    setIsCancel(false);
    setResetFileInput((prev) => !prev);
  };

  // Add the article data to state
  const addArticleToResource = (articleData) => {
    setArticle(articleData);
  };

  // Firebase video and audio upload
  const firebaseUpload = async (fileType) => {
    try {
      if (file) {
        let resourceFile;
        if (fileType === "audio") {
          resourceFile = ref(storage, `resource/audio/${v4()}`);
        } else if (fileType === "video") {
          resourceFile = ref(storage, `resource/video/${v4()}`);
        }
        await uploadBytes(resourceFile, file);
        const newFileURL = await getDownloadURL(resourceFile);
        return newFileURL; // Return the URL
      } else {
        console.error("File not uploaded");
        return null;
      }
    } catch (error) {
      console.error("Error uploading resource:", error);
      return null;
    }
  };

  //firebase video thumbnail upload
  const firebaseUploadThumbnail = async (thumbnailBlob) => {
    try {
      let resourceFile = ref(storage, `resource/video-thumbnails/${v4()}`);
      await uploadBytes(resourceFile, thumbnailBlob);
      const newFileURL = await getDownloadURL(resourceFile);
      return newFileURL; // Return the URL
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      return null;
    }
  };

  // Firebase upload for article images
  const articleParagraphImage_firebaseUpload = async (articleImage) => {
    try {
      if (articleImage) {
        let resourceFile;
        resourceFile = ref(storage, `resource/images/${v4()}`);
        await uploadBytes(resourceFile, articleImage);
        const newFileURL = await getDownloadURL(resourceFile);
        return newFileURL; // Return the URL
      } else {
        console.error("Article image not uploaded");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // Get video duration
  const getVideoDuration = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src);
        const durationInSeconds = video.duration;
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        resolve(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  // Get audio duration
  const getAudioDuration = (file) => {
    return new Promise((resolve) => {
      const audio = document.createElement("audio");
      audio.preload = "metadata";
      audio.onloadedmetadata = function () {
        window.URL.revokeObjectURL(audio.src);
        const durationInSeconds = audio.duration;
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        resolve(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      };
      audio.src = URL.createObjectURL(file);
    });
  };

  // Function to capture a frame from the video
  function captureThumbnail(file) {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      video.preload = "metadata";
      video.src = URL.createObjectURL(file);

      video.onloadedmetadata = () => {
        if (video.duration != NaN) {
          video.currentTime = video.duration / 2; // Capture the thumbnail at 2 seconds
        }
      };

      video.onseeked = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg");
      };

      video.onerror = (event) => {
        reject(event);
      };
    });
  }

  // Upload the resource to the server
  const uploadResource = async () => {
    setLoading(true); // Start loading
    let resourceURL = null;
    if (isArticle) {
      if (article.title && article.paragraphs.length > 0) {
        const { title, author, paragraphs } = article;
        const articleResource = { title, author, paragraphs, tags };

        // upload paragraph images to firebase and get urls
        const imageUploadPromises = paragraphs.map(async (item) => {
          if (item.image) {
            const imageURL = await articleParagraphImage_firebaseUpload(
              item.image.file
            );
            return { ...item, image: { ...item.image, url: imageURL } };
          }
          return item;
        });

        // Wait for all image uploads to complete
        articleResource.paragraphs = await Promise.all(imageUploadPromises);

        // send article model to mongoDB
        try {
          console.log("Uploading article:", articleResource);
          await createNewArticle(articleResource);
          setUploadFinished(true);
          setActionState(!actionState);
          resetForm();
        } catch (error) {
          setUploadFailed(true); // Set upload failed state
        }
      } else {
        alert("Please create your custom article.");
      }
    } else if (file) {
      if (file.size > 100 * 1024 * 1024) {
        // 100MB in bytes
        setUploadFailed(true); // Set upload failed state
        setLoading(false); // Stop loading
        return; // Stop further execution
      } else {
        if (file.type.startsWith("video") && category === "video") {
          const duration = await getVideoDuration(file); // get video duration
          resourceURL = await firebaseUpload("video");
          if (resourceURL) {
            try {
              const thumbnailBlob = await captureThumbnail(file);
              const thumbnailURL = await firebaseUploadThumbnail(thumbnailBlob);
              const videoResource = {
                title,
                duration: duration,
                tags,
                ifWatch,
                watchCount,
                downloadURL: resourceURL,
                thumbnailURL: thumbnailURL,
              };
              await createVideoResource(videoResource);
              setUploadFinished(true);
              setActionState(!actionState);
              resetForm();
            } catch (error) {
              setUploadFailed(true); // Set upload failed state
              alert("Failed to upload Video, error: " + error);
            }
          }
        } else if (file.type.startsWith("audio") && category === "audio") {
          const duration = await getAudioDuration(file); // get audio duration
          resourceURL = await firebaseUpload("audio");
          if (resourceURL) {
            const audioResource = {
              title,
              duration: duration, // Convert duration to string
              tags,
              ifListen,
              listenCount,
              downloadURL: resourceURL,
            };
            try {
              console.log("Uploading audio:", audioResource);
              await createAudioResource(audioResource);
              setActionState(!actionState);
              setUploadFinished(true);
              resetForm();
            } catch (error) {
              setUploadFailed(true); // Set upload failed state
              alert("Failed to upload Audio, error: " + error);
            }
          }
        } else {
          alert("Please select a valid file to upload.");
        }
      }
    } else {
      alert("Please select a file or create an article to upload.");
    }
    setLoading(false); // Stop loading
  };

  const handleManageResourcesClose = () => {
    setManageResources(false);
  };

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

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // modal styles

  // fetch resources

  // mounts
  const hasVideoMounted = useRef(false); // Create a ref to track the initial mount
  const hasAudioMounted = useRef(false); // Create a ref to track the initial mount
  const hasArticleMounted = useRef(false); // Create a ref to track the initial mount
  // mounts

  // 1. articles
  const [articleList, setArticleList] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let response = await getAllArticles();
        if (response) {
          setArticleList(response.data);
        }
      } catch (err) {
        console.log("error fetching articles,error: ", err.message);
      }
    };
    if (hasArticleMounted.current) {
      fetchArticles();
    } else {
      hasArticleMounted.current = true;
    }
  }, [actionState]);

  const fetchArticles = async () => {
    try {
      let response = await getAllArticles();
      if (response) {
        setArticleList(response.data);
      }
    } catch (err) {
      console.log("error fetching articles,error: ", err.message);
    }
  };

  // 2.videos
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let response = await getAllVideos();
        if (response) {
          setVideoList(response.data);
        }
      } catch (err) {
        console.log("error fetching videos,error: ", err.message);
      }
    };
    if (hasVideoMounted.current) {
      fetchVideos();
    } else {
      hasVideoMounted.current = true;
    }
    fetchVideos();
  }, [actionState]);

  const fetchVideos = async () => {
    try {
      let response = await getAllVideos();
      if (response) {
        setVideoList(response.data);
      }
    } catch (err) {
      console.log("error fetching videos,error: ", err.message);
    }
  };

  // 3.audios
  const [audioList, setAudioList] = useState([]);
  useEffect(() => {
    const fetchAudios = async () => {
      try {
        let response = await getAllAudios();
        if (response) {
          setAudioList(response.data);
        }
      } catch (err) {
        console.log("error fetching audios,error: ", err.message);
      }
    };
    if (hasAudioMounted.current) {
      fetchAudios();
    } else {
      hasAudioMounted.current = true;
    }
  }, [actionState]);

  const fetchAudios = async () => {
    try {
      let response = await getAllAudios();
      if (response) {
        setAudioList(response.data);
      }
    } catch (err) {
      console.log("error fetching audios,error: ", err.message);
    }
  };

  // fetch resources

  return (
    <>
      {/* manage resources modal */}
      <div>
        <Modal
          open={manageResources}
          onClose={handleManageResourcesClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box
            sx={{
              ...style,
              width: 900,
              paddingLeft: 5,
              paddingRight: 5,
              paddingTop: 3,
              paddingBottom: 3,
              height: "700px",
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label="ARTICLES"
                  onClick={() => {
                    fetchArticles();
                  }}
                  {...a11yProps(0)}
                />
                <Tab
                  label="VIDEOS"
                  onClick={() => {
                    fetchVideos();
                  }}
                  {...a11yProps(1)}
                />
                <Tab
                  label="AUDIOS"
                  onClick={() => {
                    fetchAudios();
                  }}
                  {...a11yProps(2)}
                />
              </Tabs>
            </Box>

            {/* article section */}
            <CustomTabPanel value={value} index={0}>
              <div className={styles.articleCardContainer}>
                {articleList
                  ? articleList.map((articleObj, index) => {
                      return (
                        <>
                          <AuthorCard
                            article={articleObj}
                            modalClose={handleManageResourcesClose}
                            actionState={actionState}
                            actionStateFunction={setActionState}
                          />
                        </>
                      );
                    })
                  : null}
              </div>
            </CustomTabPanel>
            {/* article section */}

            {/* video section */}
            <CustomTabPanel value={value} index={1}>
              <div className={styles.videoCardContainer}>
                {videoList
                  ? videoList.map((videoObj, index) => {
                      return (
                        <>
                          <VideoCard
                            video={videoObj}
                            modalClose={handleManageResourcesClose}
                            actionState={actionState}
                            actionStateFunction={setActionState}
                          />
                        </>
                      );
                    })
                  : null}
              </div>
            </CustomTabPanel>
            {/* videoo section */}

            {/* audio section */}
            <CustomTabPanel value={value} index={2}>
              <div className={styles.audioCardContainer}>
                {audioList
                  ? audioList.map((audObj, index) => {
                      return (
                        <>
                          <AudioCard
                            audio={audObj}
                            modalClose={handleManageResourcesClose}
                            actionState={actionState}
                            actionStateFunction={setActionState}
                          />
                        </>
                      );
                    })
                  : null}
              </div>
            </CustomTabPanel>
            {/* audio section */}
          </Box>
        </Modal>
      </div>
      {/* manage resources modal */}
      <div>
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        {uploadFinished && (
          <Snackbar
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
              sx={{ width: "100%", color: "white" }}
            >
              Resource uploaded successfully
            </Alert>
          </Snackbar>
        )}
        {uploadFailed && (
          <Snackbar
            open={uploadFailed}
            autoHideDuration={6000}
            onClose={() => setUploadFailed(false)}
          >
            <Alert severity="error" onClose={() => setUploadFailed(false)}>
              File upload failed, Please try again
            </Alert>
          </Snackbar>
        )}
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Dash_btn1
            btn_text="VIEW RESOURCES"
            inlineStyle={styles.btnPosition}
            callFunction={() => {
              setManageResources(true);
            }}
          />
        </div>
        <Grid
          container
          rowSpacing={3}
          style={{ overflowY: "scroll", height: "80vh" }}
        >
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "bold", marginLeft: "20px" }}>
              Resource name :
            </span>
          </Grid>
          <Grid item xs={10} style={{ paddingRight: "20px" }}>
            <TextField
              id="rName"
              label="Enter resource name"
              variant="outlined"
              style={{ width: "100%" }}
              value={title}
              onChange={handleTitleChange}
            />
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "bold", marginLeft: "20px" }}>
              Resource tags :
            </span>
          </Grid>
          <Grid item xs={10} style={{ paddingRight: "20px" }}>
            <div className={styles.tagsContainer}>
              <div className={styles.tagDisplay}>
                {tags.map((tag, index) => (
                  <div className={styles.tag} key={index}>
                    {tag}
                    <img
                      src={cancelIcon}
                      style={{ width: "15px", cursor: "pointer" }}
                      onClick={() => {
                        const updatedTags = tags.filter((item) => item !== tag);
                        setTags(updatedTags);
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
                          !tags.includes(tag.trim().toLowerCase()) &&
                          tag.trim().length !== 0
                        ) {
                          setTags([...tags, tag.toLowerCase()]);
                        }
                        document.getElementById("tgIn").value = "";
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "bold", marginLeft: "20px" }}>
              Resource category :
            </span>
          </Grid>
          <Grid item xs={10}>
            <FormControl style={{ width: "50%" }} size="small">
              <InputLabel id="demo-select-small-label">
                Select resource category
              </InputLabel>
              <Select
                labelId="demo-select-large-label"
                id="rCategory"
                value={category}
                label="category"
                style={{ height: "55px" }}
                onChange={handleCategoryChange}
              >
                <MenuItem value={"video"}>Video</MenuItem>
                <MenuItem value={"audio"}>Audio</MenuItem>
                <MenuItem value={"pdf"}>Article(Create article)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} padding={5}>
            {!isArticle ? (
              <DropFileInput
                isCancelled={isCancel}
                onFileChange={handleFileChange}
                type={fileType}
                ifProfileImg={false}
                reset={resetFileInput}
              />
            ) : (
              <CreateArticle onArticleSubmit={addArticleToResource} />
            )}
          </Grid>
        </Grid>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <div
            style={{
              display:
                title !== "" &&
                tags.length > 0 &&
                category !== "" &&
                (file !== null || (isArticle && article.title))
                  ? "block"
                  : "none",
            }}
          >
            <Dash_btn1
              btn_text="UPLOAD RESOURCE"
              inlineStyle={styles.btnPosition}
              callFunction={uploadResource}
            />
          </div>
          <Dash_btn2
            btn_text="CANCEL UPLOAD"
            inlineStyle={styles.btnPosition}
            onClickEvent={() => setIsCancel(true)}
          />
        </div>
      </div>
    </>
  );
};

export default ResourceManagement;
