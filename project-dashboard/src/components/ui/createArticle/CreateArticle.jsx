import React, { useState } from "react";
import styles from "../createArticle.module.css";

import createArticle from "../../../assets/images/article/article.png";

import add from "../../../assets/images/article/add.png";
import cross from "../../../assets/images/article/cross.png";
import image from "../../../assets/images/article/image.png";

export default function CreateArticle() {
  const [showContent, setShowContent] = useState(true);

  /* Open */
  const openNav = () => {
    document.getElementById("myNav").style.width = "100%";
    setShowContent(true);
  };

  /* Close */
  const closeNav = () => {
    setShowContent(false);
    document.getElementById("myNav").style.width = "0%";
  };

  return (
    <div className={styles.createArticleSection}>
      <div>
        <img src={createArticle} />
        <h5
          style={{
            color: "#2F79E9",
            fontWeight: "bolder",
            fontSize: "15px",
          }}
        >
          Create Custom Article
        </h5>

        <button className={styles.createArticleBtn} onClick={openNav}>
          CREATE
        </button>
      </div>

      <div id="myNav" className={styles.overlay}>
        <a
          href="javascript:void(0)"
          className={styles.closebtn}
          onClick={closeNav}
        >
          &times;
        </a>

        {showContent ? (
          <div className={styles.overlay_content}>
            <div className={styles.articleContent1}>
              <span>Article Title :</span>
              <input
                className={styles.articleInput1}
                placeholder="Enter Article Title"
              />
              <br />
            </div>
            <div className={styles.articleContent2}>
              <span>Paragraph 1 :</span>
              <textarea
                id="myTextarea"
                className={styles.input_like}
              ></textarea>
              <div className={styles.paraOptions}>
                <img src={image} />
                <img src={add} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
