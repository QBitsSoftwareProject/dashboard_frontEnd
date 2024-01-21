import React from "react";
import PropTypes from "prop-types";
import dropFileInputStyles from "../dropFileInput.module.css";

import { ImageConfig } from "../../../config/imageConfig";
import uploadImg from "../../../assets/images/dragAndDrop/uploadImg.png";
import Dash_btn3 from "../dash_btn/dash_btn3";

const DropFileInput = (props) => {
  return (
    <div className={dropFileInputStyles.container}>
      <div className={dropFileInputStyles.dragRegion}>
        <img src={uploadImg} style={{ width: "150px" }} />
        <input type="file" value=""/>
      </div>
      <h5 style={{ color: "#2F79E9", fontWeight: "bolder", fontSize: "15px" }}>
        Drag and drop to upload
      </h5>
      <Dash_btn3 btn_text="UPLOAD" />
      <h5 style={{ color: "#2F79E9", fontWeight: "bolder", fontSize: "15px" }}>
        ( Upto 100 MB )
      </h5>
    </div>
  );
};

// DropFileInput.PropTypes={

// }

export default DropFileInput;
