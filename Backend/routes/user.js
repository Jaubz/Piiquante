const express = require("express")
const routeur = express.Router()
const userController = require("../controllers/userController")

routeur.post("/signup",userController.signup)
routeur.post("/login",userController.login)

module.exports = routeur