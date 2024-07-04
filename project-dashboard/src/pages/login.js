import React, { useState } from "react";
import styles from "../pages/login.module.css";
import { Grid, TextField } from "@mui/material";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
            <TextField id="outlined-basic" placeholder="Enter your email" label="Email" variant="outlined" fullWidth onChange={handleEmailChange} />
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
            <button className={styles.loginBtn}>Login</button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
