import React from "react";
import styles from "../sideNavbar.module.css";
import SideBarButton from "../sideBarButton/sideBarButton";

export default function SideNavbar() {
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
      name: "Task and Challenges",
      status: "ns",
      loc: require("../../../assets/images/sideBar/task and challenges(ns).png"),
    },
    img2_2: {
      name: "Task and Challenges",
      status: "s",
      loc: require("../../../assets/images/sideBar/task and challenges(s).png"),
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
      name: "Community management",
      status: "ns",
      loc: require("../../../assets/images/sideBar/community-management(ns).png"),
    },
    img4_4: {
      name: "Community management",
      status: "s",
      loc: require("../../../assets/images/sideBar/community-management(s).png"),
    },
    img5: {
      name: "User control access",
      status: "ns",
      loc: require("../../../assets/images/sideBar/user-control-access(ns).png"),
    },
    img5_5: {
      name: "User control access",
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
  };
  const imgDetailsArray = Object.values(imgDetails);

  return (
    <div className={styles.container}>
      <div style={{ textAlign: "center",marginTop:"30px" }}>
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
