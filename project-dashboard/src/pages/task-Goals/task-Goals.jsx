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
import Swal from "sweetalert2";

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
  createTask,
  deleteGoal,
  deleteTask,
  editGoal,
  editTask,
  getAllGoals,
  getAllTasks,
} from "../../services/adminServices/adminServices";
// table components

//loading animation
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";

import cancelIcon from "../../assets/images/dragAndDrop/cancel.png";
import LoadingScreen from "../../components/ui/loadingScreen/LoadingScreen";

function createData(name, setDate, lastUpdate, actions) {
  return { name, setDate, lastUpdate, actions };
}

function TaskGoals() {
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
  const [timeDuration, setTimeDuration] = useState();
  const [timeCategory, setTimeCategory] = useState("");

  // GOAL OBJECTIVES
  const [goalObjectives, setGoalObjectives] = useState([]);
  const [goalObjective, setGoalObjective] = useState("");
  const [objectives, setObjectives] = useState([]);
  const [objective, setObjective] = useState("");

  // selection deletes
  const [selectedTask, setSelectedTask] = useState({});
  const [selectedGoal, setSelectedGoal] = useState({});
  const [taskSelectionList, setTaskSelectionList] = useState([]);
  const [goalSelectionList, setGoalSelectionList] = useState([]);
  // selection deletes

  const handleObjectiveChange = (event) => {
    setObjective(event.target.value);
  };

  const handleGoalObjective = (event) => {
    setGoalObjective(event.target.value);
  };
  // GOAL OBJECTIVES

  const handleGoalCategory = (event) => {
    setGoalCategory(event.target.value);
  };

  const handleTimeCategory = (event) => {
    setTimeCategory(event.target.value);
  };

  const handleTimeDuration = (event) => {
    setTimeDuration(event.target.value);
  };

  const [editedTime, setEditedTime] = useState("");

  const handleEditTimeDuration = (event) => {
    setEditedTime(event.target.value);
  };

  const editGoalData = (goal) => {
    setGoalTitle(goal.title);
    setGoalSubTitle(goal.subTitle);
    setGoalDescription(goal.description);
    setObjectives(goal.objectives);
    setEditedTime(goal.duration);
    setGoalCategory(goal.category);
  };

  const editTaskData = async (task) => {
    setHeadText(task.headText);
    setHeadSubText(task.subText);
    setTaskDay(task.day);
    setTaskNumber(task.taskNumber);
    setTaskDuration(task.duration);
    setTaskStepList(task.steps);
  };

  const taskEditor = async () => {
    let taskIdToEdit = taskToEdit._id;
    const editedTask = {
      headText: headText,
      subText: headSubText,
      steps: taskStepList,
      duration: taskDuration,
      day: taskDay,
      taskNumber: taskNumber,
    };
    try {
      // console.log("Editing task...", editedTask);
      await editTask(taskIdToEdit, editedTask);
      setOpenTaskEditor(false);
      setActionState(!actionState);
    } catch (err) {
      console.log("failed to edit task, error:" + err.message);
    }
  };

  const taskDeletor = async (taskIdToDelete) => {
    Swal.fire({
      title: "Are you sure you want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0066ff",
      cancelButtonColor: "rgb(0, 102, 255,0.5)",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTask(taskIdToDelete);
          setActionState(!actionState);
          Swal.fire({
            title: "Deleted!",
            text: "Task has been deleted.",
            icon: "success",
          });
        } catch (err) {
          console.log("failed to delete task,error: " + err.message);
        }
      }
    });
  };

  const goalDeleter = async (goalIdToDelete) => {
    Swal.fire({
      title: "Are you sure you want to delete this goal?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0066ff",
      cancelButtonColor: "rgb(0, 102, 255,0.5)",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteGoal(goalIdToDelete);
          setActionState(!actionState);
          Swal.fire({
            title: "Deleted!",
            text: "Goal has been deleted.",
            icon: "success",
          });
        } catch (err) {
          console.log("failed to delete goal", err.message);
        }
      }
    });
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setTaskSelectionList([...taskSelectionList, selectedTask._id]);
    } else {
      const updatedTaskSelectionList = taskSelectionList.filter(
        (item) => item !== selectedTask._id
      );
      setTaskSelectionList(updatedTaskSelectionList);
    }
    console.log(taskSelectionList);
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
      setGoalLoading(false);
      setActionState(!actionState);
    } catch (err) {
      setFailedNewGoal(true);
      setGoalLoading(false);
      setActionState(!actionState);
      alert("Failed to edit goal, error: " + err.message);
    }
  };

  const createNewGoal = async () => {
    setGoalLoading(true);
    const newGoal = {
      title: goalTitle,
      subTitle: goalSubTitle,
      description: goalDescription,
      objectives: goalObjectives,
      completness: false,
      duration: timeDuration,
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

  // actions
  const [goalToCheck, setGoalToCheck] = useState({});
  const [goalToEdit, setGoalToEdit] = useState({});
  const [actionState, setActionState] = useState(false);
  // actions

  const [openGoalCreator, setOpenGoalCreator] = React.useState(false);
  const [openTaskCreator, setOpenTaskCreator] = React.useState(false);

  //goal and task editor
  const [openGoalEditor, setOpenGoalEditor] = React.useState(false);
  const [openTaskEditor, setOpenTaskEditor] = React.useState(false);

  const handleGoalCreatorClose = () => {
    setOpenGoalCreator(false);
  };

  const handleGoalEditorClose = () => {
    setOpenGoalEditor(false);
  };

  const handleTaskCreatorClose = () => {
    setOpenTaskCreator(false);
  };

  const handleTaskEditorClose = () => {
    setOpenTaskEditor(false);
  };
  //goal and task editor

  const [goals, setGoals] = useState([]);
  const [taskList, setTaskList] = useState([]);

  // task services
  const [headText, setHeadText] = useState("");
  const [headSubText, setHeadSubText] = useState("");
  const [taskStepList, setTaskStepList] = useState([]);
  const [taskStep, setTaskStep] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const [taskDay, setTaskDay] = useState("");
  const [taskNumber, setTaskNumber] = useState("");

  const [taskToCheck, setTaskToCheck] = useState("");
  const [taskToEdit, setTaskToEdit] = useState([]);

  const createNewTask = async () => {
    const newTask = {
      headText: headText,
      subText: headSubText,
      steps: taskStepList,
      duration: taskDuration,
      day: taskDay,
      taskNumber: taskNumber,
    };
    try {
      console.log("Creating new task...", newTask);
      await createTask(newTask);
      setOpenTaskCreator(false);
      setActionState(!actionState);
    } catch (err) {
      alert("Failed to create task, error: " + err.message);
    }
  };
  // task services

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

  //fetch goals
  useEffect(() => {
    const fetchGoals = async () => {
      setLoadingState(true);
      let response = await getAllGoals();
      if (response) {
        setGoals(response.data);
        setLoadingState(false);
      }
    };
    fetchGoals();
  }, [finishNewGoal, actionState]);
  //fetch goals

  // fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      setLoadingState(true);
      try {
        let response = await getAllTasks();
        if (response) {
          setTaskList(response.data);
          setLoadingState(false);
        }
      } catch (err) {
        console.log("failed to fetch tasks,error: ", err.message);
      }
    };
    fetchTasks();
  }, [actionState]);
  // fetch tasks

  const checkBox = <Checkbox defaultChecked color="success" />;

  const [isGoalsChecked, setIsGoalsChecked] = useState(false);

  const [loadingState, setLoadingState] = useState(true);

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
            <h6>GOALS</h6>
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
            <Dash_btn1
              btn_text="CREATE NEW TASK"
              callFunction={() => {
                setOpenTaskCreator(true);
              }}
            />
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
        loadingState ? (
          <div
            style={{
              width:"100%",
              height:"50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingScreen />
          </div>
        ) : (
          <div style={{ width: "100%", height: "70vh", overflowY: "scroll" }}>
            <Grid item xs={12}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" style={{ fontWeight: "bold" }}>
                        {" "}
                        Head text{" "}
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        Sub Text
                      </TableCell>
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        Duration
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bold" }}
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {taskList.map((taskRow) => (
                      <TableRow
                        key={taskRow.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="left">
                          <Checkbox
                            defaultChecked={false}
                            onChange={(event) => {
                              setSelectedTask(taskRow);
                              handleCheckboxChange(event);
                            }}
                          />
                          {taskRow.headText}
                        </TableCell>
                        <TableCell align="center">{taskRow.subText}</TableCell>
                        <TableCell align="center">{taskRow.duration}</TableCell>
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
                                  setTaskToCheck(taskRow);
                                  openCheckTask();
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Edit" placement="bottom">
                              <img
                                src={editIcon}
                                className={styles.actionIcons}
                                onClick={() => {
                                  editTaskData(taskRow);
                                  setTaskToEdit(taskRow);
                                  setOpenTaskEditor(true);
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Delete" placement="right">
                              <img
                                src={binIcon}
                                className={styles.actionIcons}
                                onClick={() => {
                                  // setTaskToDelete(taskRow);
                                  taskDeletor(taskRow._id);
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
        )
      ) : // task table

      loadingState ? (
        <div
          style={{
            width: "100%",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingScreen />
        </div>
      ) : (
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
                    <TableCell
                      align="center"
                      style={{ fontWeight: "bold" }}
                    ></TableCell>
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
                                editGoalData(goalRow);
                                setGoalToEdit(goalRow);
                                setOpenGoalEditor(true);
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Delete" placement="right">
                            <img
                              src={binIcon}
                              className={styles.actionIcons}
                              onClick={() => {
                                goalDeleter(goalRow._id);
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

      {/* creating task modal */}
      <div>
        <Modal
          open={openTaskCreator}
          onClose={handleTaskCreatorClose}
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
            <h4>CREATE NEW TASK</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  type="number"
                  inputProps={{ min: 0 }}
                  id="standard-basic"
                  label="Task Day"
                  variant="standard"
                  style={{ width: "30%" }}
                  placeholder="Day X"
                  onChange={(event) => {
                    setTaskDay(event.target.value.toString());
                  }}
                />
                <TextField
                  type="number"
                  inputProps={{ min: 0 }}
                  id="standard-basic"
                  label="Task X"
                  variant="standard"
                  style={{ width: "30%" }}
                  placeholder="Day X"
                  onChange={(event) => {
                    setTaskNumber("task" + event.target.value);
                  }}
                />
                <FormControl style={{ width: "30%" }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Select task duration
                  </InputLabel>
                  <Select
                    labelId="demo-select-large-label"
                    id="taskDuration"
                    label="category"
                    style={{ height: "55px" }}
                    onChange={(event) => {
                      setTaskDuration(event.target.value);
                    }}
                  >
                    <MenuItem value={"short-term"}>Short Term</MenuItem>
                    <MenuItem value={"medium-term"}>Medium Term</MenuItem>
                    <MenuItem value={"long-term"}>Long Term</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <TextField
                id="standard-basic"
                label="Task head text"
                variant="standard"
                style={{ width: "100%" }}
                onChange={(event) => {
                  setHeadText(event.target.value);
                }}
              />
              <TextField
                id="standard-basic"
                label="Task head sub text"
                variant="standard"
                style={{ width: "100%" }}
                onChange={(event) => {
                  setHeadSubText(event.target.value);
                }}
              />
              <h5 style={{ textAlign: "left" }}>INCLUDE TASK STEPS</h5>
              <div className={styles.stepContainer}>
                {taskStepList ? (
                  <div className={styles.stepLine}>
                    {taskStepList.map((taskStep, index) => {
                      return (
                        <>
                          <div className={styles.step}>
                            <div className={styles.stepNo}>
                              <h4>STEP {index + 1}</h4>
                            </div>
                            <div className={styles.stepText}>{taskStep}</div>
                            <div className={styles.cancelBtnContainer}>
                              {index == taskStepList.length - 1 ? (
                                <img
                                  src={cancelIcon}
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    const updatedTaskStepList =
                                      taskStepList.filter(
                                        (item) => item !== taskStep
                                      );
                                    setTaskStepList(updatedTaskStepList);
                                  }}
                                />
                              ) : null}
                            </div>
                          </div>
                        </>
                      );
                    })}
                    <div className={styles.step}>
                      <div className={styles.stepNo}>
                        <h4>STEP {taskStepList.length + 1}</h4>
                      </div>
                      <div className={styles.stepText}>
                        <input
                          id="taskStepInput"
                          className={styles.stepInput}
                          placeholder={`Type what to do in step ${
                            taskStepList.length + 1
                          }`}
                          onChange={(event) => {
                            setTaskStep(event.target.value);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              if (
                                !taskStepList.includes(
                                  taskStep.trim().toLowerCase()
                                ) &&
                                taskStep.trim().length !== 0
                              ) {
                                setTaskStepList([
                                  ...taskStepList,
                                  taskStep.toLowerCase(),
                                ]);
                              }
                              document.getElementById("taskStepInput").value =
                                "";
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <div className={styles.createGoalBtn} onClick={createNewTask}>
                  Create Task
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      {/* creating task modal */}

      {/* edit task modal */}
      <div>
        <Modal
          open={openTaskEditor}
          onClose={handleTaskEditorClose}
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
            <h4>EDIT TASK</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <FormControl style={{ width: "30%" }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Select task duration
                  </InputLabel>
                  <Select
                    labelId="demo-select-large-label"
                    id="taskDuration"
                    label="category"
                    value={taskDuration}
                    style={{ height: "55px" }}
                    onChange={(event) => {
                      setTaskDuration(event.target.value);
                    }}
                  >
                    <MenuItem value={"short-term"}>Short Term</MenuItem>
                    <MenuItem value={"medium-term"}>Medium Term</MenuItem>
                    <MenuItem value={"long-term"}>Long Term</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <TextField
                id="standard-basic"
                label="Task head text"
                variant="standard"
                value={headText}
                style={{ width: "100%" }}
                onChange={(event) => {
                  setHeadText(event.target.value);
                }}
              />
              <TextField
                id="standard-basic"
                label="Task head sub text"
                value={headSubText}
                variant="standard"
                style={{ width: "100%" }}
                onChange={(event) => {
                  setHeadSubText(event.target.value);
                }}
              />
              <h5 style={{ textAlign: "left" }}>EDIT TASK STEPS</h5>
              <div className={styles.stepContainer}>
                {taskStepList ? (
                  <div className={styles.stepLine}>
                    {taskStepList.map((taskStep, index) => {
                      return (
                        <>
                          <div className={styles.step}>
                            <div className={styles.stepNo}>
                              <h4>STEP {index + 1}</h4>
                            </div>
                            <div className={styles.stepText}>{taskStep}</div>
                            <div className={styles.cancelBtnContainer}>
                              {index == taskStepList.length - 1 ? (
                                <img
                                  src={cancelIcon}
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    const updatedTaskStepList =
                                      taskStepList.filter(
                                        (item) => item !== taskStep
                                      );
                                    setTaskStepList(updatedTaskStepList);
                                  }}
                                />
                              ) : null}
                            </div>
                          </div>
                        </>
                      );
                    })}
                    <div className={styles.step}>
                      <div className={styles.stepNo}>
                        <h4>STEP {taskStepList.length + 1}</h4>
                      </div>
                      <div className={styles.stepText}>
                        <input
                          id="taskStepInput"
                          className={styles.stepInput}
                          placeholder={`Type what to do in step ${
                            taskStepList.length + 1
                          }`}
                          onChange={(event) => {
                            setTaskStep(event.target.value);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              if (
                                !taskStepList.includes(
                                  taskStep.trim().toLowerCase()
                                ) &&
                                taskStep.trim().length !== 0
                              ) {
                                setTaskStepList([
                                  ...taskStepList,
                                  taskStep.toLowerCase(),
                                ]);
                              }
                              document.getElementById("taskStepInput").value =
                                "";
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <div className={styles.createGoalBtn} onClick={taskEditor}>
                  Edit Task
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      {/* edit task modal */}

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
            <h4>CREATE NEW GOAL</h4>
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
                    <div
                      style={{ display: "flex", flexDirection: "row", gap: 10 }}
                    >
                      {goalObjectives.map((oneObjective, index) => (
                        <div className={styles.tag} key={index}>
                          {oneObjective}
                          <img
                            src={cancelIcon}
                            style={{ width: "15px", cursor: "pointer" }}
                            onClick={() => {
                              const updatedObjectives = goalObjectives.filter(
                                (item) => item !== oneObjective
                              );
                              setGoalObjectives(updatedObjectives);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className={styles.tagInput}>
                      <input
                        id="tgIn"
                        className={styles.tgIn}
                        placeholder="Enter goal objectives"
                        onChange={handleGoalObjective}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            if (
                              !goalObjectives.includes(
                                goalObjective.trim().toLowerCase()
                              ) &&
                              goalObjective.trim().length !== 0
                            ) {
                              setGoalObjectives([
                                ...goalObjectives,
                                goalObjective.toLowerCase(),
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
                value={goalTitle}
                style={{ width: "100%" }}
                onChange={(event) => {
                  setGoalTitle(event.target.value);
                }}
              />
              <TextField
                id="standard-basic"
                label="Goal Sub-Title"
                variant="standard"
                value={goalSubTitle}
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
                value={goalDescription}
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
                            const updatedObjectives = (
                              goalToEdit.objectives
                                ? goalToEdit.objectives
                                : objectives
                            ).filter((item) => item !== oneObjective);
                            setObjectives(updatedObjectives);
                          }}
                        />
                      </div>
                    ))}
                    <div className={styles.tagInput}>
                      <input
                        id="goaltgIn"
                        className={styles.tgIn}
                        placeholder="Enter goal objectives"
                        onChange={handleObjectiveChange}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            if (
                              objectives.includes(
                                objective.trim().toLowerCase()
                              ) &&
                              objective.trim().length !== 0
                            ) {
                              setObjectives([
                                ...objectives,
                                objective.toLowerCase(),
                              ]);
                            }
                            document.getElementById("goaltgIn").value = "";
                            setActionState(!actionState);
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
                    value={editedTime}
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
                  justifyContent: "space-between",
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
                  <h5 style={{ width: "15%" }}>Task name :</h5>
                  <span>{taskToCheck.headText}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <h5 style={{ width: "15%" }}>Task duration :</h5>
                  <span>{taskToCheck.duration}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <h5 style={{ width: "15%" }}>Task sub-text :</h5>
                  <span>{taskToCheck.subText}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <h5 style={{ width: "105px" }}>Task steps :</h5>
                  <span
                    style={{
                      height: "320px",
                      overflowY: "scroll",
                      padding: "20px",
                    }}
                  >
                    {taskToCheck
                      ? taskToCheck.steps.map((taskStep, index) => {
                          return (
                            <>
                              <span
                                style={{
                                  backgroundColor: "#4990fb",
                                  borderRadius: "25px",
                                  color: "white",
                                  paddingLeft: "20px",
                                  paddingRight: "20px",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                }}
                              >
                                Step {index + 1} :{" "}
                              </span>
                              <h4>{taskStep}</h4>
                            </>
                          );
                        })
                      : null}
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
