const express = require('express')
const postRoute = express.Router()
const authenticate = require('../middleware/authenticate')
const postController = require('../controllers/post-controller')
const upload = require('../middleware/upload')


postRoute.post("/",upload.single('image'), postController.upload)
postRoute.post("/login",(req,res)=>{})
postRoute.put("/upload",upload.single('image'), postController.upload)
postRoute.get("/profile", (req,res)=>{})




module.exports = postRoute