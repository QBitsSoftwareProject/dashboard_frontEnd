import { Avatar } from "@mui/material";
import styles from "../authorCard.module.css";

import profileImg from "../../../assets/images/authorProfileImages/img1.png";
import { useEffect, useState } from "react";
import {
  articleDelete,
  getAuthorInfo,
} from "../../../services/adminServices/adminServices";

import Swal from "sweetalert2";

const AuthorCard = ({
  article,
  modalClose,
  actionStateFunction,
  actionState,
}) => {
  const deleteArticle = (articleIdToDelete) => {
    Swal.fire({
      title: "Are you sure you want to delete this article?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0066ff",
      cancelButtonColor: "rgb(0, 102, 255,0.5)",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await articleDelete(articleIdToDelete);
          actionStateFunction(!actionState);
          Swal.fire({
            title: "Deleted!",
            text: "Article has been deleted.",
            icon: "success",
          });
        } catch (err) {
          console.log("error deleting article,error: " + err.message);
        }
      }
    });
  };

  const [articleAuthor, setArticleAuthor] = useState({});

  useEffect(() => {
    const authorInfo = async () => {
      try {
        const response = await getAuthorInfo(article.author);
        setArticleAuthor(response.data);
      } catch (err) {
        console.log("error fetching author info,error: " + err.message);
      }
    };
    authorInfo();
  }, []);

  return (
    <div className={styles.articleCard}>
      {/* author profile image */}
      <div
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={articleAuthor.profileImg}
          sx={{ width: 56, height: 56 }}
        />
      </div>
      {/* author profile image */}
      {/* article title and author name */}
      <div
        style={{
          width: "55%",
          height: "60px",
          paddingLeft: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <span style={{ fontSize: "20px" }}>{article.title}</span>
        <span style={{ fontSize: "15px" }}>By {articleAuthor.name}</span>
      </div>
      {/* article title and author name */}
      {/* actions */}
      <div
        style={{
          width: "30%",
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgb(47, 121, 233)",
            padding: "10px",
            color: "white",
            borderRadius: "10px",
            width: "130px",
            textAlign: "center",
          }}
          onClick={() => {
            modalClose();
            deleteArticle(article._id);
          }}
        >
          DELETE
        </div>
      </div>
      {/* actions */}
    </div>
  );
};

export default AuthorCard;
