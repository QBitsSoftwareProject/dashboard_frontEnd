const task = require("../../models/taskModel/task");

// create new task file
exports.createTask = async (req, res) => {
  try {
    
    const { name, description, setDate, lastUpdate } = req.body;

    const newTask = new task({
      name,
      description,
      setDate,
      lastUpdate,
    });

    await newTask.save();

    return res.status(201).json("task saved successfully");

  } catch (err) {

    return res.status(500).json({ errorMsg: "task save failed", error: err });

  }
};
