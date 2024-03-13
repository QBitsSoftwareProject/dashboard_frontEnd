import React from "react";
import styles from "../dash_btn.module.css";

function Dash_btn1({ btn_text ,inlineStyle,callFunction}) {
  const classes=`${styles.dash_btn1} ${inlineStyle} ${styles.dashbtn}`
  return <button className={classes} onClick={callFunction}>{btn_text}</button>;
}

export default Dash_btn1;
