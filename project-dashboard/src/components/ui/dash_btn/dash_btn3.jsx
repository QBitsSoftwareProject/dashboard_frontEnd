import React from "react";
import styles from "../dash_btn.module.css";

function Dash_btn3({ btn_text, inlineStyle }) {
  const classes = `${styles.dash_btn3} ${inlineStyle}`;
  return <button className={classes}>{btn_text}</button>;
}

export default Dash_btn3;
