import React from "react";
import styles from "../pages/main.module.css";
import UpperNavBar from "../components/ui/upperNavbar/upperNavbar.jsx";
import SideNavbar from "../components/ui/sideNavBar/sideNavbar.jsx";
import { Grid } from "@mui/material";

export default function Main() {
  return (
    <div className={styles.container}>
      <Grid container padding={1}>
        <Grid item xs={3} className={styles.sideNavbarStyles}>
          <SideNavbar />
        </Grid>
        <Grid item xs={9} className={styles.upperNavBarStyles}>
          <UpperNavBar />
        </Grid>
      </Grid>
    </div>
  );
}
