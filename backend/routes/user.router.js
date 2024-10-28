const express = require("express");
const Router = express.Router();
const userController = require("../controllers/user.controller");
Router.route("/register").post(userController.register);
Router.route("/login").post(userController.login);
Router.route("/logout").get(userController.logout);
Router.route("/getAllUsers").get(userController.getAllUsers);
Router.route("/:userId").get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = Router;