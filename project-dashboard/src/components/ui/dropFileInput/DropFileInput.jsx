import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import dropFileInputStyles from "../dropFileInput.module.css";

import { ImageConfig } from "../../../config/imageConfig";
import uploadImg from "../../../assets/images/dragAndDrop/uploadImg.png";
import Dash_btn3 from "../dash_btn/dash_btn3";

const DropFileInput = (props) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <>
      <div
        className={dropFileInputStyles.container}
        ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className={dropFileInputStyles.dragRegion}>
          <img src={uploadImg} style={{ width: "150px" }} />
          <input type="file" value="" onChange={onFileDrop} />
        </div>
        <h5
          style={{ color: "#2F79E9", fontWeight: "bolder", fontSize: "15px" }}
        >
          Drag and drop to upload
        </h5>
        <Dash_btn3 btn_text="UPLOAD" />
        <h5
          style={{ color: "#2F79E9", fontWeight: "bolder", fontSize: "15px" }}
        >
          ( Upto 100 MB )
        </h5>
      </div>
      {fileList.length > 0 ? (
        <div className={dropFileInputStyles.drop_file_preview}>
          <p className={dropFileInputStyles.drop_file_preview__title}>
            Ready to upload
          </p>
          {fileList.map((item, index) => (
            <div
              key={index}
              className={dropFileInputStyles.drop_file_preview__item}
            >
              <img
                src={
                  ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]
                }
                alt=""
              />
              <div
                className={dropFileInputStyles.drop_file_preview__item__info}
              >
                <p>{item.name}</p>
                <p>{item.size}</p>
              </div>
              <span
                className={dropFileInputStyles.drop_file_preview__item__del}
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
