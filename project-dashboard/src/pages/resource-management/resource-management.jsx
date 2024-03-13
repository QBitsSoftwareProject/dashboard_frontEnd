import React from "react";
import styles from "../resource-management/resource-management.module.css";
import Dash_btn1 from "../../components/ui/dash_btn/dash_btn1";
import Dash_btn2 from "../../components/ui/dash_btn/dash_btn2";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DropFileInput from "../../components/ui/dropFileInput/DropFileInput";

function resourceManagement() {
  const onFileChange = (files) => {
    console.log(files);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Dash_btn1 btn_text="VIEW RESOURCES" inlineStyle={styles.btnPosition} />
      </div>
      <Grid
        container
        rowSpacing={3}
        style={{ overflowY: "scroll", height: "65vh" }}
      >
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold", marginLeft: "20px" }}>
            Resource name :
          </span>
        </Grid>
        <Grid item xs={10} style={{ paddingRight: "20px" }}>
          <TextField
            id="outlined-basic"
            label="Enter resource name"
            variant="outlined"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold", marginLeft: "20px" }}>
            Resource category :
          </span>
        </Grid>
        <Grid item xs={10}>
          <FormControl style={{ width: "50%" }} size="small">
            <InputLabel id="demo-select-small-label">
              Select resource category
            </InputLabel>
            <Select
              labelId="demo-select-large-label"
              id="demo-select-small"
              value=""
              label="category"
              style={{ height: "55px" }}
            >
              <MenuItem value={10}>Video</MenuItem>
              <MenuItem value={20}>Audio</MenuItem>
              <MenuItem value={30}>Article(PDF)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} padding={5}>
          <DropFileInput onFileChange={(files) => onFileChange(files)} />
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Dash_btn1
          btn_text="UPLOAD RESOURCE"
          inlineStyle={styles.btnPosition}
        />
        <Dash_btn2 btn_text="CANCEL UPLOAD" inlineStyle={styles.btnPosition} />
      </div>
    </div>
  );
}

export default resourceManagement;
