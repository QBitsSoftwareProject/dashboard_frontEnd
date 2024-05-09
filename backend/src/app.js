const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT } = require("./config/env");
const { connect } = require("./config/database.connection.js");
const videoRouter = require("./api/routes/resourcesRoute/videoRoute.js");
const audioRouter = require("./api/routes/resourcesRoute/audioRoute.js");
const articleRouter = require("./api/routes/resourcesRoute/articleRoute.js");

const taskRouter = require("./api/routes/tasksRoute/taskRoute.js");

const adminRouter = require("./api/routes/adminRoute/adminRoute.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());

//routes

app.use("/api/v1/resources/video", videoRouter); //video-routes
app.use("/api/v1/resources/audio", audioRouter); //audio-routes
app.use("/api/v1/resources/article", articleRouter); //article-routes

app.use("/api/v1/tasks/task", taskRouter); //task-routes

app.use("/api/v1/admin/login", adminRouter); //admin-login



app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connect();
});
