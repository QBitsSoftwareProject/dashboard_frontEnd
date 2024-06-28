import React from "react";
import styles from "../analytics/view-analytics.module.css";

export default function ViewAnalytics() {
  return (
    <div>
      <h1>View-Analytics section</h1>
      <div className={styles.userAnalyticsContainer}>
        {/* patient count */}
        <div className={(styles.patientCount, styles.count)}>
          <span>96 Patients</span>
        </div>
        <div className={(styles.doctorCount, styles.count)}>
          <span>108 Doctors</span>
        </div>
        <div className={(styles.resourceCount, styles.count)}>
          <span>200 Resources</span>
        </div>
        {/* patient count */}
      </div>
    </div>
  );
}
