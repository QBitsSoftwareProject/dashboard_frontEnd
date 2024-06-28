import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import styles from "../pages/main.module.css";
import UpperNavBar from "../components/ui/upperNavBar/upperNavbar.jsx";
import SideNavbar from "../components/ui/sideNavBar/sideNavbar.jsx";
import { Grid } from "@mui/material";

// sections
import ResourceManagement from "./resource-management/resource-management.jsx";
import ViewAnalytics from "./analytics/view-analytics.jsx";
import ControlAccess from "./control-access/control-access.jsx";

import MindRelaxing from "../pages/mindRelaxingMethods/mindRelaxingMethod.jsx";
import MethodList from "../pages/mindRelaxingMethods/methodList.jsx";
import MethodUpdate from "../pages/mindRelaxingMethods/methodUpdate.jsx";
import TaskGoals from "../pages/task-Goals/task-Goals.jsx";

export default function Main() {
  const navigate = useNavigate();

  const handlePageChange = (newPageContent) => {
    navigate(`/${newPageContent}`);
  };

  return (
    <div className={styles.container}>
      <Grid container>
        <Grid item xs={3} className={styles.sideNavbarStyles}>
          <SideNavbar onPageChange={handlePageChange} />
        </Grid>
        <Grid item xs={9}>
            <div className={styles.upperNavBarStyles}>
            {/* <UpperNavBar /> */}
          </div>
          <div className={styles.content}>
            <Routes>
              <Route path="view-analytics" element={<ViewAnalytics />} />
              <Route path="manage-resources" element={<ResourceManagement />} />
              <Route path="user-control-access" element={<ControlAccess />} />
              <Route path="mind-relaxing-methods" element={<MindRelaxing onPageChange={handlePageChange} />} />
              <Route path="mind-relaxing-methods-list" element={<MethodList onPageChange={handlePageChange} />} />
              <Route path="mind-relaxing-methods-update/:id" element={<MethodUpdate onPageChange={handlePageChange} />} />
              <Route path="Task-Goals" element={<TaskGoals/>} />
            </Routes>
          </div>
        </Grid>
      </Grid>

    </div>
  );
}

