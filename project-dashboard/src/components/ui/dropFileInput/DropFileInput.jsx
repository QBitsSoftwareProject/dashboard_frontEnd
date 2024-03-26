import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import dropFileInputStyles from "../dropFileInput.module.css";

import { ImageConfig } from "../../../config/imageConfig";
import uploadImg from "../../../assets/images/dragAndDrop/uploadImg.png";
import Dash_btn3 from "../dash_btn/dash_btn3";

const DropFileInput = (props) => {
  const [isSetResource, SetIsResource] = useState(props.isCancelled);
  const [isImg, setIsImg] = useState();
  const [isVideo, setIsVideo] = useState();

  const preview = document.getElementById("preview");
  // console.log(isSetResource);
  // const file = document.getElementById("fileInput").files[0];
  // const reader = new FileReader();

  // reader.addEventListener(
  //   "load",
  //   function () {
  //     if (file.type.startsWith("image")) {
  //       preview.innerHTML = `<img src="${reader.result}" class="preview">`;
  //     } else if (file.type.startsWith("video")) {
  //       preview.innerHTML = `<video controls class="preview"><source src="${reader.result}" type="${file.type}"></video>`;
  //     }
  //   },
  //   false
  // );

  // if (file) {
  //   reader.readAsDataURL(file);
  // }

  // const wrapperRef = useRef(null);

  // const [fileList, setFileList] = useState([]);

  // const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  // const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  // const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const preview = document.getElementById("preview");
      if (newFile.type.startsWith("image")) {
        // preview.innerHTML = `<img src="${reader.result}" class="${dropFileInputStyles.image_preview}">`;
        setIsImg(reader.result);
      } else if (newFile.type.startsWith("video")) {
        // preview.innerHTML = `<video controls class="${dropFileInputStyles.video_preview}"><source src="${reader.result}" type="${newFile.type}"></video>`;
        setIsVideo(reader.result);
      }
      SetIsResource(true)
    };

    if (newFile) {
      reader.readAsDataURL(newFile);
    }
  };

  const onDrop = (e) => {
    onFileDrop(e);
  };

  const cancelUpload = () => {};

  return (
    <>
      <div
        className={dropFileInputStyles.container}
        // ref={wrapperRef}
        // onDragEnter={onDragEnter}
        // onDragLeave={onDragLeave}
        onDrop={onDrop}
        id="preview"
      >
        {!isSetResource && (
          <div>
            <div className={dropFileInputStyles.dragRegion}>
              <img src={uploadImg} style={{ width: "150px" }} />
              <input
                type="file"
                value=""
                id="fileInput"
                onChange={onFileDrop}
              />
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

        {isSetResource && isImg && (
          <img src={isImg} class={dropFileInputStyles.image_preview}></img>
        )}

        {isSetResource && isVideo && (
          <video controls class={dropFileInputStyles.video_preview} src={isVideo}></video>
        )}
      </div>
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
