const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT } = require("./config/env");
const { connect } = require("./config/database.connection.js");
const videoRouter = require("./api/routes/resourcesRoute/videoRoute.js");
const audioRouter = require("./api/routes/resourcesRoute/audioRoute.js");
const articleRouter = require("./api/routes/resourcesRoute/articleRoute.js");
const taskRouter = require("./api/routes/tasksRoute/taskRoute.js");

// Initialize Express app
const app = express();

// Use middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/v1/resources/video", videoRouter); // Video routes
app.use("/api/v1/resources/audio", audioRouter); // Audio routes
app.use("/api/v1/resources/article", articleRouter); // Article routes
app.use("/api/v1/tasks/task", taskRouter); // Task routes

// Connect to the database
connect("mongodb://localhost:27017/defaultUsers', {}");

// Start the server
const PORT2 = PORT || 3000;
app.listen(PORT2, () => {
  console.log(`Server is running on http://localhost:${PORT2}`);
});
