const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

//configuration
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(express.static("static"));
app.use(cors({
    origin:true,
    credentials:true
}));
app.use(cookieParser());

//routes import
const userRoutes = require("./routes/user.router");
app.use("/api/v1/user" , userRoutes);

const taskRoutes = require("./routes/task.routes");
app.use("/api/v1/task" , taskRoutes);

const requestTaskRoutes = require("./routes/requestTask.routes");
app.use("/api/v1/requesttask" , requestTaskRoutes);

const labelRoutes = require("./routes/label.routes");
app.use("/api/v1/label" , labelRoutes);

module.exports = app;