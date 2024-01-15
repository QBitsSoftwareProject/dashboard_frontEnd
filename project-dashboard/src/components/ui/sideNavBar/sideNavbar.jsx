import React from "react";
import styles from "../sideNavbar.module.css";
import SideBarButton from "../sideBarButton/sideBarButton";

export default function SideNavbar() {
  const imgDetails = {
    img1: {
      name: "View Analytics",
      loc: require("../../../assets/images/sideBar/view-analytics.png"),
    },
    img2: {
      name: "Task and Challenges",
      loc: require("../../../assets/images/sideBar/task and challenges.png"),
    },
    img3: {
      name: "Manage Resources",
      loc: require("../../../assets/images/sideBar/manage-resources.png"),
    },
    img4: {
      name: "Community management",
      loc: require("../../../assets/images/sideBar/community-management.png"),
    },
    img5: {
      name: "User control access",
      loc: require("../../../assets/images/sideBar/user-control-access.png"),
    },
    img6: {
      name: "Appointments",
      loc: require("../../../assets/images/sideBar/appointments.png"),
    },
  };
  const imgDetailsArray = Object.values(imgDetails);

  return (
    <div className={styles.container}>
      <div style={{ textAlign: "center" }}>
        <span style={{ fontSize: "20px" }}>Admin Dashboard</span>
        <br />
        <span>Welcome back</span>
      </div>
      <div className={styles.secBtns}>
        {imgDetailsArray.map((detail, index) => {
          return <SideBarButton imgDetails={detail} />;
        })}
      </div>
    </div>
  );
}
