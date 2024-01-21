import React from "react";
import styles from "../searchBox.module.css";
import SearchIcon from "@mui/icons-material/Search";
// import img1 from "../../../assets/images/profileImgs/img1.png";

export default function SearchBox() {
  return (
    <div className={styles.searchBar}>
      <input placeholder="Search" className={styles.searchBox} />
      <div className={styles.iconHolder}>
        <SearchIcon style={{ color: "white" }} />
      </div>
    </div>
  );
}
