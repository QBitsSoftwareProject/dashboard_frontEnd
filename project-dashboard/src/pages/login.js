import React, { useState } from "react";
import styles from "../pages/login.module.css";
import { Grid, TextField } from "@mui/material";
import { adminLogin } from "../services/adminServices/adminServices";

export default function Login() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernnameChange = (event) => {
    setUserName(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const logAdmin = async () => {
    const details = {
      userName, password
    }
    try {
      const response = await adminLogin(details);
    } catch (err) {
      console.log("failed to find admin");
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginDetailsContainer}>
        <Grid container direction="row"
          justifyContent="center"
          alignItems="center">
          <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
            <h3>Login to the Admin Dashboard</h3>
            <h5 style={{ marginTop: "-16px" }}>Enter your security credentials</h5>
          </Grid>
          <Grid item xs={10} style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: 10 }}>
            <TextField id="outlined-basic" placeholder="Enter your username" label="Username" variant="outlined" fullWidth onChange={handleUsernnameChange} />
          </Grid>
          <Grid item xs={10} style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: 10 }}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              onChange={handlePasswordChange}
            />
          </Grid>
          <Grid item xs={10} style={{ display: "flex", justifyContent: "center" }}>
            <button className={styles.loginBtn} onClick={logAdmin}>Login</button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
