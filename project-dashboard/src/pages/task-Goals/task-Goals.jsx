import React, { useEffect, useState } from "react";
import styles from "./task-Goals.module.css";
import {
  Alert,
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";

import Modal from "@mui/material/Modal";

// dashboard buttons
import Dash_btn1 from "../../components/ui/dash_btn/dash_btn1";
import editIcon from "../../assets/images/TaskTable/editIcon.png";
import binIcon from "../../assets/images/TaskTable/binIcon.png";
import lookIcon from "../../assets/images/TaskTable/lookIcon.png";
// dashboard buttons

// table components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  createGoal,
  deleteGoal,
  editGoal,
  getAllGoals,
} from "../../services/adminServices/adminServices";
// table components

//loading animation
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";

import cancelIcon from "../../assets/images/dragAndDrop/cancel.png";

function createData(name, setDate, lastUpdate, actions) {
  return { name, setDate, lastUpdate, actions };
}

function TaskGoals() {
  const openNewTask = () => {
    document.getElementById("newTask").style.width = "100%";
  };

  const closeNewTask = () => {
    document.getElementById("newTask").style.width = "0%";
  };

  const openCheckTask = () => {
    document.getElementById("checkTask").style.width = "100%";
  };

  const openCheckGoal = () => {
    document.getElementById("checkGoal").style.width = "100%";
  };

  const closeCheckTask = () => {
    document.getElementById("checkTask").style.width = "0%";
  };

  const closeCheckGoal = () => {
    document.getElementById("checkGoal").style.width = "0%";
  };

  // create new goal

  const [goalLoading, setGoalLoading] = useState(false); // Loading state for creating a new goal
  const [finishNewGoal, setFinishNewGoal] = useState(false); // new goal finish state
  const [failedNewGoal, setFailedNewGoal] = useState(false); // new goal failed state

  const [goalTitle, setGoalTitle] = useState("");
  const [goalSubTitle, setGoalSubTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [goalCategory, setGoalCategory] = useState("");
  const [objectives, setObjectives] = useState([]);
  const [objective, setObjective] = useState("");
  const [timeDuration, setTimeDuration] = useState();
  const [timeCategory, setTimeCategory] = useState("");

  const handleObjectiveChange = (event) => {
    setObjective(event.target.value);
  };

  const handleGoalCategory = (event) => {
    setGoalCategory(event.target.value);
  };

  const handleTimeCategory = (event) => {
    setTimeCategory(event.target.value);
  };

  const handleTimeDuration = (event) => {
    setTimeDuration(event.target.value);
  };

  const goalDeleter = async () => {
    try {
      await deleteGoal(goalToDelete._id);
    } catch (err) {
      console.log("failed to delete goal", err.message);
    }
    setActionState(!actionState);
  };

  const [editedTime, setEditedTime] = useState("");

  const handleEditTimeDuration = (event) => {
    setEditedTime(event.target.value);
  };

  const editGoalData = async () => {
    setGoalTitle(goalToEdit.title);
    setGoalSubTitle(goalToEdit.subTitle);
    setGoalDescription(goalToEdit.description);
    setObjectives(goalToEdit.objectives);
    setEditedTime(goalToEdit.duration);
    setGoalCategory(goalToEdit.category);
  };

  const goalEditor = async () => {
    setGoalLoading(true);
    const goalObjectToEdit = {
      title: goalTitle,
      subTitle: goalSubTitle,
      description: goalDescription,
      objectives: objectives,
      completness: false,
      duration: timeDuration + " " + timeCategory,
      category: goalCategory,
    };
    try {
      console.log("editing selected goal...", goalObjectToEdit);
      await editGoal(goalToEdit._id, goalObjectToEdit);
      setFinishNewGoal(true);
    } catch (err) {
      setFailedNewGoal(true);
      alert("Failed to edit goal, error: " + err.message);
    }
  };

  const createNewGoal = async () => {
    setGoalLoading(true);
    const newGoal = {
      title: goalTitle,
      subTitle: goalSubTitle,
      description: goalDescription,
      objectives: objectives,
      completness: false,
      duration: editedTime,
      category: goalCategory,
    };
    try {
      console.log("Creating new goal...", newGoal);
      await createGoal(newGoal);
      setFinishNewGoal(true);
    } catch (err) {
      setFailedNewGoal(true);
      alert("Failed to create goal, error: " + err.message);
    }
    setGoalLoading(false);
    handleGoalCreatorClose();
  };

  // create new goal

  const actions = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
        height: 20,
      }}
    >
      <Tooltip title="Check" placement="left">
        <img
          src={lookIcon}
          className={styles.actionIcons}
          onClick={openCheckTask}
        />
      </Tooltip>
      <Tooltip title="Edit" placement="bottom">
        <img src={editIcon} className={styles.actionIcons} />
      </Tooltip>
      <Tooltip title="Delete" placement="right">
        <img src={binIcon} className={styles.actionIcons} />
      </Tooltip>
    </div>
  );

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  // actions
  const [goalToCheck, setGoalToCheck] = useState({});
  const [goalToEdit, setGoalToEdit] = useState({});
  const [goalToDelete, setGoalToDelete] = useState({});
  const [actionState, setActionState] = useState(false);
  // actions

  const [openGoalCreator, setOpenGoalCreator] = React.useState(false);

  //goal editor
  const [openGoalEditor, setOpenGoalEditor] = React.useState(false);

  const handleGoalCreatorClose = () => {
    setOpenGoalCreator(false);
  };

  const handleGoalEditorClose = () => {
    setOpenGoalEditor(false);
  };
  //goal editor

  const [tasks, setTasks] = useState([
    {
      name: "Task 001",
      description:
        "Eu aliqua laboris pariatur qui non consequat in officia et qui. Ullamco excepteur ipsum laboris cupidatat consectetur sit amet dolore sit aliquip. Qui voluptate sit ut culpa amet culpa anim. Laborum consectetur commodo non ipsum tempor ea qui nostrud est. Ea proident labore aliquip ad ad dolor eu ad ea nostrud amet labore dolore quis. Dolore mollit cillum enim est. Occaecat minim minim veniam incididunt occaecat deserunt irure commodo eu labore excepteur est enim.",
      setDate: "02/02/2024",
      lastUpdate: "02/03/2024",
      actions,
    },
  ]);

  const [goals, setGoals] = useState([]);

  // modal styles
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "15px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  // modal styles

  useEffect(() => {
    const fetchGoals = async () => {
      let response = await getAllGoals();
      if (response) {
        setGoals(response.data);
      }
    };
    fetchGoals();
  }, [finishNewGoal, actionState]);

  const checkBox = <Checkbox defaultChecked color="success" />;

  const rows = [
    createData("Task 001", "02/02/2024", "02/03/2024", actions),
    createData("Task 002", "02/02/2024", "02/03/2024", actions),
    createData("Task 003", "03/03/2024", "03/04/2024", actions),
    createData("Task 004", "04/04/2024", "04/05/2024", actions),
    createData("Task 005", "05/05/2024", "05/06/2024", actions),
    createData("Task 006", "05/05/2024", "05/06/2024", actions),
    createData("Task 007", "05/05/2024", "05/06/2024", actions),
    createData("Task 008", "05/05/2024", "05/06/2024", actions),
    createData("Task 009", "05/05/2024", "05/06/2024", actions),
    createData("Task 010", "05/05/2024", "05/06/2024", actions),
    createData("Task 011", "05/05/2024", "05/06/2024", actions),
    createData("Task 012", "05/05/2024", "05/06/2024", actions),
    createData("Task 013", "01/01/2024", "01/02/2024", actions),
  ];

  const [isGoalsChecked, setIsGoalsChecked] = useState(false);

  const handleGoalsCheckboxChange = () => {
    setIsGoalsChecked(!isGoalsChecked); // Toggle checkbox state
    setIsTasksChecked(!isTasksChecked); // Toggle checkbox state
  };

  const [isTasksChecked, setIsTasksChecked] = useState(true); // Initially checked

  const handleTasksCheckboxChange = () => {
    setIsTasksChecked(!isTasksChecked); // Toggle checkbox state
    setIsGoalsChecked(!isGoalsChecked); // Toggle checkbox state
  };

  return (
    <Grid container className={styles.mainContent}>
      {finishNewGoal && (
        <Snackbar
          open={finishNewGoal}
          autoHideDuration={5000}
          onClose={() => {
            setFinishNewGoal(false);
          }}
        >
          <Alert
            onClose={() => {
              setFinishNewGoal(false);
            }}
            severity="info"
            variant="filled"
            sx={{ width: "100%", color: "white" }}
          >
            New Goal created successfully
          </Alert>
        </Snackbar>
      )}
      {failedNewGoal && (
        <Snackbar
          open={failedNewGoal}
          autoHideDuration={6000}
          onClose={() => setFailedNewGoal(false)}
        >
          <Alert severity="error" onClose={() => setFailedNewGoal(false)}>
            Failed to create new goal, Please try again
          </Alert>
        </Snackbar>
      )}
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
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
                  id="Goals"
                  name="check"
                  checked={isGoalsChecked}
                  onChange={handleGoalsCheckboxChange}
                />
                <label for="Goals"></label>
              </div>
            </section>
            <h6>Goals</h6>
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
                  id="Tasks"
                  name="check"
                  checked={isTasksChecked}
                  onChange={handleTasksCheckboxChange}
                />
                <label for="Tasks"></label>
              </div>
            </section>
            <h6>TASKS</h6>
          </div>
        </Grid>
        <Grid
          item
          xs={9}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            justifyContent: "flex-end",
            paddingRight: 10,
          }}
        >
          {isTasksChecked ? (
            <Dash_btn1 btn_text="CREATE NEW TASK" callFunction={openNewTask} />
          ) : (
            <Dash_btn1
              btn_text="CREATE NEW GOAL"
              callFunction={setOpenGoalCreator}
            />
          )}
          <Dash_btn1 btn_text="DELETE SELECTED" />
        </Grid>
      </Grid>
      {/* topic */}
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "",
          alignItems: "center",
        }}
      >
        <Grid item xs={2} style={{ textAlign: "center" }}>
          <h5 style={{ color: "#A0A0A0" }}>
            {isTasksChecked ? "ALLOCATED TASKS" : "ALLOCATED GOALS"}
          </h5>
        </Grid>
        <Grid item xs={10}>
          <hr />
        </Grid>
      </Grid>
      {/* topic */}
      {isTasksChecked ? (
        // task table
        <div style={{ width: "100%", height: "70vh", overflowY: "scroll" }}>
          <Grid item xs={12}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      {" "}
                      Name{" "}
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Set Date
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Last update
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="left">
                        <Checkbox defaultChecked={false} />
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.setDate}</TableCell>
                      <TableCell align="center">{row.lastUpdate}</TableCell>
                      <TableCell align="center">{row.actions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </div>
      ) : (
        // task table
        // goals table
        <div style={{ width: "100%", height: "70vh", overflowY: "scroll" }}>
          <Grid item xs={12}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ fontWeight: "bold" }}>
                      {" "}
                      Goal Title{" "}
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Goal Category
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Current Rating
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {goals.map((goalRow) => (
                    <TableRow
                      key={goalRow.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="left">
                        <Checkbox defaultChecked={false} />
                        {goalRow.title}
                      </TableCell>
                      <TableCell align="center">{goalRow.category}</TableCell>
                      <TableCell align="center">
                        {goalRow.currentRating}
                      </TableCell>
                      <TableCell align="center">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: 20,
                            height: 20,
                          }}
                        >
                          <Tooltip title="Check" placement="left">
                            <img
                              src={lookIcon}
                              className={styles.actionIcons}
                              onClick={() => {
                                setGoalToCheck(goalRow);
                                openCheckGoal();
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Edit" placement="bottom">
                            <img
                              src={editIcon}
                              className={styles.actionIcons}
                              onClick={() => {
                                setGoalToEdit(goalRow);
                                setOpenGoalEditor(true);
                                editGoalData();
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Delete" placement="right">
                            <img
                              src={binIcon}
                              className={styles.actionIcons}
                              onClick={() => {
                                setGoalToDelete(goalRow);
                                goalDeleter();
                              }}
                            />
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </div>
        // goals table
      )}

      {/* creating new task */}
      <div id="newTask" className={styles.overlay}>
        {/* <!-- Button to close the overlay navigation --> */}
        <a
          href="javascript:void(0)"
          className={styles.closebtn}
          onClick={closeNewTask}
        >
          &times;
        </a>

        {/* <!-- Overlay content --> */}
        <div className={styles.overlay_content}>
          <div
            className={styles.newTaskForm}
            style={{ justifyContent: "flex-start" }}
          >
            <h5>CREATE NEW TASK</h5>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <TextField
                id="standard-basic"
                label="Task name"
                variant="standard"
                style={{ width: "100%" }}
                onChange={(event) => {
                  setTaskName(event.target.value);
                }}
              />
              <TextField
                id="standard-basic"
                label="Task description"
                variant="standard"
                style={{ width: "100%" }}
                onChange={(event) => {
                  setTaskDescription(event.target.value);
                }}
              />
              <h5>Task Description:</h5>
              <textarea id="myTextarea" className={styles.input_like} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: 20,
              }}
            >
              <Dash_btn1 btn_text="CREATE NEW TASK" />
            </div>
          </div>
        </div>
      </div>
      {/* creating new task */}

      {/* create goal modal */}
      <div>
        <Modal
          open={openGoalCreator}
          onClose={handleGoalCreatorClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box
            sx={{
              ...style,
              width: 800,
              paddingLeft: 5,
              paddingRight: 5,
              paddingTop: 3,
              paddingBottom: 3,
            }}
          >
            {goalLoading && (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <TextField
                id="standard-basic"
                label="Goal Title"
                variant="standard"
                style={{ width: "100%" }}
                onChange={(event) => {
                  setGoalTitle(event.target.value);
                }}
              />
              <TextField
                id="standard-basic"
                label="Goal Sub-Title"
                variant="standard"
                style={{ width: "100%" }}
                onChange={(event) => {
                  setGoalSubTitle(event.target.value);
                }}
              />
              <FormControl
                style={{ width: "100%", marginTop: 15 }}
                size="small"
              >
                <InputLabel id="demo-select-small-label">
                  Select Goal Category
                </InputLabel>
                <Select
                  labelId="demo-select-large-label"
                  id="goalCategory"
                  value={goalCategory}
                  label="duration"
                  style={{ height: "55px" }}
                  onChange={handleGoalCategory}
                >
                  <MenuItem value={"meditation"}>meditation</MenuItem>
                  <MenuItem value={"physicalActivity"}>
                    physical activity
                  </MenuItem>
                  <MenuItem value={"socialConnection"}>
                    social connection
                  </MenuItem>
                  <MenuItem value={"creativeExpression"}>
                    creative expression
                  </MenuItem>
                  <MenuItem value={"personalGrowth"}>personal growth</MenuItem>
                  <MenuItem value={"inspirationalContent"}>
                    inspirational content
                  </MenuItem>
                </Select>
              </FormControl>
              <textarea
                placeholder="Goal Description"
                id="myTextarea"
                style={{
                  marginTop: 10,
                  fontFamily: "inherit",
                  width: "100%",
                  height: "250px",
                  border: "solid #4990fb 1px",
                  borderRadius: "4px",
                  paddingLeft: "10px",
                  paddingTop: "10px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  resize: "none",
                  outline: "none",
                }}
                onChange={(event) => setGoalDescription(event.target.value)}
              />
              <span>Goal Objectives</span>
              <Grid item xs={12}>
                <div className={styles.tagsContainer}>
                  <div className={styles.tagDisplay}>
                    {objectives.map((oneObjective, index) => (
                      <div className={styles.tag} key={index}>
                        {oneObjective}
                        <img
                          src={cancelIcon}
                          style={{ width: "15px", cursor: "pointer" }}
                          onClick={() => {
                            const updatedObjectives = objectives.filter(
                              (item) => item !== oneObjective
                            );
                            setObjectives(updatedObjectives);
                          }}
                        />
                      </div>
                    ))}
                    <div className={styles.tagInput}>
                      <input
                        id="tgIn"
                        className={styles.tgIn}
                        placeholder="Enter goal objectives"
                        onChange={handleObjectiveChange}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            if (
                              !objectives.includes(
                                objective.trim().toLowerCase()
                              ) &&
                              objective.trim().length !== 0
                            ) {
                              setObjectives([
                                ...objectives,
                                objective.toLowerCase(),
                              ]);
                            }
                            document.getElementById("tgIn").value = "";
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Grid>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <span>Goal Duration :</span>
                <div style={{ display: "flex", gap: 20, width: "60%" }}>
                  <TextField
                    type="number"
                    style={{ width: "30%" }}
                    inputProps={{ min: 0 }}
                    onChange={handleTimeDuration}
                  />
                  <FormControl style={{ width: "60%" }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Select Time Period
                    </InputLabel>
                    <Select
                      labelId="demo-select-large-label"
                      id="timeCategory"
                      value={timeCategory}
                      label="duration"
                      style={{ height: "55px" }}
                      onChange={handleTimeCategory}
                    >
                      <MenuItem value={"days"}>Days</MenuItem>
                      <MenuItem value={"weeks"}>Weeks</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className={styles.createGoalBtn} onClick={createNewGoal}>
                  Create Goal
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      {/* create goal modal */}

      {/* edit goal modal */}
      <div>
        <Modal
          open={openGoalEditor}
          onClose={handleGoalEditorClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box
            sx={{
              ...style,
              width: 800,
              paddingLeft: 5,
              paddingRight: 5,
              paddingTop: 3,
              paddingBottom: 3,
            }}
          >
            {goalLoading && (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <TextField
                id="standard-basic"
                label="Goal Title"
                variant="standard"
                value={goalToEdit.title}
                style={{ width: "100%" }}
                onChange={(event) => {
                  setGoalTitle(event.target.value);
                }}
              />
              <TextField
                id="standard-basic"
                label="Goal Sub-Title"
                variant="standard"
                value={goalToEdit.subTitle}
                style={{ width: "100%" }}
                onChange={(event) => {
                  setGoalSubTitle(event.target.value);
                }}
              />
              <FormControl
                style={{ width: "100%", marginTop: 15 }}
                size="small"
              >
                <InputLabel id="demo-select-small-label">
                  Select Goal Category
                </InputLabel>
                <Select
                  labelId="demo-select-large-label"
                  id="goalCategory"
                  value={goalToEdit.category}
                  label="duration"
                  style={{ height: "55px" }}
                  onChange={handleGoalCategory}
                >
                  <MenuItem value={"meditation"}>meditation</MenuItem>
                  <MenuItem value={"physicalActivity"}>
                    physical activity
                  </MenuItem>
                  <MenuItem value={"socialConnection"}>
                    social connection
                  </MenuItem>
                  <MenuItem value={"creativeExpression"}>
                    creative expression
                  </MenuItem>
                  <MenuItem value={"personalGrowth"}>personal growth</MenuItem>
                  <MenuItem value={"inspirationalContent"}>
                    inspirational content
                  </MenuItem>
                </Select>
              </FormControl>
              <textarea
                placeholder="Goal Description"
                id="myTextarea"
                value={goalToEdit.description}
                style={{
                  marginTop: 10,
                  fontFamily: "inherit",
                  width: "100%",
                  height: "250px",
                  border: "solid #4990fb 1px",
                  borderRadius: "4px",
                  paddingLeft: "10px",
                  paddingTop: "10px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  resize: "none",
                  outline: "none",
                }}
                onChange={(event) => setGoalDescription(event.target.value)}
              />
              <span>Goal Objectives</span>
              <Grid item xs={12}>
                <div className={styles.tagsContainer}>
                  <div className={styles.tagDisplay}>
                    {(goalToEdit.objectives
                      ? goalToEdit.objectives
                      : objectives
                    ).map((oneObjective, index) => (
                      <div className={styles.tag} key={index}>
                        {oneObjective}
                        <img
                          src={cancelIcon}
                          style={{ width: "15px", cursor: "pointer" }}
                          onClick={() => {
                            const updatedObjectives = objectives.filter(
                              (item) => item !== oneObjective
                            );
                            setObjectives(updatedObjectives);
                          }}
                        />
                      </div>
                    ))}
                    <div className={styles.tagInput}>
                      <input
                        id="tgIn"
                        className={styles.tgIn}
                        placeholder="Enter goal objectives"
                        onChange={handleObjectiveChange}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            if (
                              (goalToEdit.objectives
                                ? goalToEdit.objectives
                                : objectives
                              ).includes(objective.trim().toLowerCase()) &&
                              objective.trim().length !== 0
                            ) {
                              setObjectives([
                                ...goalToEdit.objectives,
                                objective.toLowerCase(),
                              ]);
                            }
                            document.getElementById("tgIn").value = "";
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Grid>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <span>Goal Duration :</span>
                <div style={{ display: "flex", gap: 20, width: "60%" }}>
                  <TextField
                    style={{ width: "60%" }}
                    inputProps={{ min: 0 }}
                    value={goalToEdit.duration}
                    onChange={handleEditTimeDuration}
                  />
                </div>
                <div className={styles.createGoalBtn} onClick={goalEditor}>
                  Edit Goal
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      {/* edit goal modal */}

      {/* check task */}
      <div id="checkTask" className={styles.overlay}>
        {/* <!-- Button to close the overlay navigation --> */}
        <a
          href="javascript:void(0)"
          className={styles.closebtn}
          onClick={closeCheckTask}
        >
          &times;
        </a>

        {/* <!-- Overlay content --> */}
        <div className={styles.overlay_content}>
          <div
            className={styles.newTaskForm}
            style={{ justifyContent: "flex-start" }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <h5 style={{ width: "130px" }}>Task name :</h5>
                  <span>TASK 001</span>
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 10,
                  }}
                >
                  <h5 style={{ width: "550px" }}>Task description :</h5>
                  <span>
                    "Find a quiet, comfortable spot. Close your eyes and take
                    deep breaths. Focus on your breath, letting go of any
                    thoughts. Stay present in the moment. Start with just a few
                    minutes and gradually increase the duration as you feel more
                    comfortable. Meditation can help calm the mind and reduce
                    stress, promoting mental well-being."
                  </span>
                </div>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </div>
        </div>
      </div>
      {/* check task */}
      {/* check goal */}
      <div id="checkGoal" className={styles.overlay}>
        {/* <!-- Button to close the overlay navigation --> */}
        <a
          href="javascript:void(0)"
          className={styles.closebtn}
          onClick={closeCheckGoal}
        >
          &times;
        </a>

        {/* <!-- Overlay content --> */}
        <div className={styles.overlay_content}>
          <div
            className={styles.newTaskForm}
            style={{ justifyContent: "flex-start" }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <h5 style={{ width: "130px" }}>Goal name :</h5>
                  <span>{goalToCheck.title}</span>
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 10,
                  }}
                >
                  <h5 style={{ width: "220px" }}>Goal description :</h5>
                  <span>{goalToCheck.description}</span>
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <h5 style={{ width: "130px" }}>Goal category :</h5>
                  <span>{goalToCheck.category}</span>
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <h5 style={{ width: "130px" }}>Current Rating :</h5>
                  <span>{goalToCheck.currentRating}</span>
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <h5 style={{ width: "130px" }}>Duration :</h5>
                  <span>{goalToCheck.duration}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <h5 style={{ width: "130px" }}>Goal Objectives :</h5>
                  {/* {goalToCheck.objectives} */}
                  <span>
                    {goalToCheck.objectives?.map((objective, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: "rgba(0,0,0,0.7)",
                          color: "white",
                          marginRight: 10,
                          paddingTop: 5,
                          paddingBottom: 5,
                          paddingLeft: 10,
                          paddingRight: 10,
                          borderRadius: 100,
                          fontSize: 14,
                        }}
                      >
                        {objective}
                      </span>
                    ))}
                  </span>
                </div>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </div>
        </div>
      </div>
      {/* check goal */}
    </Grid>
  );
}

export default TaskGoals;
