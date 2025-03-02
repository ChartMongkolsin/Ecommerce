const express = require('express')
const cartRoute = express.Router()
const authenticate = require('../middleware/authenticate')
const cartController = require('../controllers/cart-controller')
const upload = require('../middleware/upload')


cartRoute.get("/", authenticate, cartController.getAllCartItems)
cartRoute.put("/:id", authenticate, cartController.editCartItems)
cartRoute.post("/",authenticate, cartController.createCartItems)
cartRoute.delete("/:id",authenticate, cartController.removeCartItems)




module.exports = cartRoute