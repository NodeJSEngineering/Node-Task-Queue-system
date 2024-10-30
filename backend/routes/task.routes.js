const express = require("express");
const Router = express.Router();
const taskController = require("../controllers/task.controller");
Router.route("/newtask").post(taskController.newTask);
Router.route("/getalltasks").get(taskController.getAllTask);
Router.route("/getalllabeltasks").get(taskController.getLabelTasks);
Router.route("/:taskId").get(taskController.getTask).patch(taskController.updateTask).delete(taskController.deleteTask);

module.exports = Router;