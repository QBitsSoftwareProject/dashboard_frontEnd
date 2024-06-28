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
  geCompletedtDoctorAppointmentCount,
  getAllDoctors,
  getDoctorAppointmentCount,
  getReports,
} from "../../services/adminServices/adminServices";

import Swal from "sweetalert2";
import LoadingScreen from "../../components/ui/loadingScreen/LoadingScreen";

export default function ControlAccess() {
  const [doctorList, setDoctorList] = useState([]);
  const [docAppointmentCount, setDocAppointmentCount] = useState();
  const [docCompletedAppointmentCount, SetDocCompletedAppointmentCount] =
    useState();

  const [openDoctorModal, setOpenDoctorModal] = React.useState(false);
  const [blockState, setBlockState] = React.useState(false);

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
          await geCompletedtDoctorAppointmentCount(doctorToCheck._id);
        if (docAppointmentCount.data != 0) {
          setDocAppointmentCount(docAppointmentCount.data);
        }
        if (docCompletedAppointmentCount.data != 0) {
          SetDocCompletedAppointmentCount(docCompletedAppointmentCount.data);
        }
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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [doctorToCheck, setDoctorToCheck] = useState({});

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
    let newAccessStatus = !blockState;
    let newAccess = { access: newAccessStatus };
    setBlockState(newAccessStatus);
    try {
      await editDoctorAccess(doctorToCheck._id, newAccess);
      setActionState(!actionState);
      handleOpenDoctorModalClose();
    } catch (err) {
      console.log("error editing doctor access status,error: " + err.message);
    }
  };

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
                height: 530,
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
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="DOCTOR DETAILS" {...a11yProps(0)} />
                      <Tab label="REGISTRATION" {...a11yProps(1)} />
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
                    {blockState ? (
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
                        checked={blockState}
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
              <CustomTabPanel value={value} index={0}>
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
                      <span>{doctorToCheck.fullName}</span>
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
                    <span style={{ marginTop: "20px" }}>
                      {doctorToCheck.fullName}
                    </span>
                    <span style={{ marginTop: "20px" }}>
                      <>
                        {doctorToCheck.regStatus ? (
                          <div style={{ color: "green" }}>REGISTERED</div>
                        ) : (
                          <div style={{ color: "red" }}>NOT REGISTERED</div>
                        )}
                      </>
                    </span>
                  </Grid>
                </Grid>
              </CustomTabPanel>
              {/* doctor details section */}

              <CustomTabPanel value={value} index={1}>
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
              </CustomTabPanel>
            </Box>
          </Modal>
        </div>
      ) : null}

      {/* doctor modal */}

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
              <h6>USERS</h6>
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
                                  <div style={{ color: "#09e535" }}>
                                    REGISTERED
                                  </div>
                                ) : (
                                  <div style={{ color: "#e10d0d" }}>
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
                                  setBlockState(doctor.access);
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
                            {report.createdAt}
                          </TableCell>
                          <TableCell align="center">
                            <span
                              style={{ color: "#0997f6", cursor: "pointer" }}
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
