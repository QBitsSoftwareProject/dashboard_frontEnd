import React, { useEffect, useState } from "react";
import styles from "../analytics/view-analytics.module.css";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { Grid } from "@mui/material";
import {
  getAllArticles,
  getAllAudios,
  getAllDoctors,
  getAllMarks,
  getAllUsers,
  getAllVideos,
} from "../../services/adminServices/adminServices";

defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "center";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "rgb(82, 186, 255, 0.9)";

export default function ViewAnalytics() {
  // statistics
  const [patientCount, setPatientCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [resourceCount, setResourceCount] = useState(0);
  // statistics

  // stress level categories
  const [lowStressCount, setLowStressCount] = useState(0);
  const [mediumStressCount, setMediumStressCount] = useState(0);
  const [highStressCount, setHighStressCount] = useState(0);
  const [veryHighStressCount, setVeryHighStressCount] = useState(0);
  // stress level categories

  useEffect(() => {
    const fetchAllMarks = async () => {
      try {
        let allMarks = await getAllMarks();
        let lowCount = 0;
        let mediumCount = 0;
        let highCount = 0;
        let veryHighCount = 0;

        allMarks.data.forEach((markObj) => {
          if (markObj.mark <= 10) {
            lowCount += 1;
          } else if (markObj.mark <= 20) {
            mediumCount += 1;
          } else if (markObj.mark <= 30) {
            highCount += 1;
          } else if (markObj.mark <= 40) {
            veryHighCount += 1;
          }
        });

        setLowStressCount(lowCount);
        setMediumStressCount(mediumCount);
        setHighStressCount(highCount);
        setVeryHighStressCount(veryHighCount);
      } catch (err) {
        console.log("error fetching marks details,error:" + err.message);
      }
    };
    fetchAllMarks();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        let allArticles = await getAllArticles();
        let allVideos = await getAllVideos();
        let allAudios = await getAllAudios();
        let allDoctors = await getAllDoctors();
        let allUsers = await getAllUsers();
        const totalResources =
          allArticles.data.length +
          allVideos.data.length +
          allAudios.data.length;
        setResourceCount(totalResources);
        setDoctorCount(allDoctors.data.length);
        setPatientCount(allUsers.data.length);
      } catch (err) {
        console.log("error fetching statistics, error:" + err.message);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div className={styles.userAnalyticsContainer}>
        {/* counts */}
        <div className={(styles.patientCount, styles.count)}>
          <span>{patientCount} Patients</span>
        </div>
        <div className={(styles.doctorCount, styles.count)}>
          <span>{doctorCount} Doctors</span>
        </div>
        <div className={(styles.resourceCount, styles.count)}>
          <span>{resourceCount} Resources</span>
        </div>
        {/* counts */}
      </div>
      {/* graph section */}
      <div style={{ marginTop: "60px" }}>
        <Grid container>
          <Grid item xs={6}>
            <Bar
              data={{
                labels: [
                  "Low stress level",
                  "Medium stress level",
                  "High stress level",
                  "Very high stress level",
                ],
                datasets: [
                  {
                    label: "Stress Levels",
                    data: [
                      lowStressCount,
                      mediumStressCount,
                      highStressCount,
                      veryHighStressCount,
                    ],
                    borderRadius: 7,
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    text: "Stress level categories",
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      </div>
      {/* graph section */}
    </div>
  );
}
