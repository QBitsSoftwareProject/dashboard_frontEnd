import React, { useEffect, useState } from "react";
import styles from "../control-access/control-access.module.css";
import {
  Avatar,
  Box,
  Grid,
  Modal,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";

import {
  editDoctor,
  editDoctorAccess,
  editUserAccess,
  getAllDoctors,
  getCompletedtDoctorAppointmentCount,
  getDoctorAppointmentCount,
  getPost,
  getReports,
  getUser,
} from "../../services/adminServices/adminServices";

import Swal from "sweetalert2";
import LoadingScreen from "../../components/ui/loadingScreen/LoadingScreen";

export default function ControlAccess() {
  const [doctorList, setDoctorList] = useState([]);

  const [docAppointmentCount, setDocAppointmentCount] = useState();

  const [docCompletedAppointmentCount, SetDocCompletedAppointmentCount] =
    useState();

  const [openDoctorModal, setOpenDoctorModal] = React.useState(false);

  const [openReportModal, setOpenReportModal] = React.useState(false);

  const [doctorBlockState, setDoctorBlockState] = React.useState();

  const [userBlockState, setUserBlockState] = React.useState(null);

  const [reportList, setReportList] = useState([]);

  const [actionState, setActionState] = useState(false);

  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      setLoadingState(true);
      try {
        let allDoctorList = await getAllDoctors();
        if (allDoctorList) {
          setDoctorList(allDoctorList.data);
          setLoadingState(false);
        }
      } catch (err) {
        console.log("error fetching doctor details,error:" + err.message);
      }
    };
    fetchDoctorInfo();
  }, [actionState]);

  useEffect(() => {
    const fetchReportInfo = async () => {
      setLoadingState(true);
      try {
        let reportList = await getReports();
        if (reportList) {
          setReportList(reportList.data);
          setLoadingState(false);
        }
      } catch (err) {
        console.log("error fetching report details,error:" + err.message);
      }
    };
    fetchReportInfo();
   
  }, [actionState]);

  useEffect(() => {
    const getAppointmentCount = async () => {
      try {
        let docAppointmentCount = await getDoctorAppointmentCount(
          doctorToCheck._id
        );
        let docCompletedAppointmentCount =
          await getCompletedtDoctorAppointmentCount(doctorToCheck._id);
        console.log("doctor appointment count:", docAppointmentCount);
        console.log(
          "doctor completed appointment count:",
          docCompletedAppointmentCount
        );
        setDocAppointmentCount(docAppointmentCount.data);
        SetDocCompletedAppointmentCount(docCompletedAppointmentCount.data);
      } catch (err) {
        console.log(
          "error fetching doctor appointment count, error:" + err.message
        );
      }
    };
    getAppointmentCount();
  }, [actionState]);

  const [isDoctorsChecked, setIsDoctorsChecked] = useState(true);

  const handleDoctorsCheckboxChange = () => {
    setIsDoctorsChecked(!isDoctorsChecked); // Toggle checkbox state
    setIsUsersChecked(!isUsersChecked); // Toggle checkbox state
  };

  const [isUsersChecked, setIsUsersChecked] = useState(false); // Initially checked

  const handleUsersCheckboxChange = () => {
    setIsUsersChecked(!isUsersChecked); // Toggle checkbox state
    setIsDoctorsChecked(!isDoctorsChecked); // Toggle checkbox state
  };

  // modal styles
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  // modal styles

  const handleOpenDoctorModalClose = async () => {
    setOpenDoctorModal(false);
    setActionState(!actionState);
  };

  const handleOpenReportModalClose = async () => {
    setOpenReportModal(false);
    setActionState(!actionState);
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function CustomTabPanel2(props) {
    const { children, value2, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value2 !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value2 === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);

  function a11yProps2(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value2, setValue2] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };

  const [doctorToCheck, setDoctorToCheck] = useState({});

  const [reportToCheck, setReportToCheck] = useState({});
  const [reportingUser, setReportingUser] = useState({});
  const [reportedUser, setReportedUser] = useState({});
  const [reportingPost, setReportingPost] = useState({});

  const getUserAndPostInfo = async (report) => {
    setReportToCheck(report);
    let user1 = await getUser(report.ReportingUser); // Reporting User
    let user2 = await getUser(report.ReportedUser); // Reported User
    let post = await getPost(report.ReportedPost); // reported Post
    setReportingUser(user1.data);
    setReportedUser(user2.data);
    if (post) {
      setReportingPost(post.data);
    }
    setUserBlockState(user2.data.access);
  };

  const completeRegistration = async () => {
    let newDoctorRegStatus = { regStatus: true };
    try {
      await editDoctor(doctorToCheck._id, newDoctorRegStatus);
      handleOpenDoctorModalClose();
      Swal.fire({
        title: "Registration Complete",
        text: "Doctor has been registered successfully.",
        icon: "success",
      });
    } catch (err) {
      console.log("error editing registration status,error: " + err.message);
    }
  };

  const changeDoctorAccess = async () => {
    let newAccessStatus = !doctorBlockState;
    let newAccess = { access: newAccessStatus };
    setDoctorBlockState(newAccessStatus);
    try {
      await editDoctorAccess(doctorToCheck._id, newAccess);
      setActionState(!actionState);
      handleOpenDoctorModalClose();
    } catch (err) {
      console.log("error editing doctor access status,error: " + err.message);
    }
  };

  const changeUserAccess = async () => {
    let newAccessStatus = !userBlockState;
    let newAccess = { access: newAccessStatus };
    setUserBlockState(newAccessStatus);
    try {
      await editUserAccess(reportedUser._id, newAccess);
      setActionState(!actionState);
      // handleOpenReportModalClose();
    } catch (err) {
      console.log("error editing user access status,error: " + err.message);
    }
  };
  console.log(actionState)

  return (
    <>
      {/* modals */}

      {/* doctor modal */}
      {doctorToCheck ? (
        <div>
          <Modal
            open={openDoctorModal}
            onClose={handleOpenDoctorModalClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box
              sx={{
                ...style,
                width: 800,
                paddingLeft: 5,
                height: "fit-content",
                paddingRight: 5,
                paddingTop: 3,
                paddingBottom: 9,
                border: "none",
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Tabs
                      value={value2}
                      onChange={handleChange2}
                      aria-label="basic tabs example"
                    >
                      <Tab label="DOCTOR DETAILS" {...a11yProps2(0)} />
                      <Tab label="REGISTRATION" {...a11yProps2(1)} />
                    </Tabs>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {doctorBlockState ? (
                      <span style={{ color: "green", marginRight: 20 }}>
                        GRANTED
                      </span>
                    ) : (
                      <span style={{ color: "red", marginRight: 20 }}>
                        BLOCKED
                      </span>
                    )}
                    <label className={styles.switch}>
                      <input
                        checked={doctorBlockState}
                        type="checkbox"
                        onChange={() => {
                          changeDoctorAccess();
                        }}
                      />
                      <span className={styles.slider}></span>
                      <span className={styles.knob}></span>
                    </label>
                  </div>
                </div>
              </Box>

              {/* doctor details section */}
              <CustomTabPanel2 value2={value2} index={0}>
                <Grid
                  container
                  style={{
                    overflowY: "scroll",
                    height: "auto",
                  }}
                >
                  <Grid
                    item
                    xs={9}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 25,
                    }}
                  >
                    <div>
                      <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                        Doctor name :{" "}
                      </span>
                      <span>{doctorToCheck.userName}</span>
                    </div>
                    <div>
                      <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                        Doctor Bio :{" "}
                      </span>
                      <span>{doctorToCheck.bio}</span>
                    </div>
                    <div>
                      <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                        Doctor Qualification :{" "}
                      </span>
                      <span>{doctorToCheck.qualification}</span>
                    </div>
                    <div>
                      <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                        Email :{" "}
                      </span>
                      <span>{doctorToCheck.email}</span>
                    </div>
                    <div>
                      <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                        Contact No :{" "}
                      </span>
                      <span>{doctorToCheck.contactNumber}</span>
                    </div>
                    <div>
                      <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                        Address :{" "}
                      </span>
                      <span>{doctorToCheck.address}</span>
                    </div>
                    <div>
                      <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                        City :{" "}
                      </span>
                      <span>{doctorToCheck.city}</span>
                    </div>
                    <div>
                      <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                        Country :{" "}
                      </span>
                      <span>{doctorToCheck.country}</span>
                    </div>
                    <div>
                      <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                        Total number of appointments :{" "}
                      </span>
                      <span>
                        {docAppointmentCount}
                        {docAppointmentCount == 1
                          ? " appointment"
                          : " appointments"}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                        Completed appointments :{" "}
                      </span>
                      <span>
                        {docCompletedAppointmentCount}
                        {docCompletedAppointmentCount == 1
                          ? " appointment"
                          : " appointments"}
                      </span>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      height: 300,
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      sx={{
                        width: 150,
                        height: 150,
                      }}
                      src={doctorToCheck.proPic}
                    />
                    <span style={{ marginTop: "20px", textAlign: "center" }}>
                      {doctorToCheck.userName}
                    </span>
                    <span style={{ marginTop: "20px" }}>
                      <>
                        {doctorToCheck.regStatus ? (
                          <div
                            style={{
                              color: "rgb(24, 178, 24)",
                              backgroundColor: "rgb(17, 221, 17, 0.1)",
                              fontWeight: "bold",
                              padding: "10px",
                              borderRadius: "5px",
                            }}
                          >
                            REGISTERED
                          </div>
                        ) : (
                          <div
                            style={{
                              color: "rgb(227, 122, 17)",
                              backgroundColor: "rgba(238, 154, 10, 0.2)",
                              fontWeight: "bold",
                              padding: "7px",
                              borderRadius: "5px",
                            }}
                          >
                            NOT REGISTERED
                          </div>
                        )}
                      </>
                    </span>
                  </Grid>
                </Grid>
              </CustomTabPanel2>
              {/* doctor details section */}

              <CustomTabPanel2 value2={value2} index={1}>
                <Grid container>
                  <Grid item container xs={12} style={{ height: "400px" }}>
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <span>LICENSE SIDE 1</span>
                      <br />
                      <img
                        src={doctorToCheck.licenseSide1}
                        style={{ width: "250px" }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <span>LICENSE SIDE 2</span>
                      <br />
                      <img
                        src={doctorToCheck.licenseSide2}
                        style={{ width: "250px" }}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    xs={12}
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    {doctorToCheck.regStatus ? (
                      <div
                        style={{
                          padding: "10px",
                          width: "70%",
                          color: "green",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "10px",
                        }}
                      >
                        REGISTRATION COMPLETE
                      </div>
                    ) : (
                      <div
                        className={styles.completeRegBtn}
                        onClick={completeRegistration}
                      >
                        COMPLETE REGISTRATION
                      </div>
                    )}
                  </Grid>
                </Grid>
              </CustomTabPanel2>
            </Box>
          </Modal>
        </div>
      ) : null}
      {/* doctor modal */}

      {/* report modal */}
      {reportToCheck ? (
        <div>
          <Modal
            open={openReportModal}
            onClose={handleOpenReportModalClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box
              sx={{
                ...style,
                width: 800,
                paddingLeft: 5,
                height: 530,
                paddingRight: 5,
                paddingTop: 3,
                paddingBottom: 9,
                border: "none",
              }}
            >
              <div>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="POST DETAILS" {...a11yProps(0)} />
                  <Tab label="REPORTING USER DETAILS" {...a11yProps(1)} />
                  <Tab label="REPORTED USER DETAILS" {...a11yProps(2)} />
                </Tabs>
              </div>

              {/* reporting post details details section */}
              <CustomTabPanel value={value} index={0}>
                <Grid container>
                  {/* post details */}
                  <Grid item xs={12} style={{ height: "200px" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={reportingPost.image}
                        style={{ width: "400px", borderRadius: "10px" }}
                      />
                    </div>
                    <div style={{ marginTop: "30px" }}>
                      <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                        Report statement :{" "}
                      </span>
                      <span>{reportToCheck.ReportStatement}</span>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                        Post description :{" "}
                      </span>
                      <span>{reportingPost.description}</span>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                        Post category :{" "}
                      </span>
                      <span>{reportingPost.postCategory}</span>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                        Reported on :{" "}
                      </span>
                      <span>
                        {new Date(reportingPost.createdAt).getUTCFullYear() +
                          " / " +
                          (new Date(reportingPost.createdAt).getUTCMonth() +
                            1) +
                          " / " +
                          new Date(reportingPost.createdAt).getUTCDate()}
                      </span>
                    </div>
                  </Grid>
                </Grid>
              </CustomTabPanel>
              {/* reporting post details section */}

              {/* reporting user details */}
              <CustomTabPanel value={value} index={1}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={reportingUser.proPic}
                    sx={{ width: 200, height: 200 }}
                  />
                </div>
                <div style={{ marginTop: "60px" }}>
                  <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                    Reporting user :{" "}
                  </span>
                  <span>{reportingUser.fullName}</span>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                    Email :{" "}
                  </span>
                  <span>{reportingUser.email}</span>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                    Contact number :{" "}
                  </span>
                  <span>{reportingUser.contactNumber}</span>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                    Address :{" "}
                  </span>
                  <span>{reportingUser.address}</span>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                    Country :{" "}
                  </span>
                  <span>{reportingUser.country}</span>
                </div>
                <div></div>
              </CustomTabPanel>
              {/* reporting user details */}

              {/* reported user details */}
              <CustomTabPanel value={value} index={2}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={reportedUser.proPic}
                    sx={{ width: 200, height: 200 }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "20px",
                      gap: 10,
                    }}
                  >
                    {userBlockState ? (
                      <span style={{ color: "green" }}>GRANTED</span>
                    ) : (
                      <span style={{ color: "red" }}>BLOCKED</span>
                    )}
                    {userBlockState != null && (
                      <label className={styles.switch}>
                        <input
                          checked={userBlockState}
                          type="checkbox"
                          onChange={() => {
                            changeUserAccess();
                            setActionState(!actionState);
                          }}
                        />
                        <span className={styles.slider}></span>
                        <span className={styles.knob}></span>
                      </label>
                    )}
                  </div>
                </div>
                <div style={{ marginTop: "30px" }}>
                  <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                    Reported user :{" "}
                  </span>
                  <span>{reportedUser.fullName}</span>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                    Email :{" "}
                  </span>
                  <span>{reportedUser.email}</span>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                    Contact number :{" "}
                  </span>
                  <span>{reportedUser.contactNumber}</span>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                    Address :{" "}
                  </span>
                  <span>{reportedUser.address}</span>
                </div>
                <div style={{ marginTop: "20px", marginBottom: "30px" }}>
                  <span style={{ color: "#0997f6", fontWeight: "bold" }}>
                    Country :{" "}
                  </span>
                  <span>{reportedUser.country}</span>
                </div>
              </CustomTabPanel>
              {/* reported user details */}
            </Box>
          </Modal>
        </div>
      ) : null}
      {/* report modal */}

      {/* modals */}
      <div>
        <div>
          {/* state checkbox */}
          <Grid item xs={3} style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                padding: 5,
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <section title=".roundedOne">
                <div className={styles.roundedOne}>
                  <input
                    type="checkbox"
                    id="doctors"
                    name="check"
                    checked={isDoctorsChecked}
                    onChange={handleDoctorsCheckboxChange}
                  />
                  <label for="doctors"></label>
                </div>
              </section>
              <h6>DOCTORS</h6>
            </div>
            <div
              style={{
                padding: 5,
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <section title=".roundedOne">
                <div className={styles.roundedOne}>
                  <input
                    type="checkbox"
                    value="None"
                    id="users"
                    name="check"
                    checked={isUsersChecked}
                    onChange={handleUsersCheckboxChange}
                  />
                  <label for="users"></label>
                </div>
              </section>
              <h6>REPORTS</h6>
            </div>
          </Grid>
          {/* state checkbox */}
        </div>
        <div style={{ width: "100%", height: "70vh", overflowY: "scroll" }}>
          {isDoctorsChecked ? (
            // doctor table
            loadingState ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LoadingScreen />
              </div>
            ) : (
              <Grid item xs={12}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left" style={{ fontWeight: "bold" }}>
                          {" "}
                          Doctor{" "}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}
                        >
                          Qualification
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}
                        >
                          Email
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}
                        >
                          Country
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}
                        >
                          Status
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}
                        >
                          Access
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold" }}
                        ></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {doctorList.map((doctor, index) => {
                        return (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row" align="left">
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  gap: 20,
                                }}
                              >
                                <Avatar alt="Remy Sharp" src={doctor.proPic} />
                                {doctor.fullName}
                              </div>
                            </TableCell>
                            <TableCell align="center">
                              {doctor.qualification}
                            </TableCell>
                            <TableCell align="center">{doctor.email}</TableCell>
                            <TableCell align="center">
                              {doctor.country}
                            </TableCell>
                            <TableCell align="center">
                              <>
                                {doctor.regStatus ? (
                                  <div
                                    style={{
                                      color: "rgb(24, 178, 24)",
                                      backgroundColor: "rgb(17, 221, 17, 0.1)",
                                      fontWeight: "bold",
                                      padding: "7px",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    REGISTERED
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      color: "rgb(227, 122, 17)",
                                      backgroundColor:
                                        "rgba(238, 154, 10, 0.2)",
                                      fontWeight: "bold",
                                      padding: "7px",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    NOT REGISTERED
                                  </div>
                                )}
                              </>
                            </TableCell>
                            <TableCell align="center">
                              {doctor.access ? (
                                <div>GRANTED</div>
                              ) : (
                                <div>BLOCKED</div>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              <span
                                style={{ color: "#0997f6", cursor: "pointer" }}
                                onClick={() => {
                                  setDoctorToCheck(doctor);
                                  console.log(doctor._id);
                                  setDoctorBlockState(doctor.access);
                                  setActionState(!actionState);
                                  setOpenDoctorModal(true);
                                }}
                              >
                                VIEW MORE
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )
          ) : // doctor table
          loadingState ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LoadingScreen />
            </div>
          ) : (
            // user table
            <Grid item xs={12}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" style={{ fontWeight: "bold" }}>
                        {" "}
                        Report statement{" "}
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        Reported date
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bold" }}
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reportList.map((report, index) => {
                      return (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="left">
                            {report.ReportStatement}
                          </TableCell>
                          <TableCell align="center">
                            {new Date(report.createdAt).getUTCFullYear() +
                              " / " +
                              (new Date(report.createdAt).getUTCMonth() + 1) +
                              " / " +
                              new Date(report.createdAt).getUTCDate()}
                          </TableCell>
                          <TableCell align="center">
                            <span
                              style={{ color: "#0997f6", cursor: "pointer" }}
                              onClick={() => {
                                getUserAndPostInfo(report);
                                setActionState(!actionState);
                                setOpenReportModal(true);
                              }}
                            >
                              VIEW MORE
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            // user table
          )}
        </div>
      </div>
    </>
  );
}
