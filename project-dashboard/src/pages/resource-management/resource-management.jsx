import React, { useState } from "react";
import styles from "../resource-management/resource-management.module.css";
import Dash_btn1 from "../../components/ui/dash_btn/dash_btn1";
import Dash_btn2 from "../../components/ui/dash_btn/dash_btn2";
import {
  Alert,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import cancelIcon from "../../assets/images/dragAndDrop/cancel.png";
import DropFileInput from "../../components/ui/dropFileInput/DropFileInput";
import CreateArticle from "../../components/ui/createArticle/CreateArticle";
import { storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import Box from "@mui/material/Box";

//loading animation
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
//loading animation

const ResourceManagement = () => {
  const [isCancel, setIsCancel] = useState(false);
  const [isArticle, setIsArticle] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

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

  const [duration, setDuration] = useState("3.15"); // State to store video duration

  // Video features
  const [ifWatch, setIfWatch] = useState(false);
  const [watchCount, setWatchCount] = useState(0);

  // Audio features
  const [ifListen, setIfListen] = useState(false);
  const [listenCount, setListenCount] = useState(0);

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
  };

  // Add the article data to state
  const addArticleToResource = (articleData) => {
    setArticle(articleData);
  };

  // Firebase upload
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
      console.error("Error uploading profile picture:", error);
      return null;
    }
  };

  // Upload the resource to the server
  const uploadResource = async () => {
    setLoading(true); // Start loading
    let resourceURL = null;
    if (isArticle) {
      if (article.title && article.paragraphs.length > 0) {
        try {
          console.log("Uploading article:", article);
          await axios.post(
            "http://localhost:3000/api/v1/resources/article",
            article
          );
          alert("Article uploaded successfully. Check Resources.");
          resetForm();
        } catch (error) {
          alert("Failed to upload article, error: " + error);
        }
      } else {
        alert("Please create your custom article.");
      }
    } else if (file) {
      if (file.type.startsWith("video") && category === "video") {
        resourceURL = await firebaseUpload("video");
        if (resourceURL) {
          const videoResource = {
            title,
            duration,
            tags,
            ifWatch,
            watchCount,
            downloadURL: resourceURL,
          };
          try {
            console.log("Uploading video:", videoResource);
            await axios.post(
              "http://localhost:3000/api/v1/resources/video",
              videoResource
            );
            setUploadFinished(true);
            resetForm();
          } catch (error) {
            alert("Failed to upload Video, error: " + error);
          }
        }
      } else if (file.type.startsWith("audio") && category === "audio") {
        resourceURL = await firebaseUpload("audio");
        if (resourceURL) {
          const audioResource = {
            title,
            duration,
            tags,
            ifListen,
            listenCount,
            downloadURL: resourceURL,
          };
          try {
            console.log("Uploading audio:", audioResource);
            await axios.post(
              "http://localhost:3000/api/v1/resources/audio",
              audioResource
            );
            setUploadFinished(true);
            resetForm();
          } catch (error) {
            alert("Failed to upload Audio, error: " + error);
          }
        }
      } else {
        alert("Please select a valid file to upload.");
      }
    } else {
      alert("Please select a file or create an article to upload.");
    }
    setLoading(false); // Stop loading
  };

  return (
    <div>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {uploadFinished && (
        // <Snackbar
        //   open={uploadFinished}
        //   autoHideDuration={5000}
        //   onClose={()=>{
        //     setUploadFinished(false);
        //   }}
        //   message="Resource uploaded successfully."
        // />
        <Snackbar
          open={uploadFinished}
          autoHideDuration={5000}
          onClose={()=>{
            setUploadFinished(false);
          }}
        >
          <Alert
            onClose={()=>{
            setUploadFinished(false);
          }}
            severity="info"
            variant="filled"
            sx={{ width: "100%",color:"white" }}
          >
            Resource uploaded successfully
          </Alert>
        </Snackbar>
      )}
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Dash_btn1 btn_text="VIEW RESOURCES" inlineStyle={styles.btnPosition} />
      </div>
      <Grid
        container
        rowSpacing={3}
        style={{ overflowY: "scroll", height: "65vh" }}
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
  );
};

export default ResourceManagement;
