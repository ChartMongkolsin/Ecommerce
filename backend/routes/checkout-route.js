const express = require('express')
const checkOutRoute = express.Router()
const authenticate = require('../middleware/authenticate')
const checkOutController = require('../controllers/checkout-controller')


checkOutRoute.post("/", authenticate, checkOutController.checkout)
checkOutRoute.get("/checkout-status/:session_id", authenticate, checkOutController.checkoutStatus)




module.exports = checkOutRoute