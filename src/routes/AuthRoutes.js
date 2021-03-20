const express = require("express");
const AuthController = require("../controllers/AuthController");

const routes = express.Router();

routes.post("/auth/login", AuthController.login);
routes.post("/auth/create", AuthController.create);

module.exports = routes;
