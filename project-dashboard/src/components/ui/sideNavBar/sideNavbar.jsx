import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../sideNavbar.module.css";
import btn_styles from "../sideBarButton.module.css";
import UpperNavBar from "../upperNavbar/upperNavbar";

import Swal from "sweetalert2";

export default function SideNavbar({ onPageChange, logoutFunction }) {
  const imgDetails = {
    img1: {
      name: "View Analytics",
      status: "ns",
      loc: require("../../../assets/images/sideBar/view-analytics(ns).png"),
    },
    img1_1: {
      name: "View Analytics",
      status: "s",
      loc: require("../../../assets/images/sideBar/view-analytics(s).png"),
    },
    img2: {
      name: "Task and Goals",
      status: "ns",
      loc: require("../../../assets/images/sideBar/task and Goals(ns).png"),
    },
    img2_2: {
      name: "Task and Goals",
      status: "s",
      loc: require("../../../assets/images/sideBar/task and Goals(s).png"),
    },
    img3: {
      name: "Manage Resources",
      status: "ns",
      loc: require("../../../assets/images/sideBar/manage-resources(ns).png"),
    },
    img3_3: {
      name: "Manage Resources",
      status: "s",
      loc: require("../../../assets/images/sideBar/manage-resources(s).png"),
    },
    img4: {
      name: "User management",
      status: "ns",
      loc: require("../../../assets/images/sideBar/user-control-access(ns).png"),
    },
    img4_4: {
      name: "User management",
      status: "s",
      loc: require("../../../assets/images/sideBar/user-control-access(s).png"),
    },
    img6: {
      name: "Appointments",
      status: "ns",
      loc: require("../../../assets/images/sideBar/appointments(ns).png"),
    },
    img6_6: {
      name: "Appointments",
      status: "s",
      loc: require("../../../assets/images/sideBar/appointments(s).png"),
    },
    img7: {
      name: "Mind Relaxing Methods",
      status: "ns",
      loc: require("../../../assets/images/sideBar/appointments(ns).png"),
    },
    img7_7: {
      name: "Mind Relaxing Methods",
      status: "s",
      loc: require("../../../assets/images/sideBar/appointments(s).png"),
    },
    img8: {
      name: "Stress Level Questions",
      status: "ns",
      loc: require("../../../assets/images/sideBar/stress-level-questions(ns).png"),
    },
    img8_8: {
      name: "Stress Level Question",
      status: "s",
      loc: require("../../../assets/images/sideBar/stress-level-questions(s).png"),
    },
    img9: {
      name: "User feedback",
      status: "ns",
      loc: require("../../../assets/images/sideBar/user-feedbacks(ns).png"),
    },
    img9_9: {
      name: "User feedback",
      status: "s",
      loc: require("../../../assets/images/sideBar/user-feedbacks(s).png"),
    },
  };

  const selectedBtn = `${btn_styles.btnContainer} ${btn_styles.btnSelected}`;
  const not_selectedBtn = `${btn_styles.btnContainer} ${btn_styles.btnNotSelected}`;
  const [pageContent, setpageContent] = useState("View-Analytics");

  const getImageSrc = (img) => {
    if (imgDetails[img]) {
      return imgDetails[img].loc;
    }
    return ""; // or a default image path
  };

  return (
    <div className={styles.container}>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <span style={{ fontSize: "20px" }}>Admin Dashboard</span>
        <br />
        <span>Welcome back</span>
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            className={styles.logoutBtn}
            onClick={async () => {
              await Swal.fire({
                title: "Logout!",
                text: "Logout successful.",
                icon: "success",
              });
              logoutFunction();
            }}
          >
            <div className={styles.sign}>
              <svg viewBox="0 0 512 512">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>
            <div className={styles.logoutText}>Logout</div>
          </button>
        </div>
      </div>
      {/* upper navbar */}
      <div>
        <UpperNavBar />
      </div>
      {/* upper navbar */}
      <div
        style={{
          marginTop: "10vh",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <Link
          to="/view-analytics"
          className={
            pageContent === "View-Analytics" ? selectedBtn : not_selectedBtn
          }
          style={{ textDecoration: "none" }}
          onClick={() => {
            setpageContent("View-Analytics");
            onPageChange("View-Analytics");
          }}
        >
          <img
            src={getImageSrc(
              pageContent === "View-Analytics" ? "img1_1" : "img1"
            )}
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>View analytics</span>
        </Link>
        <Link
          to="/Task-Goals"
          className={
            pageContent === "Task-Goals" ? selectedBtn : not_selectedBtn
          }
          style={{ textDecoration: "none" }}
          onClick={() => {
            setpageContent("Task-Goals");
            onPageChange("Task-Goals");
          }}
        >
          <img
            src={getImageSrc(pageContent === "Task-Goals" ? "img2_2" : "img2")}
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>Task and goals</span>
        </Link>

        <Link
          to="/manage-resources"
          className={
            pageContent === "Manage-Resources" ? selectedBtn : not_selectedBtn
          }
          style={{ textDecoration: "none" }}
          onClick={() => {
            setpageContent("Manage-Resources");
            onPageChange("Manage-Resources");
          }}
        >
          <img
            src={getImageSrc(
              pageContent === "Manage-Resources" ? "img3_3" : "img3"
            )}
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>Manage resources</span>
        </Link>

        <Link
          to="/user-control-access"
          className={
            pageContent === "User-control-access"
              ? selectedBtn
              : not_selectedBtn
          }
          style={{ textDecoration: "none" }}
          onClick={() => {
            setpageContent("User-control-access");
            onPageChange("User-control-access");
          }}
        >
          <img
            src={getImageSrc(
              pageContent === "User-control-access" ? "img4_4" : "img4"
            )}
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>User control access</span>
        </Link>
        <Link
          to="/mind-relaxing-methods"
          className={
            pageContent === "Mind Relaxing Methods"
              ? selectedBtn
              : not_selectedBtn
          }
          style={{ textDecoration: "none" }}
          onClick={() => {
            setpageContent("Mind Relaxing Methods");
            onPageChange("Mind Relaxing Methods");
          }}
        >
          <img
            src={getImageSrc(
              pageContent === "Mind Relaxing Methods" ? "img7_7" : "img7"
            )}
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>Mind relaxing methods</span>
        </Link>
        <Link
          to="/stress-level-questions"
          className={
            pageContent === "stress level question"
              ? selectedBtn
              : not_selectedBtn
          }
          style={{ textDecoration: "none" }}
          onClick={() => {
            setpageContent("stress level question");
            onPageChange("stress level question");
          }}
        >
          <img
            src={getImageSrc(
              pageContent === "stress level question" ? "img8_8" : "img8"
            )}
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>Stress level questions</span>
        </Link>
        <Link
          to="/user-feedbacks"
          className={
            pageContent === "user-feedbacks" ? selectedBtn : not_selectedBtn
          }
          style={{ textDecoration: "none" }}
          onClick={() => {
            setpageContent("user-feedbacks");
            onPageChange("user-feedbacks");
          }}
        >
          <img
            src={getImageSrc(
              pageContent === "user-feedbacks" ? "img9_9" : "img9"
            )}
            style={{ width: 20, height: "auto", margin: 10 }}
          />
          <span>User feedbacks</span>
        </Link>
      </div>
    </div>
  );
}
