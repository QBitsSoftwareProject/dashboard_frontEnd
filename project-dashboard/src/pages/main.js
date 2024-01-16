import React, { useState } from "react";
import styles from "../pages/main.module.css";
import UpperNavBar from "../components/ui/upperNavbar/upperNavbar.jsx";
import SideNavbar from "../components/ui/sideNavBar/sideNavbar.jsx";
import { Grid } from "@mui/material";

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
          <div className={styles.upperNavBarStyles}>
            <UpperNavBar />
          </div>
          <div class={styles.content}>
            {pageContent === "View-Analytics" && <p>View Analytics content</p>}
            {pageContent === "Manage-Resources" && (
              <p>Manage Resources content</p>
            )}
            {pageContent === "Task-Challenges" && (
              <p>Task and Challenges content</p>
            )}
            {pageContent === "Community-Management" && (
              <p>Community Management content</p>
            )}
            {pageContent === "User-control-access" && (
              <p>User control access content</p>
            )}
            {pageContent === "Appointments" && <p>Appointments content</p>}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
