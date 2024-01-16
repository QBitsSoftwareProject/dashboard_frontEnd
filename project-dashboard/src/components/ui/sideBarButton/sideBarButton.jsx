import React from "react";
import styles from "../sideBarButton.module.css";

export default function SideBarButton({ imgDetails }) {
  const selectedBtn = `${styles.btnContainer} ${styles.btnSelected}`;
  const not_selectedBtn = `${styles.btnContainer} ${styles.btnNotSelected}`;
  if (imgDetails.status == "s") {
    return (
      <div className={selectedBtn}>
        <img
          src={imgDetails.loc}
          style={{ width: 20, height: "auto", margin: 10 }}
        />
        <span>{imgDetails.name}</span>
      </div>
    );
  } else {
    return (
      <div className={not_selectedBtn}>
        <img
          src={imgDetails.loc}
          style={{ width: 20, height: "auto", margin: 10 }}
        />
        <span>{imgDetails.name}</span>
      </div>
    );
  }
}
