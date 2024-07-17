import React, { useState, useEffect } from "react";
import styles from "../mindRelaxingMethods/mindRelaxingMethod";
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

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Swal from "sweetalert2/dist/sweetalert2";

import { v4 } from "uuid";

import axios from "axios";

import uploadImg from "../../assets/images/dragAndDrop/uploadImg.png";

import {
  getMindRelaxingMethodById,
  updateMethodById,
} from "../../service/methodService";

import { useParams } from "react-router-dom";

const ResourceManagement = ({ onPageChange }) => {
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

  const [duration, setDuration] = useState("3.15"); // State to store video duration
  const [downloadURL, setdownloadURL] = useState("url1");

  //video features
  const [ifWatch, setIfWatch] = useState(false);
  const [watchCount, setWatchCount] = useState(0);

  //audio features
  const [ifListen, setIfListen] = useState(false);
  const [listenCount, setistenCount] = useState(0);

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");
  const [imageUrl, setImageUrl] = useState("");

  const [methodUpload, setMethodUpload] = useState(null);
  const methodListRef = ref(storage, "images/");
  const [methodUrl, setMethodUrl] = useState("");

  const [fileName, setFilename] = useState("");
  const [ImgUrl, setImageSrc] = useState(uploadImg);
  const [imgurl, srtImgurl] = useState("");

  const [srcUrl, setMethodSrc] = useState(uploadImg);
  const [methodurl, srtmethod] = useState("");

  const [methodName, setMethodName] = useState("");
  const [mark, setMark] = useState("");
  const [methodType, setMethodType] = useState("");
  const [methodDescription, setMethodDescription] = useState("");

  const { id } = useParams();

  // useEffect(() => {
  //   setMethodType(fileType);
  // },[fileType])

  // console.log(isCancel);

  const handleTitleChange = (event) => {
    setMethodName(event.target.value);
  };

  const handleMarkChange = (event) => {
    setMark(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setMethodDescription(event.target.value);
  };

  const handleUpdate = () => {
    console.log(methodName);
    console.log(methodType);
    console.log(methodCategory);
    console.log(methodDescription);
    console.log(imageUrl);
    console.log(methodUrl);

    updateMethodById(
      id,
      methodType,
      methodCategory,
      methodName,
      methodDescription,
      imageUrl,
      methodUrl
    );

    refrechForm();
  };

  const [methodData, setMethodData] = useState("");

  const getMethod = async () => {
    console.log(id);
    const response = await getMindRelaxingMethodById(id);
    console.log(response);
    setMethodData(response);
  };

  useEffect(() => {
    getMethod();
  }, []);

  useEffect(() => {
    setMethodName(methodData.resouceName);
    setMethodCategory(methodData.category);
    setMethodDescription(methodData.discription);
    setImageUrl(methodData.imageURL);
    setMethodUrl(methodData.resourceURL);
    setImageSrc(methodData.imageURL);
    setMethodType(methodData.methodType);
  }, [methodData]);

  const refrechForm = () => {
    setMethodName("");
    setMark("");
    setMethodCategory("");
    setMethodDescription("");

    setMethodUpload("");
    setFilenameMethod("");
    setCategory("");
  };

  const handleMethodTypeChange = (event) => {
    setMethodType(event.target.value);
  };

  const [methodCategory, setMethodCategory] = useState("");
  const handleCtegoryChange = (event) => {
    setMethodCategory(event.target.value);
  };
  useEffect(() => {
    console.log(methodCategory);
  }, [methodCategory]);

  const handleFileChange = (file) => {
    setFile(file);
  };

  const resetForm = () => {
    window.location.reload();
  };

  const uploadImage = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `coverImages/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      // alert("Image upload");
      //   toast.success("Image is set");

      getDownloadURL(imageRef)
        .then((url) => {
          //getting the download url for the uploaded image
          console.log("Download URL:", url);

          //set download url for usestate for displayinf in frontend
          setImageUrl(url);
          srtImgurl(url);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    });
  };

  const uploadMethod = () => {
    console.log("uploading");

    if (!methodUpload) {
      console.error("No file to upload");
      return;
    }

    const methodRef = ref(
      storage,
      `relaxingMethods/${methodUpload.name + v4()}`
    );

    uploadBytes(methodRef, methodUpload)
      .then(() => {
        console.log("Upload successful, fetching download URL...");
        return getDownloadURL(methodRef);
      })
      .then((url) => {
        console.log("Method Download URL:", url);
        setMethodUrl(url);
        srtImgurl(url);
      })
      .catch((error) => {
        console.error("Error uploading resource:", error);
      });
  };

  //to display choosed imaage
  const onChangeFile = (e) => {
    const file = e.target.files[0];
    setFilename(file);
    console.log(fileName);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result);
    };

    //for firebase
    setImageUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFilename(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      setImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    console.log(fileName);
  }, [fileName]);

  const [filenameMethod, setFilenameMethod] = useState("");

  const onChangeFileMethod = (e) => {
    const file = e.target.files[0];
    setFilenameMethod(file);
    console.log(filenameMethod);
    const reader = new FileReader();
    reader.readAsDataURL(file);
  };

  const handleList = () => {
    console.log("pressed");
    onPageChange("mind-relaxing-methods-list");
  };

  const handleDropMethod = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFilenameMethod(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      //   reader.onload = () => {
      //     // setImageSrc(reader.result);
      //   };
      setMethodUpload(file);
    }
  };

  const handleDragOverMethod = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    console.log(filenameMethod);
  }, [filenameMethod]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginBottom: "20px",
        }}
      >
        <Dash_btn1
          btn_text="VIEW METHODS"
          inlineStyle={styles.btnPosition}
          callFunction={handleList}
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
            Method name :
          </span>
        </Grid>
        <Grid item xs={10} style={{ paddingRight: "20px" }}>
          <TextField
            id="rName"
            placeholder="Enter Method name"
            label="Enter Method name"
            value={methodName}
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
            Method type :
          </span>
        </Grid>
        <Grid item xs={10}>
          <></>
          <FormControl style={{ width: "50%" }} size="small">
            <InputLabel id="demo-select-small-label">
              Select resource type
            </InputLabel>
            <Select
              labelId="demo-select-large-label"
              id="rCategory"
              value={methodType}
              placeholder="category"
              style={{ height: "55px" }}
              onChange={handleMethodTypeChange}
            >
              <MenuItem value={"video"}>Video</MenuItem>
              <MenuItem value={"audio"}>Audio</MenuItem>
              <MenuItem value={"pdf"}>PDF</MenuItem>
            </Select>
          </FormControl>
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
            Method category :
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
              value={methodCategory}
              placeholder="category"
              style={{ height: "55px" }}
              onChange={handleCtegoryChange}
            >
              <MenuItem value={"meditation"}>meditation</MenuItem>
              <MenuItem value={"soundTherapy"}>soundTherapy</MenuItem>
              <MenuItem value={"relaxation"}>relaxation</MenuItem>
              <MenuItem value={"physicalActivity"}>physicalActivity</MenuItem>
              <MenuItem value={"inspirationalContent"}>
                inspirationalContent
              </MenuItem>
              <MenuItem value={"cognitiveTraining"}>cognitiveTraining</MenuItem>
            </Select>
          </FormControl>
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
            Method discription :
          </span>
        </Grid>
        <Grid item xs={10} style={{ paddingRight: "20px" }}>
          <TextField
            id="rName"
            placeholder="Enter method discription"
            label="Enter method discription"
            value={methodDescription}
            variant="outlined"
            style={{ width: "100%" }}
            onChange={handleDescriptionChange}
            multiline
            rows={4}
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
            Method cover image :
          </span>
        </Grid>

        <Grid item xs={10} style={{ paddingRight: "20px" }}>
          <div
            className="second-row"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
              border: "2px dashed rgb(47, 121, 233)",
              borderRadius: "5px",
              padding: "20px",
              paddingBottom: "20px",
              textAlign: "center",
              width: "90%",
              display: "flex",
              gap: 20,
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <input
              type="file"
              onChange={onChangeFile}
              style={{ display: "none" }}
              id="fileInput"
              accept="image/*"
            />

            <div className="img-back">
              {ImgUrl && (
                <div>
                  <img
                    src={ImgUrl}
                    width={400}
                    height={250}
                    alt="Preview"
                    style={{ borderRadius: "15px" }}
                  />
                </div>
              )}
              {!ImgUrl && (
                <label
                  htmlFor="fileInput"
                  style={{ cursor: "pointer", marginTop: "20px" }}
                >
                  <div>Drag and drop an image here</div>
                </label>
              )}
              <div>
                <button
                  className="img-btn"
                  onClick={uploadImage}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "20px",
                  }}
                >
                  Confirm image
                </button>
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
          <span
            style={{ fontWeight: "bold", marginLeft: "20px", marginRight: 20 }}
          >
            Method resource :
          </span>
        </Grid>
        <Grid item xs={10} style={{ paddingRight: "20px" }}>
          <div
            className="second-row"
            onDrop={handleDropMethod}
            onDragOver={handleDragOverMethod}
            style={{
              border: "2px dashed rgb(47, 121, 233)",
              borderRadius: "5px",
              padding: "20px",
              paddingBottom: "30px",
              textAlign: "center",
              width: "95%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              type="file"
              onChange={onChangeFileMethod}
              style={{ display: "none" }}
              id="fileInput"
              accept="image/*"
            />
            <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
              <div>Drag and drop the resource here</div>
            </label>
            <div className="img-back">
              <div>
                {filenameMethod ? (
                  <div
                    classname="methods"
                    style={{
                      height: 150,
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      width: 310,
                    }}
                  >
                    {filenameMethod.name}
                  </div>
                ) : (
                  ImgUrl && (
                    <div>
                      <div
                        classname="methods"
                        style={{
                          height: 150,
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          width: 310,
                        }}
                      >
                        {methodName}
                      </div>
                    </div>
                  )
                )}
              </div>

              <div>
                <button
                  className="img-btn"
                  onClick={uploadMethod}
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                >
                  Confirm Resource
                </button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <div
        className="uploadBtn"
        style={{
          margin: 30,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Dash_btn1
          btn_text="UPLOAD METHOD"
          inlineStyle={styles.btnPosition}
          callFunction={handleUpdate}
        />
      </div>
    </div>
  );
};

export default ResourceManagement;
