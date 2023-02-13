const express = require("express")
const routeur = express.Router()
const userController = require("../controllers/userController")
const passwordValidator = require("../middleware/password-validator")

routeur.post("/signup",passwordValidator,userController.signup)
routeur.post("/login",userController.login)

module.exports = routeur