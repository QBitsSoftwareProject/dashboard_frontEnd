import React from "react";
import loadingAnimation from "../../../assets/images/gifAnimations/animation.gif";

export default function LoadingScreen() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={loadingAnimation} style={{ width: "100px" }} />
      <h4 style={{ color: "#2f79e9" }}>LOADING</h4>
    </div>
  );
}
