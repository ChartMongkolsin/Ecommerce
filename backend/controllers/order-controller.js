const createError = require('../utils/createError')
const prisma = require('../config/prisma');

module.exports.getOrder = async (req, res, next) => {
    try {
        let orders;

        if (req.user.role === "ADMIN") {
            // ✅ ADMIN เห็นออเดอร์ทั้งหมด พร้อมสินค้าภายในออเดอร์
            orders = await prisma.order.findMany({
                include: {
                    user: true, // ดึงข้อมูลผู้ใช้ที่ทำการสั่งซื้อ
                    orderitem: {
                        include: {
                            product: true, // ✅ ดึงข้อมูลสินค้าที่อยู่ในคำสั่งซื้อ
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            });
        } else {
            // ✅ USER เห็นเฉพาะออเดอร์ของตัวเอง
            orders = await prisma.order.findMany({
                where: { userId: req.user.id },
                include: {
                    orderitem: {
                        include: {
                            product: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            });
        }

        res.json(orders);
    } catch (error) {
        next(error)
    }
},
    module.exports.createOrder = async (req, res, next) => {
        try {
            const { items, total } = req.body;
            console.log("Received items:", items);
            console.log("Total price:", total);

            const userId = req.user.id;

            if (!items || items.length === 0) {
                return res.status(400).json({ error: "Your cart is empty." });
            }

            // ✅ Check if any item has an invalid price before proceeding
            for (const item of items) {
                if (item.price === undefined || item.price === null || isNaN(item.price)) {
                    return res.status(400).json({ error: `Invalid price for productId: ${item.productId}` });
                }
            }

            // ✅ 1. สร้างคำสั่งซื้อ
            const order = await prisma.order.create({
                data: {
                    priceTotal: +total.toFixed(2),
                    orderStatus: "Pending",
                    paymentStatus: "Unpaid",
                    userId: userId,
                }
            });

            // ✅ 2. เพิ่มสินค้าเข้าไปใน OrderItem
            await prisma.$transaction(
                items.map((item) =>
                    prisma.orderItem.create({
                        data: {
                            orderId: order.id,
                            productId: item.productId,
                            quantity: +item.quantity,
                            price: +item.price,
                        },
                    })
                )
            );

            res.status(201).json({ message: "Order created successfully!", order });

        } catch (error) {
            console.error("Create Order Error:", error);
            next(error);
        }
    };
// module.exports.createOrder = async (req, res, next) => {
//     try {

//         const { items, total } = req.body;
//         console.log('items', items)
//         console.log('total', total)
//         const userId = req.user.id;

//         if (!items || items.length === 0) {
//             return res.status(400).json({ error: "Your cart is empty." });
//         }

//         // ✅ 1. สร้างคำสั่งซื้อ
//         const order = await prisma.order.create({
//             data: {
//                 priceTotal: +total.toFixed(2),
//                 orderStatus: "Pending",
//                 paymentStatus: "Unpaid",
//                 userId: userId,
//             }
//         });

//         // ✅ 2. เพิ่มสินค้าเข้าไปใน Order_Product
//         let uploadResult = {}
//         await prisma.$transaction(
//             items.map((item) =>
//                 prisma.orderItem.create({
//                     data: {
//                         orderId: order.id,
//                         productId: item.productId,
//                         quantity: +item.quantity,
//                         price: +item.price,
//                     },
//                 })
//             )
//         );

//         res.status(201).json({ message: "Order created successfully!", order });

//     } catch (error) {
//         next(error)
//     }
// }

module.exports.updateOrder = async (req, res, next) => {
    try {











        res.json({ order: rs })
    } catch (error) {
        next(error)
    }
}
module.exports.deletedOrder = async (req, res, next) => {
    try {




        res.json({ order: rs })
    } catch (error) {
        next(error)
    }
}
