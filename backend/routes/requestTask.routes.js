const express = require("express");
const Router = express.Router();
const requestTaskController = require("../controllers/requestTask.controller");
Router.route("/newrequesttask").post(requestTaskController.newRequestTask);
Router.route("/getallrequesttasks").get(requestTaskController.getAllRequestTask);
Router.route("/task/getallrequests/:taskId").get(requestTaskController.getAllRequests);
Router.route("/task/acceptreject").post(requestTaskController.acceptRejectRequests);
Router.route("/:requestTaskId").get(requestTaskController.getRequestTask)
.patch(requestTaskController.updateRequestTask).delete(requestTaskController.deleteRequestTask);

module.exports = Router;