const express = require('express')
const productRoute = express.Router()
const authenticate = require('../middleware/authenticate')
const productController = require('../controllers/post-controller')
const upload = require('../middleware/upload')


productRoute.get("/", authenticate, productController.getAllProduct)
productRoute.patch("/:id", authenticate, upload.single('image'), productController.editProduct)
productRoute.post("/",upload.single('image'),authenticate, productController.createProduct)
productRoute.delete("/:id",authenticate, productController.deleteProduct)




module.exports = productRoute