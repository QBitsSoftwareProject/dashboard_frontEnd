import React, { useState } from "react";
import styles from "../pages/login.module.css";
import { Grid, TextField } from "@mui/material";
import { adminLogin } from "../services/adminServices/adminServices";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

export default function Login() {

  const token = localStorage.getItem("authToken");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernnameChange = (event) => {
    setUserName(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const logAdmin = async () => {

    if (userName !== "" && password !== "") {
      const details = {
        userName, password
      }
      try {
        const response = await adminLogin(details);
        if (response) {
          await Swal.fire({
            title: "Login successfull!",
            text: "Directing you to the admin dashbaord !",
            icon: "success"
          });
          handlePageChange("view-analytics");
        } else {
          Swal.fire({
            icon: "error",
            title: "Admin login failed",
            text: "Please enter the correct credentials",
          });
        }
      } catch (err) {
        console.log("failed to find admin");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed to login admin",
        text: "Please fill your credentials to login",
      });
    }
  }

  const navigate = useNavigate();

  const handlePageChange = (newPageContent) => {
    navigate(`/${newPageContent}`);
  };

  return (
    <>
      {
        (!token ? (<div className={styles.loginContainer}>
          <div className={styles.loginDetailsContainer}>
            <Grid container direction="row"
              justifyContent="center"
              alignItems="center">
              <Grid item xs={12} style={{ textAlign: "center", marginTop: "30px" }}>
                <h3>Login to the Admin Dashboard</h3>
                <h5 style={{ marginTop: "-16px" }}>Enter your security credentials</h5>
              </Grid>
              <Grid item xs={10} style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: 10 }}>
                <TextField id="outlined-basic" placeholder="Enter your username" label="Username" variant="outlined" fullWidth onChange={handleUsernnameChange} onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    logAdmin();
                  }
                }} />
              </Grid>
              <Grid item xs={10} style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: 10 }}>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  onChange={handlePasswordChange}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      logAdmin();
                    }
                  }}
                />
              </Grid>
              <Grid item xs={10} style={{ display: "flex", justifyContent: "center" }}>
                <button className={styles.loginBtn} onClick={logAdmin} >Login</button>
              </Grid>
            </Grid>
          </div>
        </div>) : (handlePageChange("view-analytics")))
      }

    </>
  );
}
