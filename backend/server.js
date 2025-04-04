/* สามารถเพิ่มไฟล์จาก env เพื่อเรียกใช้ */
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/auth-route')
const authenticate = require('./middleware/authenticate')
const notFound = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-middleware')
const productRoute = require('./routes/product-route')
const morgan = require('morgan')
const cartRoute = require('./routes/cart-route')
const orderRoute = require('./routes/order-route')
const checkOutRoute = require('./routes/checkout-route')



const app = express()

app.use(express.json())
/* morgan */
app.use(morgan('dev'))
/* cors */
app.use(cors())


/* API Running */
app.use("/auth",authRoute)
app.use("/payment",(req,res)=>{
    res.send('Payment running')
})

app.use("/cart",cartRoute)


app.use("/orders",orderRoute)
app.use("/product",productRoute)

app.use("/checkout",checkOutRoute)



app.use(errorMiddleware)
app.use(notFound)

/* Running */
PORT = process.env.PORT || 8889

app.listen(PORT,()=>
console.log(`Server is running on ${PORT}`))