import React, { useState } from "react";
import styles from "../pages/main.module.css";
import UpperNavBar from "../components/ui/upperNavbar/upperNavbar.jsx";
import SideNavbar from "../components/ui/sideNavBar/sideNavbar.jsx";
import { Grid } from "@mui/material";

// sections
import ResourceManagement from "./resource-management/resource-management.jsx";
import ViewAnalytics from "./analytics/view-analytics.jsx";
import ControlAccess from "./control-access/control-access.jsx";
import TaskGoals from "./task-Goals/task-Goals.jsx";
// sections

export default function Main() {
  const [pageContent, setPageContent] = useState("View-Analytics");

  const handlePageChange = (newPageContent) => {
    setPageContent(newPageContent);
  };

  return (
    <div className={styles.container}>
      <Grid container>
        <Grid item xs={3} className={styles.sideNavbarStyles}>
          <SideNavbar onPageChange={handlePageChange} />
        </Grid>
        <Grid item xs={9}>
          {/* <div className={styles.upperNavBarStyles}>
            <UpperNavBar />
          </div> */}
          <div class={styles.content}>
            {pageContent === "View-Analytics" && <ViewAnalytics />}
            {pageContent === "Manage-Resources" && <ResourceManagement />}
            {pageContent === "Task-Goals" && <TaskGoals />}
            {pageContent === "User-control-access" && <ControlAccess />}
          </div>
        </Grid>
      </Grid>

    </div>
  );
}

