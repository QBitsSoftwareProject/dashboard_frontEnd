import React, { useState } from "react";
import styles from "./task-Goals.module.css";
import { Checkbox, Grid, TextField, Tooltip } from "@mui/material";

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
// table components

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

  const closeCheckTask = () => {
    document.getElementById("checkTask").style.width = "0%";
  };

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

  const [goalName, setGoalName] = useState("");
  const [goalDescription, setGoalDescription] = useState("");

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

  const [goals, setGoals] = useState([
    {
      name: "Goal 001",
      description: "",
      setDate: "02/02/2024",
      lastUpdate: "02/03/2024",
      actions,
    },
  ]);

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
            <Dash_btn1 btn_text="CREATE NEW GOAL" />
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
                  {goals.map((row) => (
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
        // goals table
      )}

      {/* creating new task */}
      <div id="newTask" class={styles.overlay}>
        {/* <!-- Button to close the overlay navigation --> */}
        <a
          href="javascript:void(0)"
          class={styles.closebtn}
          onClick={closeNewTask}
        >
          &times;
        </a>

        {/* <!-- Overlay content --> */}
        <div class={styles.overlay_content}>
          <div
            className={styles.newTaskForm}
            style={{ justifyContent: "flex-start" }}
          >
            <h5
            // style={{
            //   backgroundColor: "rgb(172, 197, 214,0.4)",
            //   width: "fit-content",
            //   paddingLeft: "10px",
            //   paddingRight: "10px",
            //   paddingTop: "8px",
            //   paddingBottom: "8px",
            //   borderRadius: "25px",
            //   color:"rgb(0,0,0,0.8)"
            // }}
            >
              CREATE NEW TASK
            </h5>
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

      {/* check task */}
      <div id="checkTask" class={styles.overlay}>
        {/* <!-- Button to close the overlay navigation --> */}
        <a
          href="javascript:void(0)"
          class={styles.closebtn}
          onClick={closeCheckTask}
        >
          &times;
        </a>

        {/* <!-- Overlay content --> */}
        <div class={styles.overlay_content}>
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
    </Grid>
  );
}

export default TaskGoals;
