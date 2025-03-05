const createError = require('../utils/createError')
const prisma = require('../config/prisma');

module.exports.getAllOrder = async (req, res, next) => {
    try {

        res.json({ order: rs })
    } catch (error) {
        next(error)
    }
}
module.exports.createOrder = async (req, res, next) => {
    try {
        
        const { items, total } = req.body;
        console.log('items', items)
        console.log('total', total)
        const userId = req.user.id;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Your cart is empty." });
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

        // ✅ 2. เพิ่มสินค้าเข้าไปใน Order_Product
        let uploadResult = {}
        await prisma.$transaction(
            items.map((item) =>
                prisma.orderItem.create({
                    data: {
                        orderId: order.id,
                        image: uploadResult.secure_url || '',
                        productId: items.productId,
                        quantity: item.quantity,
                        price: item.price,
                    },
                })
            )
        );

        res.status(201).json({ message: "Order created successfully!", order });

    } catch (error) {
        next(error)
    }
}
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
