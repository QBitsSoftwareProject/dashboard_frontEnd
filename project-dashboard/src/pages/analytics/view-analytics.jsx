import React from "react";
import styles from "../analytics/view-analytics.module.css";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { Grid } from "@mui/material";

export default function ViewAnalytics() {
  return (
    <div>
      <h1>View-Analytics section</h1>
      <div className={styles.userAnalyticsContainer}>
        {/* counts */}
        <div className={(styles.patientCount, styles.count)}>
          <span>96 Patients</span>
        </div>
        <div className={(styles.doctorCount, styles.count)}>
          <span>108 Doctors</span>
        </div>
        <div className={(styles.resourceCount, styles.count)}>
          <span>200 Resources</span>
        </div>
        {/* counts */}
      </div>
      {/* graph section */}
      <div style={{ marginTop: "60px" }}>
        <Grid container>
          <Grid item xs={6}>
            <Bar
              data={{
                labels: ["A", "B", "C"],
                datasets: [
                  {
                    label: "Revenue",
                    data: [200, 300, 400],
                  },
                  {
                    label: "Loss",
                    data: [90, 80, 70],
                  },
                ],
              }}
            />
          </Grid>
        </Grid>
      </div>
      {/* graph section */}
    </div>
  );
}
