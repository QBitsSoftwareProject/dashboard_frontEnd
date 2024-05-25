const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT } = require("./config/env");
const { connect } = require("./config/database.connection.js");
const videoRouter = require("./api/routes/resourcesRoute/videoRoute.js");
const audioRouter = require("./api/routes/resourcesRoute/audioRoute.js");
const articleRouter = require("./api/routes/resourcesRoute/articleRoute.js");
const taskRouter = require("./api/routes/tasksRoute/taskRoute.js");

// socketIO
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/defaultUsers', {});

// Initialize Express app
const app = express();

const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Listen for changes in MongoDB using Change Streams
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');

  const changeStream = db.collection('your-collection').watch();

  changeStream.on('change', (change) => {
    console.log('Change detected:', change);
    io.emit('dbChange', change);
  });
});

// Use a single PORT for both HTTP server and Express app
const PORT2 = PORT || 3000;
server.listen(PORT2, () => {
  console.log(`Server is running on http://localhost:${PORT2}`);
});

app.use(cors());
app.use(bodyParser.json());

//routes
app.use("/api/v1/resources/video", videoRouter); //video-routes
app.use("/api/v1/resources/audio", audioRouter); //audio-routes
app.use("/api/v1/resources/article", articleRouter); //article-routes
app.use("/api/v1/tasks/task", taskRouter); //task-routes

// Connect to the database
connect();
