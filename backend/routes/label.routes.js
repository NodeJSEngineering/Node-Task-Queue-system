const express = require("express");
const Router = express.Router();
const labelController = require("../controllers/label.controller");
Router.route("/newlabel").post(labelController.newLabel);
Router.route("/getalllabels").get(labelController.getAllLabel);
Router.route("/:labelId").get(labelController.getLabel).patch(labelController.updateLabel).delete(labelController.deleteLabel);

module.exports = Router;