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
import DropFileInput from "../../components/ui/dropFileInput/DropFileInput";

import Swal from "sweetalert2/dist/sweetalert2.js";

import axios from "axios";

const ResourceManagement = () => {
  const [isCancel, setIsCancel] = useState(false);

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  //video features
  const [duration, setDuration] = useState("3.15"); // State to store video duration
  const [ifWatch, setIfWatch] = useState(false);
  const [watchCount, setWatchCount] = useState(0);
  const [downloadURL, setdownloadURL] = useState("url1");

  console.log(isCancel);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFileChange = (file) => {
    setFile(file);
    // setDuration("3.15");
    // Reset duration when a new file is selected
  };

  // const handleVideoLoad = (event) => {
  //   // Access the loaded video element
  //   const videoElement = event.target;

  //   // Update duration state once metadata is loaded
  //   setDuration(videoElement.duration);
  // };

  // Function to reset all state values
  const resetForm = () => {
    // //reset states
    // setTitle("");
    // setTags("");
    // setCategory("");
    // setFile(null);
    // //reset fields
    // document.getElementById("rName").value = "";
    // document.getElementById("rTags").value = "";
    // Reload the current page
    window.location.reload();
  };

  const uploadResource = async () => {
    const resourceInfo = {
      title,
      tags,
      category,
      file,
    };

    // { title, duration, tags, ifWatch, watchCount,downloadURL }

    if (file.type.startsWith("video")) {
      if (category == "video") {
        const videoResource = {
          title,
          duration,
          tags,
          ifWatch,
          watchCount,
          downloadURL,
        };

        console.log(videoResource);
        const Swal = require("sweetalert2");
        await axios
          .post("http://localhost:3000/api/v1/resources/video", videoResource)
          .then((response) => {
            // Handle success
            // alert("Video resource uploaded successfully: " + response.data);

            // or via CommonJS

            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Video upload successful , Check Resources",
              showConfirmButton: false,
              timer: 1800,
            });
            // console.log("Video resource uploaded successfully:", response.data);
          })
          .catch((error) => {
            // Handle error
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error uploading video resource",
            });
            // console.error("Error uploading resource:", error);
          });
        setTimeout(resetForm, 2000);
      }
    } else if (file.type.startsWith("audio")) {
      if (category == "audio") {
        const Swal = require("sweetalert2");
        axios
          .post("/api/v1/resources/audio", resourceInfo)
          .then((response) => {
            // Handle success
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Audio upload successful , Check Resources",
              showConfirmButton: false,
              timer: 1800,
            });
            resetForm();
            resetForm();
          })
          .catch((error) => {
            // Handle error
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error uploading video resource",
            });
          });
      }
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
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
          <TextField
            id="rTags"
            label="Enter resource tags"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={handleTagsChange}
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
            Resource category :
          </span>
        </Grid>
        <Grid item xs={10}>
          <></>
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
          <DropFileInput
            isCancelled={isCancel}
            onFileChange={handleFileChange}
          />
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <div
          style={{
            display:
              title !== "" && tags !== "" && category !== null && file !== null
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
