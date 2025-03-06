const express = require('express')
const orderRoute = express.Router()
const authenticate = require('../middleware/authenticate')
const orderController = require('../controllers/order-controller')
const upload = require('../middleware/upload')


orderRoute.get("/", authenticate, orderController.getOrder)
orderRoute.patch("/:id", authenticate, upload.single('image'), orderController.updateOrder)
orderRoute.post("/",upload.single('image'),authenticate, orderController.createOrder)
orderRoute.delete("/:id",authenticate, orderController.deletedOrder)




module.exports = orderRoute