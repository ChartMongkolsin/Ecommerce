/* สามารถเพิ่มไฟล์จาก env เพื่อเรียกใช้ */
require('dotenv').config()
const express = require('express')
const authRoute = require('./routes/auth-route')
const notFound = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-middleware')

const app = express()
app.use(express.json())



/* API Running */
app.use("/auth",authRoute)
app.use("/payment",(req,res)=>{
    res.send('Payment running')
})
app.use("/order",(req,res)=>{
    res.send('Order running')
})
app.use("/product",(req,res)=>{
    res.send('Product running')
})

app.use(errorMiddleware)
app.use(notFound)

/* Running */
PORT = process.env.PORT || 8889

app.listen(PORT,()=>
console.log(`Server is running on ${PORT}`))