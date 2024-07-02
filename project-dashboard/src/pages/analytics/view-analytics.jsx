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
  getUsersByMonth,
} from "../../services/adminServices/adminServices";

// icons-black
import doctor from "../../assets/images/analytics_icons/doctor.png";
import patient from "../../assets/images/analytics_icons/patient.png";
import resource from "../../assets/images/analytics_icons/resource.png";
// icons-black

// icons-white
import doctorW from "../../assets/images/analytics_icons/doctor-white.png";
import patientW from "../../assets/images/analytics_icons/patient-white.png";
import resourceW from "../../assets/images/analytics_icons/resource-white.png";
// icons-white

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
  const [totalMarks, setTotalMarks] = useState(0);
  // stress level categories

  // fetching users by month
  const [regMonths, setRegMonths] = useState([]);

  useEffect(() => {
    const fetchUsersByMonth = async () => {
      try {
        const monthsData = [];
        for (let monthNo = 1; monthNo <= 12; monthNo++) {
          let response = await getUsersByMonth(monthNo);
          monthsData.push(response.data.userCount);
        }
        setRegMonths(monthsData);
      } catch (err) {
        console.log("Error fetching users by month, error: " + err.message);
      }
    };
    fetchUsersByMonth();
    console.log(regMonths);
  }, []);
  // fetching users by month

  useEffect(() => {
    const fetchAllMarks = async () => {
      try {
        let allMarks = await getAllMarks();
        let lowCount = 0;
        let mediumCount = 0;
        let highCount = 0;
        let veryHighCount = 0;
        let totalCount = allMarks.data.length;

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

        setLowStressCount((lowCount / totalCount) * 100);
        setMediumStressCount((mediumCount / totalCount) * 100);
        setHighStressCount((highCount / totalCount) * 100);
        setVeryHighStressCount((veryHighCount / totalCount) * 100);
        setTotalMarks(totalCount);
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: "12px" }}>Total number of patients</span>
            <span style={{ fontSize: "25px" }}>{patientCount} Patients</span>
          </div>
          {/* patient image */}
          <div className={styles.countImgBox}>
            <img
              src={patient}
              style={{
                width: "25px",
              }}
            />
          </div>
        </div>
        <div className={(styles.doctorCount, styles.count)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: "12px" }}>Total number of doctors</span>
            <span style={{ fontSize: "25px" }}>{doctorCount} Doctors</span>
          </div>
          <div className={styles.countImgBox}>
            <img
              src={doctor}
              style={{
                width: "25px",
              }}
            />
          </div>
        </div>
        <div className={(styles.resourceCount, styles.count)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: "12px" }}>Total number of resources</span>
            <span style={{ fontSize: "25px" }}>{resourceCount} Resources</span>
          </div>
          <div className={styles.countImgBox}>
            <img
              src={resource}
              style={{
                width: "25px",
              }}
            />
          </div>
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
                    backgroundColor: [
                      "rgb(11, 240, 240, 0.2)",
                      "rgb(11, 175, 240, 0.2)",
                      "rgb(11, 122, 240, 0.2)",
                      "rgb(11, 42, 240, 0.2)",
                    ],
                    borderColor: [
                      "rgb(11, 240, 240)",
                      "rgb(11, 175, 240)",
                      "rgb(11, 122, 240)",
                      "rgb(11, 42, 240)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    text: "Stress level categories",
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Stress Levels",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Percentage of Total Users",
                    },
                    ticks: {
                      callback: function (value) {
                        return value + "%"; // Add percentage symbol to the y-axis values
                      },
                    },
                  },
                },
              }}
            />
          </Grid>
          <Grid xs={6}>
            <Line
              data={{
                labels: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                datasets: [
                  {
                    label: "User registrations",
                    data: regMonths,
                    borderRadius: 7,
                    backgroundColor: [
                      "rgb(11, 240, 240, 0.2)",
                      "rgb(11, 175, 240, 0.2)",
                      "rgb(11, 122, 240, 0.2)",
                      "rgb(11, 42, 240, 0.2)",
                    ],
                    borderColor: [
                      "rgb(11, 240, 240)",
                      "rgb(11, 175, 240)",
                      "rgb(11, 122, 240)",
                      "rgb(11, 42, 240)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                elements: {
                  line: {
                    tension: 0.4,
                  },
                },
                plugins: {
                  title: {
                    text: "Monthly user registrations",
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Months",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Number of Registrations",
                    },
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
