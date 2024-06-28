import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import dropFileInputStyles from "../dropFileInput.module.css";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

import uploadImg from "../../../assets/images/dragAndDrop/uploadImg.png";
import Dash_btn3 from "../dash_btn/dash_btn3";

const DropFileInput = (props) => {
  const [isSetResource, SetIsResource] = useState(props.isCancelled);
  const [isImg, setIsImg] = useState();
  const [isVideo, setIsVideo] = useState();
  const [isAudio, setIsAudio] = useState();
  const [fileName, setFileName] = useState("");
  const [croppedImg, setCroppedImg] = useState(null);
  const cropperRef = useRef(null);

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    const reader = new FileReader();
    props.onFileChange(newFile);
    setFileName(newFile.name);

    reader.onload = () => {
      if (newFile.type.startsWith("image")) {
        setIsImg(reader.result);
      } else if (newFile.type.startsWith("video")) {
        setIsVideo(reader.result);
      } else if (newFile.type.startsWith("audio")) {
        setIsAudio(reader.result);
      }
      SetIsResource(true);
    };

    if (newFile) {
      reader.readAsDataURL(newFile);
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedDataUrl = cropperRef.current.cropper
        .getCroppedCanvas()
        .toDataURL("image/png"); // Explicitly set the format to PNG
      setCroppedImg(croppedDataUrl);
      // Create a new Blob from the data URL
      const blob = dataURLToBlob(croppedDataUrl);
      // Create a new File object from the Blob
      const file = new File([blob], fileName, { type: "image/png" });
      props.onFileChange(file); // Pass the File object to the onFileChange prop
      setIsImg(null); // Hide the cropper after cropping
    }
  };

  // Utility function to convert data URL to Blob
  const dataURLToBlob = (dataUrl) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  // Effect to reset the component when the reset prop changes
  useEffect(() => {
    if (props.reset) {
      SetIsResource(false);
      setIsImg(null);
      setIsVideo(null);
      setIsAudio(null);
      setFileName("");
      setCroppedImg(null);
    }
  }, [props.reset]);

  const onDrop = (e) => {
    onFileDrop(e);
  };

  return (
    <>
      <div
        className={dropFileInputStyles.container}
        onDrop={onDrop}
        id="preview"
      >
        {!isSetResource && (
          <div>
            <div className={dropFileInputStyles.dragRegion}>
              <img src={uploadImg} style={{ width: "150px" }} />
              {props.type === "article" ? (
                <input
                  type="file"
                  value=""
                  accept="application/pdf"
                  id="fileInput"
                  onChange={onFileDrop}
                />
              ) : props.type === "video" ? (
                <input
                  type="file"
                  value=""
                  accept="video/*"
                  id="fileInput"
                  onChange={onFileDrop}
                />
              ) : props.type === "audio" ? (
                <input
                  type="file"
                  value=""
                  accept="audio/*"
                  id="fileInput"
                  onChange={onFileDrop}
                />
              ) : (
                <input
                  type="file"
                  value=""
                  accept="image/*"
                  id="fileInput"
                  onChange={onFileDrop}
                />
              )}
            </div>
            <h5
              style={{
                color: "#2F79E9",
                fontWeight: "bolder",
                fontSize: "15px",
              }}
            >
              Drag and drop to upload
            </h5>
            <Dash_btn3 btn_text="UPLOAD" />
            <h5
              style={{
                color: "#2F79E9",
                fontWeight: "bolder",
                fontSize: "15px",
              }}
            >
              ( Upto 100 MB )
            </h5>
          </div>
        )}

        {isSetResource && isImg && props.ifProfileImg && !croppedImg && (
          <>
            <Cropper
              src={isImg}
              style={{ height: 400, width: "100%" }}
              initialAspectRatio={1}
              aspectRatio={1}
              guides={true}
              ref={cropperRef}
            />
            <div
              onClick={handleCrop}
              style={{
                backgroundColor: "#2f79e9",
                padding: 10,
                color: "white",
                margin: 10,
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              Crop Image
            </div>
          </>
        )}

        {croppedImg && (
          <img src={croppedImg} className={dropFileInputStyles.image_preview} />
        )}

        {isSetResource && isImg && !props.ifProfileImg && (
          <img src={isImg} className={dropFileInputStyles.image_preview}></img>
        )}

        {isSetResource && isVideo && (
          <>
            <video
              controls
              className={dropFileInputStyles.video_preview}
              src={isVideo}
            ></video>
            <h5>{fileName}</h5>
          </>
        )}

        {isSetResource && isAudio && (
          <>
            <audio
              controls
              className={dropFileInputStyles.audio_preview}
              src={isAudio}
            ></audio>
            <h5>{fileName}</h5>
          </>
        )}
      </div>
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
  ifProfileImg: PropTypes.bool,
  reset: PropTypes.bool,
  type: PropTypes.string,
};

export default DropFileInput;
