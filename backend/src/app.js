const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT } = require("./config/env");
const { connect } = require("./config/database.connection.js");
const videoRouter = require("./api/routes/resourcesRoute/videoRoute.js");
const audioRouter = require("./api/routes/resourcesRoute/audioRoute.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());


//routes
app.use("/api/v1/resources/video",videoRouter); //video-routes
app.use("/api/v1/resources/audio",audioRouter); //audio-routes
// app.use("/api/v1/resources/article",articleRoutes);//article-routes

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connect();
});
