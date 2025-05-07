const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const hashedPassword = bcrypt.hashSync('123456', 10)

const users = [
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  password: hashedPassword, // ควร hash ก่อน insert
	  role: "USER",
	},
	{
	  firstName: "JOSH",
	  lastName: "Doe",
	  email: "josh@example.com",
	  password: hashedPassword, // ควร hash ก่อน insert
	  role: "USER",
	},
	{
	  firstName: "Jane",
	  lastName: "Smith",
	  email: "jane@example.com",
	  password: hashedPassword,
	  role: "ADMIN",
	},
  ];
  
  const products = [
	{
	  name: "iPhone 14",
	  image: "https://media-cdn.bnn.in.th/234719/iPhone_14_Starlight_PDP_Image_Position-1A_Starlight_1-square_medium.jpg",
	  desc: "Latest Apple smartphone",
	  quantity: 10,
	  price: 799.99,
	  userId: 3, 
	},
	{
	  name: "iPhone 14",
	  image: "https://media-cdn.bnn.in.th/234719/iPhone_14_Starlight_PDP_Image_Position-1A_Starlight_1-square_medium.jpg",
	  desc: "Latest Apple smartphone",
	  quantity: 10,
	  price: 799,
	  userId: 3, 
	},
	{
	  name: "iPhone 14",
	  image: "https://media-cdn.bnn.in.th/234719/iPhone_14_Starlight_PDP_Image_Position-1A_Starlight_1-square_medium.jpg",
	  desc: "Latest Apple smartphone",
	  quantity: 10,
	  price: 799,
	  userId: 3, 
	},
	{
	  name: "Samsung Galaxy S23",
	  image: "https://media-cdn.bnn.in.th/269581/Samsung-Smartphone-Galaxy-S23-Ultra-5G-1-square_medium.jpg",
	  desc: "Flagship Android phone",
	  quantity: 15,
	  price: 699.50,
	  userId: 3,
	},
  ];
  
//   const carts = [
// 	{
// 	  userId: 1, // John
// 	},
// 	{
// 	  userId: 2, // Jane
// 	},
//   ];
  
//   const cartItems = [
// 	{
// 	  quantity: 1,
// 	  productId: 1,
// 	  cartId: 1,
// 	},
// 	{
// 	  quantity: 1,
// 	  productId: 2,
// 	  cartId: 1,
// 	},
//   ];
  
//   const orders = [
// 	{
// 	  priceTotal: 1599,
// 	  orderStatus: "PROCESSING",
// 	  paymentStatus: "PAID",
// 	  userId: 1,
// 	},
//   ];
  
//   const orderItems = [
// 	{
// 	  orderId: 1,
// 	  quantity: 1,
// 	  price: 799,
// 	  productId: 1,
// 	},
// 	{
// 	  orderId: 1,
// 	  quantity: 1,
// 	  price: 799,
// 	  productId: 2,
// 	},
//   ];

console.log('DB seed...')

async function run() {
	await prisma.user.createMany({ data: users })
	await prisma.product.createMany({ data: products })
	// await prisma.cart.createMany({ data: carts })
	// await prisma.cartItem.createMany({ data: cartItems })
	// await prisma.order.createMany({ data: orders })
	// await prisma.orderItem.createMany({ data: orderItems })
}

run()