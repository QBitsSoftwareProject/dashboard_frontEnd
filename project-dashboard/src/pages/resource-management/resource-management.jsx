import React, { useState } from "react";
import styles from "../resource-management/resource-management.module.css";
import Dash_btn1 from "../../components/ui/dash_btn/dash_btn1";
import Dash_btn2 from "../../components/ui/dash_btn/dash_btn2";
import {
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
import { ref, uploadBytes } from "firebase/storage";
import Swal from "sweetalert2/dist/sweetalert2";
import { v4 } from "uuid";
import axios from "axios";

const ResourceManagement = () => {
  const [isCancel, setIsCancel] = useState(false);
  const [isArticle, setIsArticle] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

  //resource features
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState();
  const [tags, setTags] = useState([]);

  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [article, setArticle] = useState({});

  const [duration, setDuration] = useState("3.15"); // State to store video duration
  const [downloadURL, setdownloadURL] = useState("url1");

  //video features
  const [ifWatch, setIfWatch] = useState(false);
  const [watchCount, setWatchCount] = useState(0);

  //audio features
  const [ifListen, setIfListen] = useState(false);
  const [listenCount, setistenCount] = useState(0);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

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
    window.location.reload();
  };

  // Add the article data to state
  const addArticleToResource = (articleData) => {
    console.log("Article Data:", articleData);
    setArticle(articleData);
  };

  // Upload the resource to the server
  const uploadResource = async () => {
    if (isArticle) {
      if (article.title && article.paragraphs.length > 0) {
        try {
          await axios.post("/api/v1/resources/article", article);
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
        const videoResource = {
          title,
          duration,
          tags,
          ifWatch,
          watchCount,
          downloadURL,
        };

        const videoRef = ref(storage, `videos/${file.name + v4()}`);
        alert("Video uploading started....");

        try {
          await uploadBytes(videoRef, file);
          await axios.post("/api/v1/resources/video", videoResource);
          alert("Video resource uploaded successfully. Check Resources.");
          setTimeout(resetForm, 2000);
        } catch (err) {
          alert("Error uploading video: " + err.message);
        }
      } else if (file.type.startsWith("audio") && category === "audio") {
        const audioResource = {
          title,
          duration,
          tags,
          ifListen,
          listenCount,
          downloadURL,
        };

        const audioRef = ref(storage, `audios/${file.name + v4()}`);
        try {
          await uploadBytes(audioRef, file);
          await axios.post("/api/v1/resources/audio", audioResource);
          alert("Audio upload successful. Check Resources.");
          resetForm();
        } catch (error) {
          alert("Audio upload failed: " + error);
        }
      } else {
        alert("Please select a valid file to upload.");
      }
    } else {
      alert("Please select a file or create an article to upload.");
    }
  };

  return (
    <div>
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
          onClickEvent={setIsCancel}
        />
      </div>
    </div>
  );
};

export default ResourceManagement;
