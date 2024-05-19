const express = require("express");

const { createTask } = require("../../controllers/taskController/createTask");

const router = express.Router();

router.post("/", createTask); //create new task

module.exports = router;
