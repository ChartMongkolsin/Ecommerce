const express = require('express')
const postRoute = express.Router()
const authenticate = require('../middleware/authenticate')
const postController = require('../controllers/post-controller')
const upload = require('../middleware/upload')


postRoute.get("/", authenticate, postController.getAllProduct)
postRoute.put("/:id",upload.single('image'), authenticate, postController.editProduct)
postRoute.post("/",upload.single('image'),authenticate, postController.createProduct)
postRoute.delete("/:id",authenticate, postController.deleteProduct)




module.exports = postRoute