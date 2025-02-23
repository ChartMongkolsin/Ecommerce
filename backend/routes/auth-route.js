const express = require('express')
const authRoute = express.Router()
const authenticate = require('../middleware/authenticate')
const authController = require('../controllers/auth-controller')


authRoute.post("/register",authController.register)
authRoute.post("/login",authController.login)
authRoute.get("/profile",authenticate, authController.getMe)




module.exports = authRoute