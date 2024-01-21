import React from "react";
import styles from "../dash_btn.module.css";

function Dash_btn1({ btn_text ,inlineStyle}) {
  const classes=`${styles.dash_btn1} ${inlineStyle} ${styles.dashbtn}`
  return <button className={classes}>{btn_text}</button>;
}

export default Dash_btn1;
