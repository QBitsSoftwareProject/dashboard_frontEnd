import React from "react";
import styles from "../pages/main.module.css";
import "../pages/bootstrap.css";
import UpperNavBar from "../../src/components/ui/upperNavBar/upperNavbar.jsx";

export default function Main() {
  return (
    <div className={`${styles.container} bg-danger`}>
      <UpperNavBar />
    </div>
  );
}

