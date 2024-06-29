import React, { useEffect, useState } from "react";
import styles from "../mindRelaxingMethods/methodList.module.css";
import { Checkbox, Grid, TextField, Tooltip } from "@mui/material";
import { deleteMindRelaxingMethodById } from "../../service/methodService";

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
import { getStressLevelQuestions , deleteQuestionById} from "../../service/stressQuestionService";
// table components

function createData(name, setDate, lastUpdate, actions) {
  return { name, setDate, lastUpdate, actions };
}

function TaskChallenges({ onPageChange }) {
  const openNewTask = () => {
    onPageChange("stress-level-questions");
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

  const checkBox = <Checkbox defaultChecked color="success" />;

  const [questions, setQuestions] = useState([])

  const fetchQuestion = async () => {
    const fetchedQuestions = await getStressLevelQuestions();
    console.log(fetchedQuestions)
    setQuestions(fetchedQuestions);
  };

  useEffect(() => {
    fetchQuestion(); 
  }, [questions]);

  console.log(questions)
 
  const [isChallengesChecked, setIsChallengesChecked] = useState(false); // Initially checked

  const handleChallengesCheckboxChange = () => {
    setIsChallengesChecked(!isChallengesChecked); // Toggle checkbox state
    setIsTasksChecked(!isTasksChecked); // Toggle checkbox state
  };

  const [isTasksChecked, setIsTasksChecked] = useState(true); // Initially checked

  const handleTasksCheckboxChange = () => {
    setIsTasksChecked(!isTasksChecked); // Toggle checkbox state
    setIsChallengesChecked(!isChallengesChecked); // Toggle checkbox state
  };

  const handleEdit = (id) => {
    onPageChange(`stress-level-questions-update/${id}`);
    
    console.log(id) 
  }

  const handleDelete = (id) => {
    console.log(id)
    deleteQuestionById(id);
  }


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
          <Dash_btn1 btn_text="ADD NEW QUESTION" callFunction={openNewTask} />
          
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
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <h5 style={{ color: "#A0A0A0" }}>ALLOCATED MIND RELAXING METHODS</h5>
        </Grid>
        <Grid item xs={10}>
          <hr />
        </Grid>
      </Grid>
      {/* topic */}
      {/* task table */}
      <div style={{ width: "100%", height: "70vh", overflowY: "scroll" }}>
        <Grid item xs={12}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Questions
                  </TableCell>
                  
                  
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      
                      {row.question}
                    </TableCell>
                    
                    
                    <TableCell align="center">
                    <img src={editIcon} className={styles.actionIcons } onClick={() => handleEdit(row._id)}  />
                    <img src={binIcon} className={styles.actionIcons } onClick={() => handleDelete(row._id)}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </div>
      {/* task table */}

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
            <h5>CREATE NEW TASK</h5>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <TextField
                id="standard-basic"
                label="Task name"
                variant="standard"
                style={{ width: "100%" }}
              />
              <TextField
                id="standard-basic"
                label="Task description"
                variant="standard"
                style={{ width: "100%" }}
              />
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
                  <h5 style={{width:"130px"}}>Task name :</h5>
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
                  <h5 style={{width:"550px"}}>Task description :</h5>
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

export default TaskChallenges;
