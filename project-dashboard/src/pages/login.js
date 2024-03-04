import React from "react";
import styles from "../pages/login.module.css";
import { Checkbox, Grid, TextField } from "@mui/material";

export default function login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.blobContainer}>
        <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#79E4FF"
            d="M50.9,-36.4C65.2,-22.7,75.4,-1.6,71.1,15.9C66.9,33.3,48.1,47.1,27.3,57.2C6.6,67.4,-16.2,74.1,-32.5,66.6C-48.9,59.1,-58.9,37.4,-63.5,15.1C-68.1,-7.1,-67.2,-30,-55.7,-43.1C-44.2,-56.2,-22.1,-59.6,-1.9,-58.1C18.3,-56.6,36.6,-50.2,50.9,-36.4Z"
            transform="translate(10 10)"
          />
        </svg>
      </div>
      <div className={styles.loginDetailsBox}>
        <Grid container>
          <Grid item xs={3} style={{ position: "relative" }}>
            <div className={styles.detailBox1}></div>
          </Grid>
          <Grid item xs={9}>
            <div className={styles.detailBox2}>
              <h2>Login to the Admin Dashboard</h2>
              <TextField id="outlined-basic" label="email" variant="outlined" />
              <br />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                type="password"
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5 style={{ color: "#085BA7" }}>
                  <Checkbox defaultChecked />
                  Remember me
                </h5>
                <h5 style={{ color: "#0082A8" ,cursor:"pointer"}}>Forgot Password?</h5>
              </div>
              <div className={styles.loginBtnContainer}>
                <button className={styles.loginBtn}>Login</button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
